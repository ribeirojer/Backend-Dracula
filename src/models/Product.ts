import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import { IReview } from "../interfaces/ReviewInterface";

class Product extends Model {
  public id!: number;
  public name!: string;
  public brand!: string;
  public price!: number;
  public oldPrice?: number;
  public description!: string;
  public image!: string;
  public stock!: number;
  public rating!: number;
  public salePercentage!: number;
  public isNew!: boolean;
  public category!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public comments?: IReview[];
  ratings: any;
  createRating: any;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    oldPrice: {
      type: DataTypes.DECIMAL(10, 2),
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    salePercentage: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isNew: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
  }
);

export { Product };
