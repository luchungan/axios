
import './App.css';
import { get15DaysWeatherByArea } from './server/api';
import {MySwiper} from './components/swiper'
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
     <div className='my-swiper-wrapper'>
        <MySwiper />
     </div>
     
    </div>
  );
}

export default App;
