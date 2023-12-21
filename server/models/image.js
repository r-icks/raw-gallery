import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: [true, "Please provide filename"],
        maxlength: 255
    },
    metadata: [{
        key: {
            type: String,
            required: [true, "Please provide metadata key"],
            maxlength: 50
        },
        value: {
            type: String,
            required: [true, "Please provide metadata value"],
            maxlength: 255
        }
    }],
    thumbnailKey: {
        type: String
    },
    imageKey: {
        type: String
    }
}, { timestamps: true });

const ImageModel = mongoose.model("Image", ImageSchema);

export default ImageModel;