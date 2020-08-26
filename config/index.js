export const dbConfig = {
  connectionString:
    process.env.NODE_ENV === 'production'
      ? process.env.HEROKU_POSTGRESQL_ONYX_URL
      : process.env.DATABASE_LOCAL,
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : null,
}

export const dbMock = {
  connectionString: process.env.DATABASE_URL
    ? process.env.DATABASE_URL
    : process.env.DATABASE_TEST,

  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : null,
}

export const port = process.env.PORT || 8080
