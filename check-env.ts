import dotenv from "dotenv";
dotenv.config();

console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("SECURE PASSWORD:", process.env.SECURE_PASSWORD);
