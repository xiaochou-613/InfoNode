
const db = require('../mySQL/index')
const express = require('express')
const router  = express.Router()

router.get('/getnavlist',(req,res)=>{
    const str = 'SELECT * FROM navlist'
    db.query(str,(err,data)=>{
        if(err){
            return res.send({status:404,msg:'获取导航列表失败'})
        }
        res.send({status:200,msg:'获取导航列表成功',data:data})
    })
})

module.exports = router