const mongoose=require('mongoose')
const express=require('express')
const app=express.Router()
const newJob=require('../models/JobTitle')


app.get('/getJob',async(req,res)=>{
    try{
        const data=await newJob.find()
        res.json(data)
    }
    catch(error){
        res.json(error)
    }
})


app.post('/newJob',async(req,res)=>{
    const Job=req.body.Job
    try{
        const data=await newJob.findOne({"Job":Job})
        if(data){
            res.json({status:'failed',message:'Job already added'})
        }
        else{
            const data =await new newJob({
                Job:Job
            })
            await data.save()
            res.json({status:'ok',message:'Job added'})

        }
    }
    catch(error){
        res.json(error)
    }
   
})


module.exports=app