import {
    GetObjectCommand,
    PutObjectCommand,
    S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import dotenv from "dotenv"
dotenv.config()

const s3 = new S3Client();
const BUCKET = process.env.BUCKET;
const prefix = process.env.PREFIX;

export const uploadImageToS3 = async ({ file, _id, fileName}) => {
    const key = `${prefix}/img/${_id}`;
    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
        ContentDisposition: `attachment; filename="${fileName}"`
    });
    await s3.send(command);
    return key;
};

export const uploadThumbnailToS3 = async ({file, _id}) => {
    const key = `${prefix}/thumbnail/${_id}`;
    const command = new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: file,
        ContentType: file.mimetype,
    });
    await s3.send(command);
    return key;
}

export const getPresignedUrl = async (key) => {
    const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
    return getSignedUrl(s3, command, { expiresIn: 3600 });
};