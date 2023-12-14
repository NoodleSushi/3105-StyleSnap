declare namespace NodeJS {
  export interface ProcessEnv {
    SERVER_PORT: string;
    DB_HOST: string;
    DB_USER: string;
    DB_PORT: string;
    DB_PASSWORD: string;
    DB_DATABASE: string;
    CORS_ORIGIN: string;
  }
}