import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import { OrderItem } from "./OrderItem";
import { User } from "./User";
import { Product } from "./Product";

class Order extends Model {
  id!: number;
  status!: string;
  totalPrice!: number;

  static associate() {
    Order.belongsTo(User, { foreignKey: "userId" });
    Order.hasMany(OrderItem, { as: "items", onDelete: "CASCADE" });
    Order.belongsToMany(Product, {
      through: "OrderProduct",
      foreignKey: "orderId",
    });
  }
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "processing", "shipped", "delivered", "canceled"),
      allowNull: false,
      defaultValue: "pending",
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Brasil",
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    paymentMethod: {
      type: DataTypes.ENUM("credit_card", "debit_card", "boleto"),
      allowNull: false,
    },
    cardNumber: {
      type: DataTypes.STRING,
    },
    cardExpirationDate: {
      type: DataTypes.DATE,
    },
    cardCvv: {
      type: DataTypes.STRING,
    },
    boletoNumber: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Order",
  }
);

export { Order };
