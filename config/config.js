require('dotenv').config();

const development = {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
};

const production = {
    username: process.env.DB_USER_NAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
};

module.exports = { development, production };