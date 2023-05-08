import { Document, Schema, Model, model } from "mongoose";

// interface IUser extends Document {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   phoneNumber?: string;
//   address?: {
//     street: string;
//     city: string;
//     state: string;
//     country: string;
//     zipCode: string;
//   };
//   billingInfo?: {
//     cardNumber: string;
//     cardHolderName: string;
//     expirationDate: string;
//     cvv: string;
//   };
//   createdAt: Date;
//   updatedAt: Date;
//   passwordResetToken?: string;
//   passwordResetExpiresAt?: Date;
//   permissions: any;
//   favoriteProducts: any;
// }

const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 1,
    maxlength: 100,
  },
  password: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
  },
  phoneNumber: {
    type: String,
    minlength: 1,
    maxlength: 20,
  },
  address: {
    type: {
      street: String,
      city: String,
      state: String,
      country: String,
      zipCode: String,
    },
    default: null,
  },
  billingInfo: {
    type: {
      cardNumber: String,
      cardHolderName: String,
      expirationDate: String,
      cvv: String,
    },
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  passwordResetToken: {
    type: String,
    default: null,
  },
  passwordResetExpiresAt: {
    type: Date,
    default: null,
  },
  permissions: {
    type: [],
    default: null,
  },
  favoriteProducts: {
    type: [],
    default: null,
  },
});

const User: Model<any> = model("User", UserSchema);

export { User };
