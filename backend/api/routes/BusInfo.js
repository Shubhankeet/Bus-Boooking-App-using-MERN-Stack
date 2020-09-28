const BusSchema=require('../../models/BusInfo')

module.exports=function(router){

//GET

    router.get('/busInfo',(req,res)=>{
        BusSchema.find({}, (err, bus) => {
            if(err){
                res.json({status:false,message:err})
            }else{
                if(!bus){
                    res.json({status:false,message:"Sry, Bus Info is not present in Database"})
                }
                else{
                    res.json({status:true,bus:bus})
                }
            }
        })
    })

//POST

    router.post('/busInfo',(req,res)=>{
        let dateObj=new Date(req.body.travelDate)
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        let note = req.body
        console.log(req.body)
        note.travelDate = day+ "-" + month + "-" + year;
        BusSchema.find({from:note.from,to:note.to,travelDate:note.travelDate},(err,bus)=>{
            if(err){
                res.json({status:false,message:err})
            }else{
                if(!bus){
                    res.json({status:false,message:"Sry, No such Bus info found in Database"})
                }
                else{
                    res.json({status:true,bus:bus})
                }
            }
        })
    })

    //Input new Bus Details

    router.post('/newBusInfo',(req,res)=>{
        let note=new BusSchema(req.body)
        dateObj=new Date(req.body.travelDate)
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        note.travelDate = day+ "-" + month + "-" + year;
        note.save((err)=>{
            
            if(err){
                return(res.status(400).json(err))
            }
            res.status(200).json(note)
        })
    })

//PUT

    router.put('/updateBusInfo',(req,res)=>{
        if(!req.body._id){
            res.json({status:false,message:"Invalid Bus-id"})
        }else{
            BusSchema.findOne({_id:req.body._id},(err,bus)=>{
                if(err){
                    res.json({status:false,message:"Invalid Bus-id"})
                }
                else{
                    let dateObj=new Date(req.body.travelDate)
                    let month = dateObj.getUTCMonth() + 1;
                    let day = dateObj.getUTCDate();
                    let year = dateObj.getUTCFullYear();
                    bus.travelDate = day+ "-" + month + "-" + year;
                    bus.busType=req.body.busType;
                    bus.depature=req.body.depature;
                    bus.arrival=req.body.arrival;
                    bus.seatsAvailable=req.body.seatsAvailable;
                    bus.fare=req.body.fare;
                    bus.serviceTax=req.body.serviceTax;
                    bus.from=req.body.from;
                    bus.to=req.body.to;
                    bus.save((err)=>{
                        if(err){
                            res.json({status:false,message:err})
                        }else{
                            res.json({status:true,message:"Bus Information successfuly updated!!"})
                        }
                    })
                }
            })
        }
    })

//PUT

router.put('/updateBookedSeats',(req,res)=>{
    console.log(req.body)
    if(!req.body._id){
        res.json({status:false,message:"Not a valid Bus id"})
    }else{
        BusSchema.findOne({_id:req.body._id},(err,bus)=>{
            if(err){
                res.json({status:false,message:"Not a valid Bus id"})
            }
            else{
                bus.bookedSeats=bus.bookedSeats.concat(req.body.bookedSeats);
                bus.save((err)=>{
                    if(err){
                        res.json({status:false,message:err})
                    }else{
                        res.json({status:true,message:"Bus Details updated"})
                    }
                })
            }
        })
    }
})

//DELETE

    router.delete("/deleteBusInfo/:id",(req,res)=>{
        if(!req.params.id){
            res.json({status:false,message:"Bus id is required"})
        }else{
            BusSchema.findOne({_id:req.params.id},(err,bus)=>{
                if(err){res.json({status:false,message:"Invalid bus id"})}
                else{
                    bus.delete(err=>{
                        if(err){res.json({status:false,message:err})}
                        else{
                            res.json({status:true,message:"Bus Info is Deleted"})
                        }
                    })
                    
                }
            })
        }
    })

}