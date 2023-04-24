import nodemailer from "nodemailer";
import { User } from "../models/User";
import { Product } from "../models/Product";

class MarketingService {
  private transporter: nodemailer.Transporter;

  constructor() {
    // Configurações para o serviço de email utilizado
    this.transporter = nodemailer.createTransport({
      host: "smtp.example.com",
      port: 587,
      auth: {
        user: "user@example.com",
        pass: "password",
      },
    });
  }

  async sendPromotionalEmail(email: string, message: string) {
    try {
      // Envio do email utilizando o serviço configurado
      const info = await this.transporter.sendMail({
        from: "Promotions <promotions@example.com>",
        to: email,
        subject: "Special offer for you!",
        text: message,
      });

      console.log("Email sent: " + info.response);
    } catch (err) {
      console.error(err);
      throw new Error("Failed to send promotional email");
    }
  }
  
  static async sendMarketingEmails(): Promise<void> {
    try {
      // Obter todos os usuários inscritos na newsletter
      const subscribedUsers = await User.findAll({
        where: { newsletterSubscription: true },
      });

      // Obter todos os produtos com estoque baixo
      const lowStockProducts = await Product.findAll({
        where: { stock: { $lte: 10 } },
      });

      // Criar lista de usuários e produtos para incluir no e-mail
      const usersProductsList = subscribedUsers.map((user) => {
        const products = lowStockProducts.filter((product) =>
          user.favoriteProducts.includes(product.id)
        );
        return { user, products };
      });

      // Enviar e-mails personalizados para cada usuário
      for (const userProducts of usersProductsList) {
        const { user, products } = userProducts;
        const userEmail = user.email;

        // Construir o conteúdo do e-mail
        let emailContent = "Olá " + user.firstName + ",\n\n";
        emailContent +=
          "Aqui está uma lista dos seus produtos favoritos que estão com estoque baixo:\n\n";

        for (const product of products) {
          emailContent +=
            "- " + product.name + " (estoque atual: " + product.stock + ")\n";
        }

        emailContent += "\nObrigado por escolher nossa loja!\n";

        // Enviar e-mail para o usuário
        await MarketingService.sendEmail(userEmail, emailContent);
      }
    } catch (error) {
      console.error("Erro ao enviar e-mails de marketing:", error);
    }
  }

  static async sendEmail(to: string, content: string): Promise<void> {
    // Lógica para enviar o e-mail usando uma biblioteca de terceiros, por exemplo
    console.log("Enviando e-mail para " + to + " com o seguinte conteúdo:\n");
    console.log(content);
  }
}
