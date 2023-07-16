const { Sequelize } = require("sequelize");
const { config } = require("../../config");

const { dbUser, dbPassword, dbName, dbHost } = config;

const CONNECTION_URI = `postgres://${dbUser}:${dbPassword}@${dbHost}:5432/${dbName}`;

const sequelize = new Sequelize(CONNECTION_URI, {
	logging: false, // set to console.log to see the raw SQL queries
	native: false, // lets Sequelize know we can use pg-native for ~30% more speed,
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false
		}
	}
});

module.exports = { sequelize };