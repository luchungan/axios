import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore,{Autoplay,EffectCreative} from 'swiper'
import 'swiper/css'
import './style.css'
interface Bubble {
  name:string
  wording:string
  btnText:string
}
SwiperCore.use([Autoplay,EffectCreative])
const renderBubble = (bubble:Bubble) =>{
  const {name,wording,btnText} = bubble
  return <SwiperSlide key={name}>
    <p className='live-buttle'>
      <span className='live-bubble-username'>{name}</span>
      <span className='live-bubble-wording'>{wording}</span>
      <span className='live-bubble-action'>{btnText}</span>
    </p>
  </SwiperSlide>
}


export const MySwiper= () => {
  const dataList :Array<Bubble> = [
    { name: "李*", wording: "咨询了课程", btnText: "去咨询" },
    { name: "黄*", wording: "领取了优惠券", btnText: "去领取" },
    { name: "高*", wording: "分享了直播间给好友", btnText: "去分享" },
    { name: "刘*", wording: "领取了直播间资料", btnText: "去领取" },
    { name: "朱*", wording: "购买了直播间课程《xxx》", btnText: "去领取" }
  ];
  return (
    <Swiper
      autoplay = {{delay:3000,reverseDirection:true}}
      direction={'horizontal'}
      loop
      speed={3000}
      effect={'creative'}
      creativeEffect={
        {
          prev:{
            opacity:0,
            translate:['-100%',0,0]
          },
          next:{
            opacity:0
          }
        }
      }
      slidesPerView={1}
      onSlideChange={()=>console.log('slide change')}
      onSwiper={(swiper)=>console.log(swiper)}
    >
      {dataList.map((item:Bubble)=>renderBubble(item))}
    </Swiper>
  )
}