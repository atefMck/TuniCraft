const db = "tunicraft_dev";
const dbUsername = "tunicraft";
const dbPassword = "DirrabOmmek";
const dbHost = "localhost";
const dbDialect = "mysql";

module.exports = {
  HOST: dbHost,
  USER: dbUsername,
  PASSWORD: dbPassword,
  DB: db,
  dialect: dbDialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};