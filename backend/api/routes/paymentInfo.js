const paymentInfo=require('../../models/paymentInfo')

module.exports=function(router){

    router.post('/newPaymentInfo',function(req,res){
        let note=new paymentInfo(req.body)
        note.save((err)=>{
            
            if(err){
                return(res.status(400).json(err))
            }
            res.status(200).json(note)
        })
    })
            
}