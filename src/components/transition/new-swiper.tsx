
import { useEffect, useState } from 'react'
import 'swiper/css'
import '../swiper/style.css'
import { AtmosphereBubbleSequence } from './autosphere-bubble-sequence'
interface Bubble {
  name: string
  wording: string
  btnText: string
}
interface Props{
  bubble:Bubble
}

const BubbleComp = (props:Props) => {
  const {name,wording,btnText} = props.bubble
  return <p className='live-buttle'>
      <span className='live-bubble-username'>{name}</span>
      <span className='live-bubble-wording'>{wording}</span>
      <span className='live-bubble-action'>{btnText}</span>
    </p>
  
}



export const MyNewSwiper = () => {
  const [index, setIndex] = useState<number>(0)
  const dataList: Array<Bubble> = [
    { name: "李*", wording: "咨询了课程", btnText: "去咨询" },
    { name: "黄*", wording: "领取了优惠券", btnText: "去领取" },
    { name: "高*", wording: "分享了直播间给好友", btnText: "去分享" },
    { name: "刘*", wording: "领取了直播间资料", btnText: "去领取" },
    { name: "朱*", wording: "购买了直播间课程《xxx》", btnText: "去领取" }
  ];
  const [bubbleDataList, setBubbleDataList] = useState<Array<Bubble>>(dataList)
  useEffect(() => {
    const interval = setInterval(() => {
      setBubbleDataList((prev: Array<Bubble>) => [...prev, { name: "朱*", wording: "购买了直播间课程《xxx》", btnText: "去领取" }])

    }, 3000)

    return () => clearInterval(interval)
  }, [])

  if (!bubbleDataList.length) return null;
  const nextBubble = (newIndex: number) => {
    setIndex((prevIndex: number | null) => {
      return typeof prevIndex === "undefined" ? prevIndex + 1 : newIndex
    })
  }
  return (
    <div
      style={{
        background: "#000",
        height: "56px",
        display: "flex",
        alignItems: "center"
      }}
    >
      <AtmosphereBubbleSequence
        bubbleList={bubbleDataList.map((data:Bubble) => (
          <BubbleComp bubble={data} />
        ))}
        index={index}
        setCurIndex={setIndex}
        nextBubble={nextBubble}
        next={function (): void {
          throw new Error('Function not implemented.')
        }}
        resetList={function (): void {
          setBubbleDataList([])

        }} />
    </div>
  );
}
