import React,{useState,useEffect} from 'react';
import jwt_decode from 'jwt-decode';
const RenderProfile = () => {
    const [user,setUser]=useState({})
    useEffect(()=>{
        const token=sessionStorage.getItem("token")
        const decoded=jwt_decode(token)
        setUser(decoded)
    },[])
    return (
        <div className='card'>
            <div className="card-header">
                <h2>Profile</h2>
            </div>
            <div className="card-body">
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><h5>Name:-{user.name}</h5></li>
                <li className="list-group-item"><h5>Email:-{user.email}</h5></li>
                <li className="list-group-item"><h5>Phone:-{user.phNumber}</h5></li>
                <li className="list-group-item"><h5>D.O.B:{user.dateOfBirth}</h5></li>
                <li className="list-group-item"><h5>Gender:{user.gender}</h5></li>
            </ul>
            </div>
            
        </div>
    );
};

export default RenderProfile;