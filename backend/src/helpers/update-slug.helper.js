import slugify from "slugify"

const updateSlug = async function (newTitle) {

    if (!newTitle || typeof newTitle !== "string") {
        throw new ResponseError(400, "Server Error", "New title is required to update slug");
    }

    const slugifiedTitle = slugify(newTitle, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
    });

    const sufixedSlug = slugifiedTitle + "-" + this._id;
    this.title_slug = sufixedSlug;

    await this.save();

    return sufixedSlug;
};


export { updateSlug };