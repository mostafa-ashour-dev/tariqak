import User from "../../models/schemas/auth/user.model";
import Driver from "../../models/schemas/auth/driver.model";
import Workshop from "../../models/schemas/workshop/work-shop.model";
import Review from "../../models/schemas/review/review.model";
import ResponseError from "../../classes/response-error.class";
import returnMissingFields from "../../utils/missing-fields.util";
import paginateResults from "../../utils/paginate-results.util";
import GasStation from "../../models/schemas/gas-station/gas-station.model";

const createReview = async (req, res) => {
    const { user } = req;
    const { rating, comment, image } = req.body || {};
    const { referenceType, target, is_anonymous } = req.params || {};

    if (!referenceType || !target) {
        throw new ResponseError(
            400,
            "Input Error",
            "Reference and reference are required"
        );
    }

    if (referenceType !== "driver" && referenceType !== "workshop" && referenceType !== "gas-station") {
        throw new ResponseError(400, "Input Error", "Invalid reference type");
    }

    const missingFields = returnMissingFields({
        rating,
    });

    if (missingFields.length > 0) {
        throw new ResponseError(
            400,
            "Input Error",
            "Missing fields: " + missingFields.join(", ")
        );
    }

    const findUser = await User.findById(user._id);
    if (!findUser) {
        throw new ResponseError(400, "Input Error", "User not found");
    }

    let referenceData = {};
    let refrenceDoc;
    if (referenceType === "driver") {
        const existingUser = await User.findOne({ username: target });
        if (!existingUser) {
            throw new ResponseError(400, "Input Error", "Driver not found");
        }

        refrenceDoc = await Driver.findOne({ user: existingUser._id });
        if (!refrenceDoc) {
            throw new ResponseError(400, "Input Error", "Driver not found");
        }
        referenceData.type = "driver";
        referenceData.target = refrenceDoc._id;
    } else if (referenceType === "workshop") {
        refrenceDoc = await Workshop.findOne({ title_slug: target });
        if (!refrenceDoc) {
            throw new ResponseError(400, "Input Error", "Workshop not found");
        }
        referenceData.type = "workshop";
        referenceData.target = refrenceDoc._id;
    } else if (referenceType === "gas-station") {
        refrenceDoc = await GasStation.findOne({ title_slug: target });
        if (!refrenceDoc) {
            throw new ResponseError(400, "Input Error", "Gas station not found");
        }
        referenceData.type = "gas-station";
        referenceData.target = refrenceDoc._id;
    }

    await Review.create({
        user: findUser._id,
        reference: {
            type: referenceData.type,
            target: referenceData.target,
        },
        rating,
        comment,
        image,
        is_anonymous,
    });

    if (refrenceDoc) {
        await refrenceDoc.updateRating();
    }

    res.status(201).json({
        success: true,
        type: "success",
        message: "Review created successfully",
        data: null,
    });
};

const getTargetReviews = async (req, res) => {
    const { referenceType, target } = req.params || {};

    if (!referenceType || !target) {
        throw new ResponseError(
            400,
            "Input Error",
            "Reference and reference are required"
        );
    }

    if (referenceType !== "driver" && referenceType !== "workshop" && referenceType !== "gas-station") {
        throw new ResponseError(400, "Input Error", "Invalid reference type");
    }

    let reviews;

    if (referenceType === "driver") {
        const existingUser = await User.findOne({ username: target });
        if (!existingUser) {
            throw new ResponseError(400, "Input Error", "Driver not found");
        }

        const findDriver = await Driver.findOne({ user: existingUser._id });
        if (!findDriver) {
            throw new ResponseError(400, "Input Error", "Driver not found");
        }

        reviews = await paginateResults({
            model: Review,
            query: {
                "reference.type": "driver",
                "reference.target": findDriver._id,
            },
            populate: "user",
            select: "username full_name avatar role",
        });
    } else if (referenceType === "workshop") {
        const findWorkshop = await Workshop.findOne({ title_slug: target });
        if (!findWorkshop) {
            throw new ResponseError(400, "Input Error", "Workshop not found");
        }

        reviews = await paginateResults({
            model: Review,
            query: {
                "reference.type": "workshop",
                "reference.target": findWorkshop._id,
            },
            populate: "user",
            select: "username full_name avatar role",
        });
    } else if (referenceType === "gas-station") {
        const findGasStation = await GasStation.findOne({ title_slug: target });
        if (!findGasStation) {
            throw new ResponseError(400, "Input Error", "Gas station not found");
        }

        reviews = await paginateResults({
            model: Review,
            query: {
                "reference.type": "gas-station",
                "reference.target": findGasStation._id,
            },
            populate: "user",
            select: "username full_name avatar role",
        });
    }

    res.status(200).json({
        success: true,
        type: "success",
        message: "Reviews fetched successfully",
        data: {
            ...reviews,
            rating:
                (reviews.results.length > 0 &&
                    reviews.results.reduce(
                        (acc, review) => acc + review.rating,
                        0
                    ) / reviews.results.length) ||
                0,
        },
    });
};

export { createReview, getTargetReviews };
