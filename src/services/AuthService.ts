import { IUser } from "../interfaces/UserInterface";
import { UserRepository } from "../repositories/UserRepository";
import { hashPassword } from "../utils/passwordUtils";
import { sendPasswordResetEmail } from "../utils/emailUtils";

class AuthService {
  static async forgotPassword(email: string): Promise<void> {
    // Verifica se o usuário existe
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    // Gera um token de redefinição de senha
    const token = UserRepository.generatePasswordResetToken(user);

    // Envia um email com o link para redefinir a senha
    await sendPasswordResetEmail(user.email, token);
  }

  static async resetPassword(
    token: string,
    newPassword: string
  ): Promise<IUser> {
    const user = await UserRepository.findByPasswordResetToken(token);

    if (!user) {
      throw new Error("Token inválido");
    }

    // Atualiza a senha do usuário
    user.password = await hashPassword(newPassword);
    user.passwordResetToken = "null";
    user.passwordResetExpiresAt = new Date();
    UserRepository.save(user);

    return user;
  }
}

export default AuthService;
