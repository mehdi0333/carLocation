import { Car, Rating } from "../models/models.js";

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
    } else {
      await Rating.create({
        userId,
        carId,
        rating,
        comment,
      });
    }
    // Update the car's average rating
    const ratings = await Rating.find({ carId });
    console.log(ratings);
    const totalRating = ratings.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = ratings.length ? totalRating / ratings.length : 0;
    console.log(averageRating);
    console.log(ratings.length);
    await Car.findByIdAndUpdate(carId, {
      rating: averageRating.toFixed(1),
      totalRating: ratings.length,
    });
    return res.status(200).send();
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
}
