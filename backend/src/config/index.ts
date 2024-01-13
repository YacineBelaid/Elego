import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });

export const {
  NODE_ENV,
  PORT,
  LOG_FORMAT,
  LOG_DIR,
  SECRET,
  STORE_SESSIONS_IN_MYSQL,
  SECURE_SESSION_COOKIE,
  ORIGIN,
  CREDENTIALS,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  EXPRESS_TRUST_PROXY,
} = process.env;
