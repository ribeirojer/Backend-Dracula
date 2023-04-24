import request from "supertest";
import app from "../src/app";
import { User } from "../src/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { describe, expect, beforeEach, it } from "vitest";

const JWT_SECRET = process.env.JWT_SECRET || "default_secret";

describe("POST /api/auth/login", () => {
  it("deve retornar um token JWT e informações do usuário se as credenciais estiverem corretas", async () => {
    // Cria um usuário para ser usado nos testes
    const hashedPassword = await bcrypt.hash("password123", 12);
    let user = await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: hashedPassword,
    });

    // Gera um token JWT para o usuário
    let token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password: "password123" })
      .expect(200);

    expect(response.body.token).toBeTruthy();
    expect(response.body.user).toEqual({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
  });
  /**
  it("deve retornar erro 404 se o usuário não existir", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "not.exists@example.com", password: "password123" })
      .expect(404);

    expect(response.body.error).toBe("User not found");
  });

  it("deve retornar erro 404 se a senha estiver incorreta", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: user.email, password: "wrong_password" })
      .expect(404);

    expect(response.body.error).toBe("Algo deu errado");
  }); */
});
/**
describe("POST /api/auth/register", () => {
  let user: { email: any };
  let token: string;

  beforeEach(async () => {
    // Cria um usuário para ser usado nos testes
    const hashedPassword = await bcrypt.hash("password123", 12);
    let user = await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: hashedPassword,
    });

    // Gera um token JWT para o usuário
    token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });
  });

  it("deve criar um novo usuário e retornar um token JWT", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        firstName: "Jane",
        lastName: "Doe",
        email: "jane.doe@example.com",
        password: "password123",
      })
      .expect(201);

    expect(response.body.token).toBeTruthy();
    expect(response.body.user.firstName).toBe("Jane");
    expect(response.body.user.lastName).toBe("Doe");
    expect(response.body.user.email).toBe("jane.doe@example.com");

    const newUser = await User.findOne({
      where: { email: "jane.doe@example.com" },
    });
    expect(newUser).toBeTruthy();
    expect(newUser?.firstName).toBe("Jane");
    expect(newUser?.lastName).toBe("Doe");
  });

  it("deve retornar erro 400 se o email já estiver em uso", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({
        firstName: "John",
        lastName: "Doe",
        email: user.email,
        password: "password123",
      })
      .expect(400);

    expect(response.body.error).toBe("message");
  });
}); */
