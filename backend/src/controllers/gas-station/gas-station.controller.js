import User from "../../models/schemas/auth/user.model.js";
import GasStation from "../../models/schemas/gas-station/gas-station.model.js";
import ResponseError from "../../classes/response-error.class.js";
import returnMissingFields from "../../utils/missing-fields.util.js";
import paginateResults from "../../utils/paginate-results.util.js";
import slugify from "slugify";
import crypto from "crypto";

const createGasStation = async (req, res) => {
    const { user } = req;
    const { title, description, locations, images, services, logo } =
        req.body || {};
    const missingFields = returnMissingFields({
        title,
        locations,
        services,
        locations
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

    if (findUser.role !== "admin") {
        throw new ResponseError(
            400,
            "Input Error",
            "Unauthorized access - Only admins can create a gas station"
        );
    }

    const title_slug =
        slugify(title, {
            lower: true,
            strict: true,
            remove: /[*+~.()'"!:@]/g,
        }) +
        "-" +
        crypto.randomBytes(4).toString("hex");


    const newGasStation = await GasStation.create({
        title,
        title_slug,
        description,
        locations: locations.map((currentLocation) => ({
            location: {
                type: "Point",
                coordinates: [
                    currentLocation.location.longitude,
                    currentLocation.location.latitude,
                ],
            },
            address: currentLocation.address
        })),
        images,
        services,
        logo,
        reference: {
            type: "admin",
            target: findUser._id
        }
    });

    await newGasStation.updateTitleSlug();

    res.status(201).json({
        success: true,
        type: "success",
        message: "Gas station created successfully",
        data: null
    })
}

const getGasStation = async (req, res) => {
    const { gasStationSlug } = req.params;

    if (!gasStationSlug) {
        throw new ResponseError(400, "Input Error", "Gas station slug is required");
    }

    const findGasStation = await GasStation.findOne({ title_slug: gasStationSlug }).select("-reference");
    if (!findGasStation) {
        throw new ResponseError(400, "Input Error", "Gas station not found");
    }

    res.status(200).json({
        success: true,
        type: "success",
        message: "Gas station fetched successfully",
        data: findGasStation
    })


}

const getNearbyStations = async (req, res) => {
    const { location: { latitude, longitude }, radius = 10 } = req.body;
    const { page = 1, limit = 10 } = req.query;
    const missingFields = returnMissingFields({ latitude, longitude });

    if (missingFields.length > 0) {
        throw new ResponseError(
            400,
            "Input Error",
            "Missing fields: " + missingFields.join(", ")
        );
    }

    const paginatedData = await paginateResults({
        model: GasStation,
        query: {
            "locations.location": {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: radius * 1000,
                },
            },
        },
        page: page,
        limit: limit
    });

    res.status(200).json({
        success: true,
        type: "success",
        message: "Gas stations found successfully",
        data: paginatedData
    });


}

const editGasStation = async (req, res) => {
    const { user } = req;
    const { title, description, images, services, logo } =
        req.body || {};
    const { gasStationSlug } = req.params;

    if (!gasStationSlug) {
        throw new ResponseError(
            400,
            "Input Error",
            "Gas station slug is required"
        );
    }

    const findUser = await User.findById(user._id);
    if (!findUser) {
        throw new ResponseError(400, "Input Error", "User not found");
    }
    if (findUser.role !== "admin") {
        throw new ResponseError(
            400,
            "Input Error",
            "Unauthorized access - Only admins can edit a gas station"
        );
    }

    const findGasStation = await GasStation.findOne({
        title_slug: gasStationSlug,
        reference: {
            type: "admin",
            target: findUser._id
        }
    });

    if (!findGasStation) {
        throw new ResponseError(400, "Input Error", "Gas station not found");
    }

    if (title) {
        await findGasStation.updateTitleSlug(title);
    }

    await GasStation.updateOne({ _id: findGasStation._id }, {
        title,
        description,
        images,
        services,
        logo
    });

    res.status(200).json({
        success: true,
        type: "success",
        message: "Gas station updated successfully",
        data: null
    })
}

const addGasStationLocation = async (req, res) => {
    const { user } = req;
    const { gasStationSlug } = req.params;
    const {
        location: { latitude, longitude },
        address,
    } = req.body || {};

    if (!gasStationSlug) {
        throw new ResponseError(
            400,
            "Input Error",
            "Gas station slug is required"
        );
    }


    const missingFields = returnMissingFields({ latitude, longitude });

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
    if (findUser.role !== "admin") {
        throw new ResponseError(
            400,
            "Input Error",
            "Unauthorized access - Only admins can edit a gas station"
        );
    }

    const findGasStation = await GasStation.findOne({
        title_slug: gasStationSlug,
        reference: {
            type: "admin",
            target: findUser._id
        }
    });

    if (!findGasStation) {
        throw new ResponseError(400, "Input Error", "Gas station not found");
    }

    await GasStation.updateOne({ _id: findGasStation._id }, {
        $push: {
            locations: {
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude],
                },
                address
            }
        }
    });

    res.status(200).json({
        success: true,
        type: "success",
        message: "Gas station location added successfully",
        data: null
    })


}

export { createGasStation, getNearbyStations, editGasStation, addGasStationLocation, getGasStation };