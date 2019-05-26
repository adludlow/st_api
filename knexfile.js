module.exports = {
  dev_st: {
    client: 'pg',
    connection: process.env.DB_ST_MIGRATE,
    migrations: {
      directory: './migrations/st'
    }
  }
}
