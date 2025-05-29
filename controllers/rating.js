import {Rating} from "../models/models.js";

export async function createNewRating(req, res) {
  try {
    const { userId } = req;
    const { carId, rating, comment } = req.body;

    if (!rating || !carId) return res.status(400).json();

    if (rating < 1 || rating > 5) return res.status(400).json();

    const userRating = await Rating.findOne({
      userId,
      carId,
    });

    if (userRating) {
      userRating.rating = rating;
      if (comment) userRating.comment = comment;
      await userRating.save();
      return res.status(200).json(userRating);
    }
    await Rating.create({
      userId,
      carId,
      rating,
      comment,
    });
    return res.status(200).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
}
