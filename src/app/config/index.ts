import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  databaseUrl: process.env.DATABASE_URL as string,
  NODE_ENV: process.env.NODE_ENV as string,

  // JWT configuration
  JWT_SECRET: process.env.JWT_SECRET as string,
  JWT_EXPIRES: process.env.JWT_EXPIRES as string,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,

  // bcrypt configuration
  BCRYPT_SOLD_ROUND:
    parseInt(process.env.BCRYPT_SOLD_ROUND as string, 10) || 12,

  // admin
  ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
};
