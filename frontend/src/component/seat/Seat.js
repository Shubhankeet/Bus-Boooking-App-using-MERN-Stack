import React,{useState,useEffect} from 'react';
import './seat.css';
import SeatLayout from '../seat-layout/SeatLayout'
const Seat = ({value:busDetails,onChild3}) => {
    const [busObj,setObj]=useState('')
    useEffect(()=>{
        const id=sessionStorage.getItem("bus-id")
        const {bus}=busDetails
        const selectedBus=bus.filter(select=>select._id===id)
        const [obj1]=selectedBus
        setObj(obj1)
    },[busDetails])
    const renderTable=(busObj)=>{
        return(
            <table>
                <tbody>
                <tr>
                    <td className="bLeft">Bus Type</td>
                    <td className="bRight">{busObj.busType}</td>
                </tr>
                <tr>
                    <td className="bLeft">From</td>
                    <td className="bRight">{busObj.from}</td>
                </tr>
                <tr>
                    <td className="bLeft">To</td>
                    <td className="bRight">{busObj.to}</td>
                </tr>
                <tr>
                    <td className="bLeft">Date</td>
                    <td className="bRight">{busObj.travelDate}</td>
                </tr>
                </tbody>
            </table>
        )
    }
    const renderSeatLayout=(busObj) => {
        if(Object.keys(busObj).length>0)
            return(<SeatLayout value={busObj} onChild4={e=>handlePayment(e)}/>)
    }
    const handlePayment=(e)=>{
        if(onChild3){
            onChild3(e)
        }
    }
    return (
        <div className="landing1">
            <div className="seat-view">
                {renderSeatLayout(busObj)}
            </div>
            <div className="summary">
                <h3>Booking Details</h3>
                {renderTable(busObj)}
            </div>

        </div>
    );
};

export default Seat;