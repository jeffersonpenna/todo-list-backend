declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production',
    NODE_PORT: string,
    DATABASE_URL: string
  }
}
