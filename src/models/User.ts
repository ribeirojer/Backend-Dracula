import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";

class User extends Model {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public phoneNumber!: string;
  public address!: {
    street: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  public billingInfo!: {
    cardNumber: string;
    cardHolderName: string;
    expirationDate: string;
    cvv: string;
  };
  public createdAt!: Date;
  public updatedAt!: Date;
  public passwordResetToken!: string;
  public passwordResetExpiresAt!: Date;
  permissions: any;
  favoriteProducts: any;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    address: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    billingInfo: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    passwordResetToken: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    passwordResetExpiresAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize,
  }
);

export { User };
