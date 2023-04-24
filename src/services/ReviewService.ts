import { Review } from "../models/Review";

export class ReviewService {
  static async createReview(data: any): Promise<Review> {
    const review = await Review.create(data);
    return review;
  }

  static async getReviewById(id: number): Promise<Review | null> {
    const review = await Review.findByPk(id);
    return review;
  }

  static async getReviewsByProductId(productId: number): Promise<Review[]> {
    const reviews = await Review.findAll({ where: { productId } });
    return reviews;
  }

  static async updateReviewById(
    id: number,
    data: any
  ): Promise<[number, Review[]]> {
    const [rowsAffected] = await Review.update(data, {
      where: {
        id,
      },
    });
    const updatedReviews = await Review.findAll({
      where: {
        id,
      },
    });

    return [rowsAffected, updatedReviews];
  }

  static async deleteReviewById(id: number): Promise<number> {
    const result = await Review.destroy({
      where: {
        id,
      },
    });
    return result;
  }
}
