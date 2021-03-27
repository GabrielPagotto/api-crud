const dotenv = require('dotenv');

dotenv.config();

const { DATABASE_DIALECT, DATABASE_HOST, DATABASE_PORT, DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } = process.env;

module.exports = {
    dialect: DATABASE_DIALECT,
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    define: {
        timestamps: true,
        underscored: true
    }
};
