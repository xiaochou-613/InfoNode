
const db = require('../mySQL/index')
const express = require('express');
const router  = express.Router()
const zlib = require('zlib');

//获取个人信息
router.get('/getpersonInfo',(req,res)=>{
    const str = `SELECT * FROM personinfo`
    db.query(str,(err,data)=>{
        if(err){
            return res.send({status:404,msg:'获取导航列表失败'})
        }
        // 将 Buffer 转换为 Base64 字符串
        const base64String = data[0].image.toString('base64').slice(20);

        data[0].image = `data:image/jpg;base64,${base64String}`

        res.send({status:200,msg:'获取导航列表成功',data:data})
    })
})

//修改用户头像
router.post('/updatePersonImage',async (req,res)=>{
    const id = req.body.userId
    const image = req.body.image
    try {
        //将image转换成blob存入数据库
        const buffer = Buffer.from(image, 'base64');

        // 更新数据库
        const str2 = `UPDATE personInfo SET image = ? WHERE userId = ?`;
        db.query(str2, [buffer, id], (err, data) => {
          if (err) {
            return res.send({ status: 404, msg: err.message });
          }
          else if (data.affectedRows !== 1) {
            return res.send({ status: 404, msg: '数据更新失败' });
          }
          // 成功
          res.send({ status: 200, msg: '数据更新成功' });
        });
      } catch (error) {
        res.send({ status: 500, msg: '压缩图片数据出错' });
      }
});

//修改用户名称
router.post('/updatePersonName',(req,res)=>{
    const id = req.body.userId
    const name = req.body.name
    const str = `UPDATE personInfo SET name = ? WHERE userId = ?`;
    db.query(str, [name, id], (err, data) => {
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