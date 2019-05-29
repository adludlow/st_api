module.exports = {
  dev_st: {
    client: 'pg',
    connection: process.env.DB_ST_MIGRATE,
    migrations: {
      directory: './migrations/st'
    }
  },
  dev_postgres: {
    client: 'pg',
    connection: process.env.DB_ADMIN_MIGRATE,
    migrations: {
      directory: './migrations/postgres'
    }
  }
}
