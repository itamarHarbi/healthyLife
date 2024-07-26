import React, { useRef } from 'react'
import Child from './child'

export default function Parent() {
    const inputRef = useRef();
    console.log(inputRef); 
  return (
   <Child ref={inputRef}/>
  )
}
