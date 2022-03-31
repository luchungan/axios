import { useCallback, useEffect } from "react";
import { SwitchTransition,CSSTransition } from "react-transition-group";
import './styles.scss'

interface BubbleProps {
  bubbleList:Array<any>
  index:number,
  setCurIndex:(n:number)=>void,
  nextBubble:(n:number)=>void,
  next:()=>void,
  resetList:()=>void
}

export const AtmosphereBubbleSequence = (props:BubbleProps)=>{
  const {bubbleList,index,setCurIndex,nextBubble,next,resetList} = props;
  const bubbleListLength:number = bubbleList.length;
  let currentIndex:number = 0
  if(index > -1 && index < bubbleListLength){
    currentIndex = index
  }else{
    currentIndex = bubbleListLength -1;
    setCurIndex(currentIndex)
  }

  useEffect(()=>{
    const interval = setInterval(()=>{
      nextBubble(index+1)
    },3000)
    return ()=>{
      clearInterval(interval)
    }
  },[index])

  const onExited = useCallback(
    (node:HTMLElement)=>{
      if(+node.dataset.bubbleKey! === bubbleListLength -1){ // 最后一个气泡
        // 切换到兜底组件
        next();
        // 清空气泡列表
        resetList()
      }
    },
    [bubbleListLength,next,resetList]
  )

  return (
    <SwitchTransition mode ={'out-in'}>
      <CSSTransition
        key={bubbleList[index]?.type?.name + index || Math.random()}
        timeout={{
          enter:300,
          exit:300
        }}
        classNames="atmosphere-bubble-cnt"
        unmountOnExit
        onExited={
          onExited
        }
      >
        <div data-bubble-key={index} className = "atmosphere-bubble-cnt">
          {bubbleList[index]}
        </div>
      </CSSTransition>
    </SwitchTransition>
  )

}