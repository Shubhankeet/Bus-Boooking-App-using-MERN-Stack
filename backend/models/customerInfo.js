const mongoose=require('mongoose')

const customerSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String},
    phNumber:{type:String},
    password:{type:String},
    dateOfBirth:{type:String},
    gender:{type:String,enum: ["male", "female"]}

})
module.exports=mongoose.model('customerInfo',customerSchema)