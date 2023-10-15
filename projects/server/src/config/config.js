require('dotenv').config()

module.exports = {
 development: {
		username: process.env.USERNAME_DATABASE,
		password: process.env.PASSWORD_DATABASE,
		database: process.env.NAME_DATABASE,
		host: "127.0.0.1",
		dialect: "mysql",
	},
	test: {
		username: process.env.USERNAME_DATABASE,
		password: process.env.PASSWORD_DATABASE,
		database: process.env.NAME_DATABASE,
		host: "127.0.0.1",
		dialect: "mysql",
	},
	production: {
		username: "jcwd010803",
		password: "jcwd010803",
		database: "jcwd010803",
		host: "adminer2.purwadhikabootcamp.com",
		dialect: "mysql",
	},
}
