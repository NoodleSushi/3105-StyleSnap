import { UserInfo } from "./interfaces";

declare namespace NodeJS {
  export interface ProcessEnv {
    SERVER_PORT: string;
    DB_HOST: string;
    DB_USER: string;
    DB_PORT: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    CORS_ORIGIN: string;
    ACCESS_TOKEN_SCERET: string;
    REFRESH_TOKEN_SECRET: string;
  }
}

declare module "express-serve-static-core" {
  interface Request {
    user?: UserInfo;
  }
}
