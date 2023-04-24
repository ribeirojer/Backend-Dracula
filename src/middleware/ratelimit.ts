const rateLimit = require("express-rate-limit");

// Define o limite de requisições por IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de 100 requisições por IP
  message: "Você excedeu o limite de requisições. Tente novamente mais tarde.",
});

module.exports = limiter;
