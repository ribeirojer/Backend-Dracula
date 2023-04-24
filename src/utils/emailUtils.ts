import nodemailer from "nodemailer";

export async function sendPasswordResetEmail(
  email: string,
  resetLink: string
): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: "2525",
    auth: {
      user: "1855e5eb96600e",
      pass: "53275d8c735b83",
    },
  } as any);

  await transporter.sendMail({
    from: "recuperacaodesenha@dracula.com",
    to: email,
    subject: "Password Reset",
    html: `
      <p>Hi,</p>
      <p>Please click the following link to reset your password:</p>
      <a href="${resetLink}">${resetLink}</a>
    `,
  });
}
