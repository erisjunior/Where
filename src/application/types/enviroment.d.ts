declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      PORT?: string
      PWD: string

      APP_URL: string

      DATABASE_URL: string
      DB_HOST: string
      DB_USER: string
      DB_PASS: string
      DB_NAME: string
      DB_PORT: number

      NEXTAUTH_SECRET: string

      STORAGE_TYPE: 'local' | 's3'
      AWS_ACCESS_KEY_ID: string
      AWS_SECRET_ACCESS_KEY: string
      AWS_DEFAULT_REGION: string
    }
  }
}

export {}
