
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

//修改用户信息
router.post('/updatePersonInfo',async (req,res)=>{
    const id = req.body.userId
    const name = req.body.name
    const image = req.body.image
    try {
        //将image转换成blob存入数据库
        const buffer = Buffer.from(image, 'base64');
        // 更新数据库
        const str = `UPDATE personInfo SET name = ?, image = ? WHERE userId = ?`;
        db.query(str, [name, buffer, id], (err, data) => {
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

module.exports = router

// 解码 base64 数据并压缩
const compressBase64 = async (base64Data) => {
    return new Promise((resolve, reject) => {
      // 将 base64 数据解码为二进制数据
      const binaryData = Buffer.from(base64Data, 'base64');

  
      // 压缩数据
      zlib.deflate(binaryData, (err, compressedData) => {
        if (err) {
          console.error('压缩数据出错：', err);
          reject(err);
          return;
        }
  
        // 压缩后的二进制数据
        resolve(compressedData);
      });
    });
  };

  function base64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }