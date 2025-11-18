import ResponseError from "../classes/response-error.class";

const paginateResults = async ({
    model,
    results,
    query = {},
    page = 1,
    limit = 10,
    populate = [],
    select = "",
}) => {
    try {
        if (!model)
            throw new ResponseError(400, "Input Error", "Model is required");

        const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);

        const data = model
            ? await model
                  .find(query)
                  .skip(skip)
                  .limit(limit)
                  .populate(populate, select)
            : results;
        const total = model
            ? await model.countDocuments(query)
            : results.length;
        const totalPages = Math.ceil(total / limit);

        const pageInfo = {
            next: page * limit < total ? { page: page + 1, limit } : null,
            prev: page > 1 ? { page: page - 1, limit } : null,
        };

        const resultsData = {
            ...pageInfo,
            limit: parseInt(limit, 10),
            total_count: total,
            total_pages: totalPages,
            results: model ? data : results,
        };

        return resultsData;
    } catch (error) {
        throw new ResponseError(400, "Pagination Error", error.message);
    }
};

export default paginateResults;
