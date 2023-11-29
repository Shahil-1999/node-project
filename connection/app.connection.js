const mysql = require('mysql')
require('dotenv').config()


const connection = mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})


connection.connect(function (error) {
    if (error) {
        throw error
    } else {
        console.log("Database Connected Sucessfully");
    }

})

module.exports = connection