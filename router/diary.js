const db = require('../mySQL/index')
const moment = require('moment')
const express = require('express')
const router  = express.Router()

router.get('/getAllDiary',(req,res)=>{
    const str = 'SELECT * FROM diaryList'
    db.query(str,(err,data)=>{
        if(err){
            return res.send({status:404,msg:'获取日记本失败'})
        }
        res.send({status:200,msg:'获取日记本成功',data:data})
    })
})

router.post('/addDiary',(req,res)=>{
    const date = moment().format('YYYY-MM-DD')
    const content = req.body.content
    const weather = req.body.weather
    const str = `INSERT INTO diaryList(date,content,weather) 
    VALUES(?,?,?)` 
    db.query(str, [date, content, weather], (err, data) => {
        if (err) {
            return res.send({ status: 404, msg: err.message });
        }
        else if (data.affectedRows !== 1) {
            return res.send({ status: 404, msg: '数据更新失败' });
        }
        // 成功
        res.send({ status: 200, msg: '数据更新成功' });
})
})

module.exports = router