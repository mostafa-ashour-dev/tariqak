import Review from "../models/schemas/review/review.model";

const updateRating = async function (referenceType) {

    if (!referenceType) {
        throw new ResponseError(400, "Server Error", "Reference type is required to update rating");
    }


    if (!["gas-station", "workshop"].includes(referenceType)) {
        throw new ResponseError(400, "Server Error", "Invalid reference type for updating rating");
    }

    const reviews = await Review.find({
        "reference.type": referenceType,
        "reference.target": this._id,
    });

    if (!reviews.length) {
        this.rating = 0;
        await this.save();
        return;
    }

    const rating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
        reviews.length;

    this.rating = Math.round(rating * 10) / 10;
    await this.save();
};

export { updateRating };