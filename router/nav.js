
const db = require('../mySQL/index')
const express = require('express')
const router  = express.Router()

//获取导航列表
router.get('/getnavlist',(req,res)=>{
    
    const str = 'SELECT * FROM navlist'
    db.query(str,(err,data)=>{
        if(err){
            return res.send({status:404,msg:err})
        }
        res.send({status:200,msg:'获取导航列表成功',data:data})
    })
})

//添加导航
router.post('/addnav',(req,res)=>{
    const {  title,xtitle,tag,image, url } = req.body
    const str = `INSERT INTO navlist(title,xtitle,tag,image,url) VALUES('${title}','${xtitle}','${tag}','${image}','${url}')`
    db.query(str,(err,data)=>{
        if(err){
            return res.send({status:404,msg:'添加导航失败'})
        }
        res.send({status:200,msg:'添加导航成功'})
    })
})

//删除导航
router.post('/delnav', (req, res) => {
    const { title } = req.body;
    console.log(req.body); // { title: '1' }

    // 使用参数化查询防止 SQL 注入
    const str = 'DELETE FROM navlist WHERE title = ?';
    db.query(str, [title], (err, data) => {
        if(err){
            return res.send({status:404,msg:'添加导航失败'})
        }
        res.send({status:200,msg:'添加导航成功'})
    })
});

module.exports = router