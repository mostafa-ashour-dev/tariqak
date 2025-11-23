import ResponseError from "../classes/response-error.class";
import Driver from "../models/schemas/roles/driver.model";
import WorkShop from "../models/schemas/workshop/work-shop.model";
import GasStation from "../models/schemas/gas-station/gas-station.model";
import cloudinary from "../config/cloudinary.config";
import Image from "../models/schemas/image/image.model";

const attachAvatar = async (user, imageId) => {
    const existingImage = await Image.findOne({
        user: user._id,
        type: "user-avatar",
    });
    if (existingImage) {
        await cloudinary.uploader.destroy(existingImage.public_id);
        await Image.deleteOne({ _id: existingImage._id });
    }
    user.avatar = imageId;
    await user.save();
};

const attachDriverImage = async (userId, field, imageId) => {
    const driver = await Driver.findOne({ user: userId });
    if (!driver) {
        throw new ResponseError(400, "Input Error", "Driver not found");
    }

    driver[field] = imageId;
    await driver.save();
};

const attachWorkshopImage = async (userId, slug, imageId) => {
    const workshop = await WorkShop.findOne({ title_slug: slug, user: userId });
    if (!workshop) {
        throw new ResponseError(400, "Input Error", "Workshop not found");
    }

    await WorkShop.updateOne(
        { title_slug: slug, user: userId },
        { $push: { images: imageId } }
    );

    return workshop;
};

const attachWorkshopLogo = async (userId, slug, imageId) => {
    const workshop = await WorkShop.findOne({ title_slug: slug, user: userId });
    if (!workshop) {
        throw new ResponseError(400, "Input Error", "Workshop not found");
    }

    const existingImage = await Image.findOne({
        user: userId,
        type: "workshop-logo",
        reference: workshop._id,
    });
    if (existingImage) {
        await cloudinary.uploader.destroy(existingImage.public_id);
        await Image.deleteOne({ _id: existingImage._id });
    }

    workshop.logo = imageId;
    await workshop.save();

    return workshop;
};

const attachGasStationImage = async (userId, slug, imageId) => {
    const station = await GasStation.findOne({
        title_slug: slug,
        reference: { type: "admin", target: userId },
    });
    if (!station) {
        throw new ResponseError(400, "Input Error", "Gas Station not found");
    }

    await GasStation.updateOne(
        { title_slug: slug, reference: { type: "admin", target: userId } },
        { $push: { images: imageId } }
    );

    return station;
};

const attachGasStationLogo = async (userId, slug, imageId) => {
    const station = await GasStation.findOne({
        title_slug: slug,
        reference: { type: "admin", target: userId },
    });
    if (!station) {
        throw new ResponseError(400, "Input Error", "Gas Station not found");
    }

    const existingImage = await Image.findOne({
        user: userId,
        type: "gas-station-logo",
        reference: station._id,
    });
    if (existingImage) {
        await cloudinary.uploader.destroy(existingImage.public_id);
        await Image.deleteOne({ _id: existingImage._id });
    }

    station.logo = imageId;
    await station.save();

    return station;
};

export {
    attachAvatar,
    attachDriverImage,
    attachWorkshopImage,
    attachGasStationImage,
    attachWorkshopLogo,
    attachGasStationLogo,
};
