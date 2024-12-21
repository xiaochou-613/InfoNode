
const db = require('../mySQL/index')
const moment = require('moment')
const express = require('express')
const router  = express.Router()

/**
 *  关于计划的所有api
 *  
 *  -- 提高等级 可做可不做
 * delete 传输的数据要用  -  { data:{..} }
 */


//获取所有计划
router.get('/allPlan',(req,res)=>{
    const str = `SELECT * FROM plan`
    db.query(str,(err,data)=>{
        if(err){
            return res.send({status:404,msg:'数据库查询失败'})
        }
        res.send({status:200,msg:'数据库查询成功',data:data})
    })
})

//获取所有已完成的计划   -- 冗余、可舍弃
router.get('/donePlan',(req,res)=>{
    const str = `SELECT * FROM plan WHERE isDone = 1`
    db.query(str,(err,data)=>{
        if(err){
            return res.send({status:404,msg:'数据库查询失败'})
        }
        res.send({status:200,msg:'数据库查询成功',data:data})
    })
})

//添加计划
router.post('/addPlan',(req,res)=>{
    const content = req.body.content
    const time = moment().format('YYYY-MM-DD HH:mm:ss')
    const str = `INSERT INTO plan(content,level,isDone,startTime) 
    VALUES(?,'中',0,?)` 

    db.query(str,[content,time],(err,data)=>{
        if(err || data.affectedRows !== 1)
        //等于1 表示改动了
            return res.send({status:404,msg:'数据库添加失败'})

        //成功
        res.send({status:200,msg:'数据库添加成功'})
    })
})

//删除计划
router.delete('/deletePlan',(req,res)=>{
  const str = `DELETE FROM plan WHERE planId = ?`
  db.query(str,req.body.planId,(err,data)=>{
      if(err || data.affectedRows !== 1)
          return res.send({status:404,msg:'数据删除失败'})

      //成功
      res.send({status:200,msg:'数据删除成功'})
  })
})

//更新计划（用于是否完成）
router.post('/updatePlan',(req,res)=>{
    let time = null
    if(req.body.isDone === 1)
        time = moment().format('YYYY-MM-DD HH:mm:ss')

  const str = `UPDATE plan SET endTime = ?,isDone = ? WHERE planId = ?`
  db.query(str,[time,req.body.isDone,req.body.planId
  ],(err,data)=>
  {
      if(err || data.affectedRows !== 1)
          return res.send({status:404,msg:'数据更新失败'})

      //成功
      res.send({status:200,msg:'数据更新成功'})
  })
})

//更新计划（用于提高等级）
router.post('/updatePlanLevel',(req,res)=>{

  const str = `UPDATE plan SET level = ? WHERE planId = ?`
  db.query(str,[req.body.level,req.body.planId
  ],(err,data)=>
  {
      if(err || data.affectedRows !== 1)
          return res.send({status:404,msg:'数据更新失败'})

      //成功
      res.send({status:200,msg:'数据更新成功'})
  })
})


module.exports = router