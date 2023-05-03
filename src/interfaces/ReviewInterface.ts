export interface IReview {
  id: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
