import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const SMTP_HOST = process.env.SMTP_HOST as string;
const SMTP_PORT = parseInt(process.env.SMTP_PORT as string, 10);
const SMTP_EMAIL = process.env.SMTP_EMAIL as string;
const SMTP_PASSWORD = process.env.SMTP_PASSWORD as string;

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  auth: {
    user: SMTP_EMAIL,
    pass: SMTP_PASSWORD,
  },
} as any);

export async function sendPasswordResetEmail(
  email: string,
  resetLink: string
): Promise<void> {
  const passwordResetConfig = {
    subject: "Redefinição de Senha",
    html: `
      <p>Olá,</p>
      <p>Clique no link abaixo para redefinir sua senha:</p>
      <a href="${resetLink}" style="display: inline-block; margin-top: 16px; padding: 12px; background-color: #007bff; color: #fff; text-decoration: none;">Redefinir senha</a>
    `,
  };

  const info = await transporter.sendMail({
    from: "recuperacaodesenha@dracula.com",
    to: email,
    ...passwordResetConfig,
  });

  console.log("Password reset email sent: %s", info.messageId);
}

export async function sendEmailConfirmation(
  email: string,
  confirmationLink: string
): Promise<void> {
  const emailConfirmationConfig = {
    subject: "Confirmação de Email",
    html: `
      <p>Olá,</p>
      <p>Clique no link abaixo para confirmar seu email:</p>
      <a href="${confirmationLink}" style="display: inline-block; margin-top: 16px; padding: 12px; background-color: #007bff; color: #fff; text-decoration: none;">Confirmar email</a>
    `,
  };
  const info = await transporter.sendMail({
    from: "confirmacao@dracula.com",
    to: email,
    ...emailConfirmationConfig,
  });

  console.log("Email confirmation sent: %s", info.messageId);
}
