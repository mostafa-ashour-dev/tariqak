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
        const skip = (parseInt(page, 10) - 1) * parseInt(limit, 10);
        const results = model && await model
            .find(query)
            .skip(skip)
            .limit(limit)
            .populate(populate, select)
            .lean() || results || [];
        const total = model && await model.countDocuments() || results && results.length || 0;
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
            results,
        };

        return resultsData;
    } catch (error) {
        throw new ResponseError(400, "Pagination Error", error.message);
    }
};

export default paginateResults;
