
const mysql = require('mysql')
const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'password',
    database:'myPage'
})

module.exports = db

