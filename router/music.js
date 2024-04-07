

const db = require('../mySQL/index')
const fs = require('fs')
const path = require('path')
const express = require('express')
const router  = express.Router()

//获取信息信息
router.get('/getmusicInfo',(req,res)=>{
    const str = `SELECT * FROM musiclist`
    db.query(str,(err,data)=>{
        if(err){
            return res.send({status:404,msg:'数据库查询失败'})
        }
        res.send({status:200,msg:'数据库查询成功',data:data})
    })
})

//获取歌词
router.get('/getlyric',(req,res)=>{
    let name
    if(req.query.id === '1') name = '暗号'
    else if(req.query.id === '2') name = '七里香'
    fs.readFile(path.join(__dirname,'../data/lyric/'+name+'.lrc'),'utf-8',(err,data)=>{
        if(err){
            return res.send({status:404,msg:'获取歌曲失败'})
        }
        res.send({status:200,msg:'获取歌词成功',data:data})
    })
})

//获取歌词位置 --   冗余了。。 
// router.get('/getlyricPosition',(req,res)=>{
//     const id = req.query.id
//     const str = `SELECT audio FROM musiclist WHERE id = ?`
//     db.query(str,id,(err,data)=>{
//         if(err){
//             return res.send({status:404,msg:'获取歌词位置失败'})
//         }
//         res.send({status:200,msg:'获取歌词位置成功',data:data})
//     })
// })


module.exports = router