import React,{useState} from 'react';
import getPayment from '../../api/api';
import './Payment.css'

const Payment = (props) => {
    const[details,setDetails]=useState({
        cardType:'',
        number:'',
        name:'',
        cvv:'',
        month:'',
        year:'',
    })
    const [number , setNumber] = useState('')
    const [name , setName] = useState('')
    const [cvv , setCvv] = useState('')
    const [month , setMonth] = useState('')
    const [year , setYear] = useState('')
    const [setResponse] =useState('')

    const handleCard=(e)=>{
        const {value}=e.target
        setDetails(prevState=>({
            ...prevState,
            cardType:value
        }))
    }
    const handleNumber=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return(setNumber("Card Number is Required"))
        }
        if(value){
            let regExp=/^([0-9]{16})$/
            if(!(regExp.test(value))){
                return(setNumber("Card Number should be of 16 digits"))
            }
            else{
                const value=e.target.value
                setDetails(prevState=>({
                    ...prevState,
                    number:value
                }))
                console.log(details.number)
                return(setNumber(""))
                
            }
        }
    }
    const handleName=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return(setName(" Name is Required"))
        }else{
            setDetails(prevState=>({
                ...prevState,
                name:value
            }))
            return(setName(""))
        }
    }
    const handleCVV=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return(setCvv("CVV is Required"))
        }
        if(value){
            let regExp=/^([0-9]{3})$/
            if(!(regExp.test(value))){
                return(setCvv("Invalid CVV"))
            }
            else{
                const value=e.target.value
                setDetails(prevState=>({
                    ...prevState,
                    cvv:value
                }))
                return(setCvv(""))
                
            }
        }
    }
    const handleMonth=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return(setMonth("Month is Required"))
        }
        if(value){
            let regExp=/^01|02|03|04|05|06|07|08|09|10|11|12$/
            if(!(regExp.test(value))){
                return(setMonth("Month should be between 01-12"))
            }
            else{
                const value=e.target.value
                setDetails(prevState=>({
                    ...prevState,
                    month:value
                }))
                return(setMonth(""))
                
            }    
        }
    }
    const handleYear=(e)=>{
        e.preventDefault()
        let value=e.target.value
        if(!value){
            return(setYear("Year is Required"))
        }
        if(value){
            let regExp=/^(20[2-9]\d|2080)$/
            if(!regExp.test(value)){
                return(setYear("Year should be between 2020 - 2080"))
            }
            else{
                const value=e.target.value
                setDetails(prevState=>({
                    ...prevState,
                    year:value
                }))
                return(setYear(""))
            }
        }
    }

    const handleSubmit=async (e)=>{
        let {onChild5}=props
        if(onChild5){
            let e={n:4}
            onChild5(e)
        }
        e.preventDefault()
        try{
            let response=await getPayment.post('/api/newPaymentInfo',{
                cardType:details.cardType,
                number:details.number,
                name:details.name,
                cvv:details.cvv,
                month:details.month,
                year: details.year,
            })
            if(response.status===200){
                setDetails(prevState=>({
                    ...prevState,
                    cardType:'',
                    number:'',
                    name:'',
                    cvv:'',
                    month:'',
                    year:''
                }))
                setResponse(response.data.message)
                console.log(response)
            }
            
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <br/>
            <div classname="amount">
                <h5>Total Payable Amount: Rs. 650</h5>
                <h5>Transaction ID: 2435677861</h5>
            </div>

            <form onSubmit={e=>handleSubmit(e)}> 
                <div className="container">
                    <div className="row credit">
                        <div className="col-4"><h5>Card Type : </h5></div>
                        <div className="col-6">
                            <input type="radio" name="card" value= {"visa"} onClick={e=>handleCard(e)}/>&nbsp;<b>Visa</b>  &nbsp;
                            <input type="radio" name="card" value={"master card"} onClick={e=>handleCard(e)}/>&nbsp;<b>Master Card</b>  &nbsp;
                        </div>
                    </div>
                    <br/>
                    <div className = "row">
                        <div className = "col-4"><label htmlFor="number"><h5>Card Number :</h5></label> </div>
                        <div className = "col-6">
                            <input type="number"  name="number" onBlur={e=>{handleNumber(e)}}  />
                            <div style={{color: "red"}}>{number}</div>
                        </div>
                    </div>
                    <br/>
                    <div className = "row">
                        <div className = "col-4"><label htmlFor="name"><h5>Name On Card :</h5></label> </div>
                        <div className = "col-6">
                            <input type="text"  name="name" onBlur={e=>{handleName(e)}}  />
                        <div style={{color: "red"}}>{name}</div>
                        </div>
                    </div>
                    <br/>
                    <div className = "row">
                        <div className = "col-4"><label htmlFor="cvv"><h5>CVV :</h5></label> </div>
                        <div className = "col-6">
                            <input type="number"  name="cvv" onBlur={e=>{handleCVV(e)}}  />
                            <div style={{color: "red"}}>{cvv}</div>
                        </div>
                    </div>
                    <br/>
                    <div className = "row">
                        <div className = "col-4"><label htmlFor="date"><h5>Expiry Date :</h5></label> </div>
                        <div className = "col-3">
                            <input type="number"  name="date" onBlur={e=>{handleMonth(e)}}  />
                            <div style={{color: "red"}}>{month}</div>
                        </div>
                        <div className = "col-3">
                            <input type="number"  name="date" onBlur={e=>{handleYear(e)}}  />
                            <div style={{color: "red"}}>{year}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4"></div>
                        <div className="col-4">
                        <button className="btn btn-primary" type="submit"onClick={e=>handleSubmit(e)}>Pay Now</button> &nbsp;&nbsp;&nbsp;&nbsp;
                        <button className="btn btn-danger" type="submit" onClick={() => window.location.reload(false)}>Cancel</button>
                        </div>
                        <div className="col-4"></div>
                    </div>
                    

                    
                </div>

            </form>
        </div>
    );
};

export default Payment;