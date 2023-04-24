import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

export interface PaymentAttributes {
  id: number;
  orderId: number;
  paymentMethod: string;
  amount: number;
  status: string;
}

export class Payment
  extends Model<PaymentAttributes>
  implements PaymentAttributes
{
  public id!: number;
  public orderId!: number;
  public paymentMethod!: string;
  public amount!: number;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    modelName: "Payment",
    tableName: "payments",
  }
);
