import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../Errors/index.js";
import dcraw from "dcraw"
import { getPresignedUrl, uploadImageToS3, uploadThumbnailToS3 } from "../s3.js";
import Image from "../models/image.js";
import { Types } from "mongoose";

const uploadImage = async (req, res) => {
    const { file } = req;
    if (!file) {
        throw new BadRequestError("Please upload a file!");
    }
    const fileName = file.originalname;
    const buf = new Uint8Array(file.buffer);
    const metadata = dcraw(buf, { verbose: true, identify: true }).split('\n').filter(String);
    const thumbnail = dcraw(buf, { extractThumbnail: true });
    const newImage = new Image({
        filename: fileName,
        metadata: metadata.map(line => {
            const [key, value] = line.split(':').map(item => item.trim());
            return { key, value };
        }),
        thumbnailKey: null,
        imageKey: null,
    });
    await newImage.save();

    try {
        const imageKey = await uploadImageToS3({ file, _id: newImage._id, fileName});
        const thumbnailKey = await uploadThumbnailToS3({ file: thumbnail, _id: newImage._id });
        newImage.imageKey = imageKey;
        newImage.thumbnailKey = thumbnailKey;
        await newImage.save();
        const presignedUrl = await getPresignedUrl(newImage.thumbnailKey)
        newImage.thumbnailKey = undefined;
        newImage.metadata = undefined;
        newImage.imageKey = undefined;
        res.status(StatusCodes.OK).json({ msg: "Image upload successful", image: {...newImage, thumbnailUrl:presignedUrl} });
    }
    catch (err) {
        console.log(err);
        await Image.findByIdAndDelete(newImage._id);
        throw new Error('Unable to upload image to cloud');
    }
}

const getGallery = async (req, res) => {
    const images = await Image.find().select('-imageKey -metadata').sort('createdAt');
    const imagesWithPresignedUrls = await Promise.all(
        images.map(async (image) => {
            const presignedUrl = await getPresignedUrl(image.thumbnailKey);
            image.thumbnailKey = undefined;
            return { ...image.toObject(), thumbnailUrl: presignedUrl };
        })
    );
    res.status(StatusCodes.OK).json({ images: imagesWithPresignedUrls });
};

const getImage = async (req, res) => {
    const { id } = req.params;
    let _id;
    try{
         _id = new Types.ObjectId(id);
    }
    catch(err){
        throw new BadRequestError("Image not found");
    }
    const image = await Image.findById(_id);
    if (!image) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: 'Image not found' });
    }
    const thumbnailUrl = await getPresignedUrl(image.thumbnailKey);
    const downloadUrl = await getPresignedUrl(image.imageKey);
    image.thumbnailKey = undefined;
    image.imageKey = undefined;
    res.status(StatusCodes.OK).json({
        image: {
            ...image.toObject(),
            thumbnailUrl,
            downloadUrl
        }
    });
};

export { uploadImage, getGallery, getImage}