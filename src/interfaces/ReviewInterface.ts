export interface IReview {
  id: number;
  userId: number;
  name: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}
