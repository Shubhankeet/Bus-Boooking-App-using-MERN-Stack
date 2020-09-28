const mongoose=require('mongoose')

const PayInfoSchema=new mongoose.Schema({
        cardType:{type:String,enum: ["visa", "master card"]},
        number:{type:String},
        name:{type:String},
        cvv:{type:Number},
        month:{type:Number},
        year:{type:String},
})

module.exports=mongoose.model('PaymentInfo',PayInfoSchema)