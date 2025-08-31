import User from "../../models/schemas/auth/user.model";
import Workshop from "../../models/schemas/workshop/work-shop.model";
import ResponseError from "../../classes/response-error.class";
import returnMissingFields from "../../utils/missing-fields.util";

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

export { createWorkshop, getWorkshop };
