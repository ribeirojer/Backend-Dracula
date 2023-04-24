import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import { Product } from "./Product";
import { User } from "./User";

export class Review extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public rating!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Relationship with User model
  public userId!: number;
  public readonly user?: User;

  // Relationship with Product model
  public productId!: number;
  public readonly product?: Product;
}

Review.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    tableName: "reviews",
    sequelize,
  }
);

// Define associations
Review.belongsTo(User, { foreignKey: "userId", as: "user" });
Review.belongsTo(Product, { foreignKey: "productId", as: "product" });
