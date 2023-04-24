import { DataTypes } from "sequelize";
import sequelize from "../config/database";
import { Product } from "../models/Product";

const CartItem = sequelize.define("cart_item", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

CartItem.belongsTo(Product);

export default CartItem ;
