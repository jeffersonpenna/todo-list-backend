declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production',
    NODE_PORT: string,
    DB_TYPE: 'postgres',
    DB_HOST: string,
    DB_USERNAME: string,
    DB_PASSWORD: string,
    DB_NAME: string,
    DB_PORT: string,
  }
}
