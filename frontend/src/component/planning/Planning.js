import React,{useState} from 'react';
import './planning.css';
import getBus from '../../api/api';
import BusTable from '../table/Table'

const Planning = (props) => {
    const [plan,setPlan]=useState('')
    const [busData,setBusData]=useState({})
    const handleFrom=(e,field)=>{
        e.preventDefault()
        let value=e.target.value
        setPlan({...plan,[field]:value.toLowerCase()})
        console.log(plan.date)
    }
    const handlePlan=async (e)=>{
        e.preventDefault()
        try{
            let response=await getBus.post('/api/busInfo',{
                from:plan.from, to:plan.to, travelDate: plan.date,
    
            })
            if(response.data.status===true){
               return( setBusData(response.data))

            }
        }
        catch(err){console.log(err)}
    } 
    const renderBus=(busData)=>{
            if(Object.keys(busData).length>0)
                return(<BusTable value={busData} onChild2={e=>handleSeat(e)}/>)
    }
    const handleSeat=(e)=>{
        let {onChild1}=props
        if(onChild1){
            let e={busData,n:2}
            onChild1(e)
        }
    }
    return (
        <div>
        <div className="planning">
            <div> 
            <label htmlFor="exampleFormControlSelect1">From</label>
            <select className="form-control" id="exampleFormControlSelect1" onClick={e=>handleFrom(e,"from")}>
                <option>Bhubaneswar</option>
                <option>Balasore</option>
                <option>Bhadrak</option>
                <option>Cuttack</option>
                <option>Talcher</option>
            </select>
            </div>
            <div>
            <label htmlFor="exampleFormControlSelect1">To</label>
            <select className="form-control"  id="exampleFormControlSelect1" onClick={e=>handleFrom(e,"to")}>
                <option>Bhubaneswar</option>
                <option>Balasore</option>
                <option>Bhadrak</option>
                <option>Cuttack</option>
                <option>Talcher</option>
            </select>
            </div>
            <div>
                <label htmlFor="doj">Travel Date</label>
                <div><input type="date" id="doj" name="doj" onChange={e=>handleFrom(e,"date")}/></div>
            </div>
            <div>
                <button className="btn btn-primary" onClick={e=>handlePlan(e)}>Plan Your Journey</button>
            </div>
            {}
        </div>
            {renderBus(busData)}
        </div>
    );
};

export default Planning;