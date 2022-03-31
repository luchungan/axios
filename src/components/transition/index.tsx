import {    useState } from 'react'
import {Transition,CSSTransition,SwitchTransition }  from 'react-transition-group'

import type {TransitionStatus} from 'react-transition-group'
import './styles.scss'
import { Form,Button } from 'react-bootstrap'

interface TransitionStatusValues {
  opacity:number
}

const duration:number = 500;
const timeout: any ={
  appear: 500,
  enter: 300,
  exit: 500,
 }
const defaultStyle:any = {
  transition:`opacity ${duration}ms ease-in-out`,
  opacity:0
}
const transitionStyles : Record<TransitionStatus,TransitionStatusValues> = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 1 }
};

enum Modes {
  outIn = "out-in",
  inOut = "in-out"
}
const modes = [Modes.inOut, Modes.outIn];




export const MyTransition= ()=>{
  const [inProp,setInProp] = useState(false)
  return <div>
    <Transition in={inProp} timeout={timeout}>
    {(state:TransitionStatus)=>(
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        I.m a fade Transition!{state}
        
      </div>
    )}
  </Transition>
    <CSSTransition  in={inProp} timeout={timeout} classNames="my-fade">
    <p className='my-fade'>I.m a fade CssTransition!</p>
  </CSSTransition>
    <button onClick={() => setInProp(prev=>!prev)}>
        Click to Enter
      </button>
  </div>
  
  
}

export const MySwitchTransition = ()=>{
  const [mode,setMode] = useState(Modes.outIn)
  const [state,setState] = useState(true)
  return <div>
    <div className='label'>Mode:</div>
    <div className='modes'>
        {modes.map((m:string)=>(
          <Form.Check
            key={m}
            inline
            label={m}
            id={`mode=msContentScript${m}`}
            type="radio"
            name="mode"
            checked={mode === m}
            value={m}
            onChange={(e:any)=>{
              setMode(e.target.value)
            }}
          />
          
        ))}
    </div>
    <div className='main'>
            <SwitchTransition mode={mode}>
              <CSSTransition 
              key={String(state)}
              classNames="fade"
              addEndListener={(node,done)=>{
                node.addEventListener("transitionend",done,false)
              }}
              >
                <div className='button-container'>
                  <Button onClick={()=>setState(state=>!state)}>
                  {state ? `Hello, world!${mode}` : `Goodbye, world!${mode}`}
                  </Button>
                </div>
              </CSSTransition>

            </SwitchTransition>
    </div>
  </div>
}