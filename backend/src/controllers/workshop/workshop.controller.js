import User from "../../models/schemas/auth/user.model";
import Workshop from "../../models/schemas/workshop/work-shop.model";
import ResponseError from "../../classes/response-error.class";
import returnMissingFields from "../../utils/missing-fields.util";
import paginateResults from "../../utils/paginate-results.util";

const createWorkshop = async (req, res) => {
    const { user } = req;
    const { title, description, locations, images, services, logo } =
        req.body || {};

    const missingFields = returnMissingFields({
        title,
        description,
        locations,
        logo,
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
            "Unauthorized access - Only admin can create a workshop"
        );
    }

    await Workshop.create({
        title,
        description,
        locations,
        images,
        services,
        logo,
        user: findUser._id,
    });

    res.status(201).json({
        success: true,
        type: "success",
        message: "Workshop created successfully",
        data: null,
    });
};

const getWorkshop = async (req, res) => {
    const { workshopSlug } = req.params;

    if (!workshopSlug) {
        throw new ResponseError(
            400,
            "Input Error",
            "Workshop slug is required"
        );
    }

    const findWorkshop = await Workshop.findOne({ title_slug: workshopSlug });
    if (!findWorkshop) {
        throw new ResponseError(400, "Input Error", "Workshop not found");
    }

    res.status(200).json({
        success: true,
        type: "success",
        message: "Workshop fetched successfully",
        data: findWorkshop,
    });
};

const editWorkshop = async (req, res) => {
    const { user } = req;
    const { workshopSlug } = req.params;
    const { title, description, images, services, logo } =
        req.body || {};

    if (!workshopSlug) {
        throw new ResponseError(
            400,
            "Input Error",
            "Workshop slug is required"
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
            "Unauthorized access - Only admins can edit a workshop"
        );
    }

    const findWorkshop = await Workshop.findOne({
        title_slug: workshopSlug,
        user: findUser._id,
    });
    if (!findWorkshop) {
        throw new ResponseError(400, "Input Error", "Workshop not found");
    }

    if (title) {
        await findWorkshop.updateTitleSlug(title);
    }

    await Workshop.findByIdAndUpdate(findWorkshop._id, {
        title,
        description,
        images,
        services,
        logo,
    });

    res.status(200).json({
        success: true,
        type: "success",
        message: "Workshop edited successfully",
        data: null,
    });
};

const addWorkshopLocation = async (req, res) => {
    const { user } = req;
    const { workshopSlug } = req.params;
    const {
        location: { latitude, longitude },
        address,
    } = req.body || {};

    if (!workshopSlug) {
        throw new ResponseError(
            400,
            "Input Error",
            "Workshop slug is required"
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
            "Unauthorized access - Only admins can add a workshop location"
        );
    }

    const findWorkshop = await Workshop.findOne({
        title_slug: workshopSlug,
        user: findUser._id,
    });
    if (!findWorkshop) {
        throw new ResponseError(400, "Input Error", "Workshop not found");
    }

    await Workshop.findByIdAndUpdate(findWorkshop._id, {
        $push: {
            locations: {
                location: {
                    type: "Point",
                    coordinates: [longitude, latitude],
                },
                address,
            },
        },
    });

    res.status(200).json({
        success: true,
        type: "success",
        message: "Workshop location added successfully",
        data: null,
    });
};

const getWorkshops = async (req, res) => {
    const { page = 1, limit = 10 } = req.query || {};

    const paginatedData = await paginateResults({
        model: Workshop,
        page: page,
        limit: limit,
    });

    res.status(200).json({
        success: true,
        type: "success",
        message: "Workshops fetched successfully",
        data: paginatedData,
    });
};

export {
    createWorkshop,
    getWorkshop,
    getWorkshops,
    editWorkshop,
    addWorkshopLocation,
};
