import ResponseError from "../classes/response-error.class";

const PATHS_WITH_NO_BODY = ["/auth/logout", "/auth/refresh"];

const messingBodyMiddleware = (req, res, next) => {
    const path = req.originalUrl.split("/");
    const lastPath = "/" + path.splice(path.length - 2, 2).join("/");

    if (PATHS_WITH_NO_BODY.includes(lastPath.trim())) {
        next();
        return;
    }

    if (!req.body) {
        throw new ResponseError(400, "Input Error", "Body is required");
    }

    if (Object.keys(req.body).length === 0) {
        throw new ResponseError(400, "Input Error", "Body is empty");
    }
    next();
};

export default messingBodyMiddleware;
