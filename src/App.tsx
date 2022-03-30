import React ,{useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import request from './server';
import { get15DaysWeatherByArea } from './server/api';
function App() {
  
  function handleClick(){
    
      get15DaysWeatherByArea({
        version: 'v9',
        appid: 23035354,
        appsecret: '8YvlPNrz'
      }).then(res=>console.log(res))
      
    
   
  }
  return (
    <div className="App">
     <button onClick={handleClick}>btn</button>
    </div>
  );
}

export default App;
