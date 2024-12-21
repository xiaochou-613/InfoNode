
const mysql = require('mysql2')
const db = mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'xiaochou123',
    database:'myPage'
})

db.connect((err)=>{
    if(err) throw err
    console.log('mysql is connected')
})

module.exports = db

