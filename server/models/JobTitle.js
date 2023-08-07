const mongoose=require('mongoose')

const JT=mongoose.Schema({
    Job:String
})


module.exports=new mongoose.model("Job",JT)