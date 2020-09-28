const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const app=express()
const mongoose=require('mongoose')
const port=process.env.PORT || 8081
const morgan=require('morgan')
const api=require('./api') 

app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use('/api',api)
app.use(morgan('dev'))
app.use(function(req,res){
    const err=new Error("not found")
    err.status=404
    res.json(err)
})

const monogUrl='mongodb://localhost:27017/BusBookingCollection'
mongoose.connect(monogUrl,{useNewUrlParser:true})

const db=mongoose.connection

db.on('error',console.error.bind(console,"connection error:"));
db.once('open',function(){
    console.log("Successfuly Connected to MONGODB")
    app.listen(port,()=>{
        console.log(`Server is now active on ${port}`)
    })
})