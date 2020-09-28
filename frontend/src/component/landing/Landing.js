import React,{useState} from 'react';
import './landing.css';
import Planning from '../planning/Planning';
import Payment from '../payment/Payment';
import Confirmation from '../confirmation/Confirmation';
import Seat from '../seat/Seat';
import Profile from '../profile/Profile';


const Landing = ({history}) => {
    const [tab, setTab] = useState(1)
    const [busDetails, seatDetails] = useState({})
    const renderBus=(tab)=>{
        switch(tab){
            case 1:return(<div><Planning onChild1={e=>handleTab(e)}/></div>);
            case 2:return(<div><Seat value={busDetails} onChild3={e=>handleTab2(e)} /></div>);
            case 3:return(<div><Payment onChild5={e=>handleTab3(e)}/></div>);
            case 4:return(<div><Confirmation /></div>);
            default:return null;
        }
    }
    const handleTab = (e)=>{
        let {busData,n}=e
        seatDetails(busData)
        return(setTab(n))
    }
    const handleTab2 = (e)=>{
        let {n}=e
        return(setTab(n))
    }
    const handleTab3 = (e)=>{
        let {n}=e
        return(setTab(n))
    }
    const changeTab = (e, tabId) => {
        e.preventDefault(e)
        setTab(tabId)
        console.log(tab)
    }
    const handleLogout = (e)=>{
        sessionStorage.removeItem("token")
        history.push("/")
    }
    return (
        <div>
            <div className="nav-land">
            <button className="btn btn-primary" onClick={e=>handleLogout(e)}>Logout</button>
            <Profile/>
            </div>
            <div className="landing">
            <ul className="nav nav-pills nav-fill">
                <li className="nav-item">
                    <a className={`nav-link ${tab === 1 ? 'active' : 'isDisabled'}`} onClick={e => changeTab(e, 1)} href="/landing">1.Plan Your Journey</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${tab === 2 ? 'active' : 'isDisabled'}`} onClick={e => changeTab(e, 2)} href='/landing'>2.Select Your Seats</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${tab === 3 ? 'active' : 'isDisabled'}`} onClick={e => changeTab(e, 3)} href="/landing">3.Payment</a>
                </li>
                <li className="nav-item">
                    <a className={`nav-link ${tab === 4 ? 'active' : 'isDisabled'}`} onClick={e => changeTab(e, 4)} href="/landing">4.Booking Confirmation</a>
                </li>
            </ul>
            {renderBus(tab)}
            </div>
        </div>
        
    );
};

export default Landing;