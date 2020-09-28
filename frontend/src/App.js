import React,{useEffect} from 'react';
import './App.css';
import SignIn from './component/SignIn/SignIn';
import Landing from './component/landing/Landing';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';


function App() {
  useEffect(()=>{
    return(
      console.log("refresh")
    )
  })
  return (
    <Router>
      
    <div className="content">
      <img alt='img' className="img-fluid" src={require('./bus1.png')} />
    </div>
      <div className="header">
          <img className="img-fluid" alt="img" src={require('./travel.gif')}/>
          <h2>Suchitra Transportations<i>-Comfort is Assured!!</i></h2>
      </div>
    <Switch>
      <Route path='/' exact render={props =>  <SignIn {...props} />}/>
      <Route path='/landing' render={props=> {

      if(sessionStorage.getItem('token')){
        return(<Landing {...props}/>)
      }else{
          return( <Redirect path='/'/>)
      }
  }}/>
    </Switch>
       
   </Router>
      
  );
}

export default App;
