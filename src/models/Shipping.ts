import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

export interface IShippingAttributes {
  id?: number;
  method: string;
  price: number;
  deliveryTime: string;
}

export class Shipping
  extends Model<IShippingAttributes>
  implements IShippingAttributes
{
  public id!: number;
  public method!: string;
  public deliveryTime!: string;
  public price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Shipping.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "shippings",
  }
);
