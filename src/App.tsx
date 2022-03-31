
import './App.css';
import { get15DaysWeatherByArea } from './server/api';
import {MySwiper} from './components/swiper'
import { MySwitchTransition, MyTransition } from './components/transition';
import { MyNewSwiper } from './components/transition/new-swiper';
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
     <div className='my-swiper-wrapper'>
        <MyNewSwiper />
     </div>
     <MyTransition/>
     <MySwitchTransition />
    </div>
  );
}

export default App;
