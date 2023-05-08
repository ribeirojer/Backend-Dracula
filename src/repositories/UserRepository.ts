import { IUser } from "../interfaces/UserInterface";
import { User } from "../models/User";

export class UserRepository {
  static async save(user: IUser) {
    await User.updateOne(
      {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        phoneNumber: user.phoneNumber,
        address: user.address,
        billingInfo: user.billingInfo,
        passwordResetToken: user.passwordResetToken,
        passwordResetExpiresAt: user.passwordResetExpiresAt,
      },
      { where: { id: user.id } }
    );

    const updatedUser = await User.findOne({ id: user.id });
    return updatedUser!;
  }
  static generatePasswordResetToken(user: IUser) {
    const token = Math.random().toString(36).substr(2);
    user.passwordResetToken = token;
    user.passwordResetExpiresAt = new Date(Date.now() + 3600000); // 1 hora
    return token;
  }

  static async findByPasswordResetToken(token: string): Promise<IUser | null> {
    const user = await User.findOne({
      where: {
        passwordResetToken: token,
      },
    });
    console.log(user);

    return user || null;
  }
  static async findByEmail(email: string): Promise<IUser | null> {
    const user = await User.findOne({ where: { email } });
    return user || null;
  }

  static async create(user: IUser): Promise<IUser> {
    const createdUser = await User.create();
    return createdUser[0];
  }
}
