import sharp from "sharp";
import ResponseError from "../../classes/response-error.class";
import cloudinary from "../../config/cloudinary.config";
import User from "../../models/schemas/auth/user.model";
import Image from "../../models/schemas/image/image.model";
import {
    attachAvatar,
    attachDriverImage,
    attachGasStationImage,
    attachGasStationLogo,
    attachWorkshopImage,
    attachWorkshopLogo,
} from "../../helpers/image.helpers";

const uploadImage = async (req, res) => {
    const { user, file } = req;
    const { referenceSlug } = req.params;

    if (!file) {
        throw new ResponseError(400, "Input Error", "File is required");
    }

    const findUser = await User.findById(user._id);
    if (!findUser) {
        throw new ResponseError(400, "Input Error", "User not found");
    }

    const { target } = req.query;
    const imageBuffer = file.buffer;
    const fileName = file.originalname;
    let resizedBuffer;
    try {
        if (
            target === "user-avatar" ||
            target === "workshop-logo" ||
            target === "gas-station-logo"
        ) {
            resizedBuffer = await sharp(imageBuffer)
                .resize({
                    width: 300,
                    height: 300,
                    fit: "cover",
                })
                .toBuffer();
        } else if (target === "license-image") {
            resizedBuffer = await sharp(imageBuffer)
                .resize({
                    width: 600,
                    height: 400,
                })
                .toBuffer();
        } else if (
            target === "car-image" ||
            target === "workshop-image" ||
            target === "gas-station-image"
        ) {
            resizedBuffer = await sharp(imageBuffer)
                .resize({
                    width: 1000,
                    height: 600,
                    fit: "cover",
                })
                .toBuffer();
        } else {
            throw new ResponseError(400, "Input Error", "Invalid target");
        }

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    { folder: "tariqak_uploads" },
                    (error, result) => {
                        if (error) {
                            return reject(error);
                        }
                        resolve(result);
                    }
                )
                .end(resizedBuffer);
        });

        const newImage = await Image.create({
            user: findUser._id,
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
            reference: null,
            type: target,
            file_name: fileName,
        });

        if (target === "user-avatar") {
            await attachAvatar(findUser, newImage._id);
        } else if (
            findUser.role === "driver" &&
            ["license-image", "car-image"].includes(target)
        ) {
            const field =
                target === "license-image" ? "license_image" : "car_image";
            await attachDriverImage(findUser._id, field, newImage._id);
        } else if (findUser.role === "admin" && target === "workshop-image") {
            if (!referenceSlug)
                throw new ResponseError(
                    400,
                    "Input Error",
                    "Workshop ID is required"
                );
            const workshop = await attachWorkshopImage(
                findUser._id,
                referenceSlug,
                newImage._id
            );
            newImage.reference = workshop._id;
            await newImage.save();
        } else if (findUser.role === "admin" && target === "workshop-logo") {
            if (!referenceSlug)
                throw new ResponseError(
                    400,
                    "Input Error",
                    "Workshop ID is required"
                );
            const workshop = await attachWorkshopLogo(
                findUser._id,
                referenceSlug,
                newImage._id
            );

            newImage.reference = workshop._id;
            await newImage.save();
        } else if (findUser.role === "admin" && target === "gas-station-logo") {
            if (!referenceSlug)
                throw new ResponseError(
                    400,
                    "Input Error",
                    "Gas Station ID is required"
                );
            const station = await attachGasStationLogo(
                findUser._id,
                referenceSlug,
                newImage._id
            );
            newImage.reference = station._id;
            await newImage.save();
        } else if (
            findUser.role === "admin" &&
            target === "gas-station-image"
        ) {
            if (!referenceSlug)
                throw new ResponseError(
                    400,
                    "Input Error",
                    "Gas Station ID is required"
                );
            const station = await attachGasStationImage(
                findUser._id,
                referenceSlug,
                newImage._id
            );
            newImage.reference = station._id;
            await newImage.save();
        }

        res.json({
            success: true,
            type: "success",
            message: "Image uploaded successfully!",
            data: {
                image: newImage,
            },
        });
    } catch (error) {
        throw new ResponseError(400, "Upload Error", error.message);
    }
};

const deleteImage = async (_id) => {
    try {
        const findImage = await Image.findById(_id);
        if (!findImage) {
            throw new ResponseError(400, "Input Error", "Image not found");
        }
        const { public_id } = findImage;

        await cloudinary.uploader.destroy(public_id);

        await Image.deleteOne({ _id });
    } catch (error) {
        throw new ResponseError(
            400,
            "Cloudinary Error",
            "Failed to delete image"
        );
    }
};

export { uploadImage, deleteImage };
