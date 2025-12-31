import ResponseError from "../classes/response-error.class";

const paginateResults = async ({
    model,
    results,
    query = {
        find: {},
        populate: "",
        select: "",
    },
    page = 1,
    limit = 10,
    geo,
}) => {
    try {
        if (!model)
            throw new ResponseError(400, "Input Error", "Model is required");

        const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

        let totalCount = 0;
        let totalPages = 0;

        let data = null;
        if (!geo) {
            data = await model
                .find(query.find)
                .skip(skip)
                .limit(limit)
                .populate(query.populate, query.select);

            totalCount = await model.countDocuments(query.find);
            totalPages = Math.ceil(totalCount / limit);
        } else {
            const aggData = await model.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: "Point",
                            coordinates: [geo.longitude, geo.latitude],
                        },
                        distanceField: geo.distanceField || "distance",
                        maxDistance: geo.maxDistance || 5000,
                        spherical: true,
                        key: geo.path,
                    },
                },
                {
                    $facet: {
                        data: [{ $skip: skip }, { $limit: limit }],
                        totalCount: [{ $count: "count" }],
                    },
                },
            ]);

            totalCount = (await aggData[0].totalCount[0]?.count) || 0;
            totalPages = Math.ceil(totalCount / limit);

            data = await aggData[0].data;
        }

        const pageInfo = {
            next_page: page * limit < totalCount ? { page: page + 1, limit } : null,
            prev_page: page > 1 ? { page: page - 1, limit } : null,
        };

        const resultsData = {
            ...pageInfo,
            limit: parseInt(limit, 10),
            total_count: totalCount,
            total_pages: totalPages,
            results: data,
        };

        return resultsData;
    } catch (error) {
        throw new ResponseError(400, "Pagination Error", error.message);
    }
};

export default paginateResults;
