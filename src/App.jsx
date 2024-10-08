import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numAllowed, setNumAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(numAllowed) str += "0123456789"
    if(charAllowed) str += "!@#$%^&*()_+{}[];':,.<>/?"

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass+=str.charAt(char)
    }

    setPassword(pass)

  }, [length, numAllowed, charAllowed, setPassword])

  useEffect(()=>{
    passwordGenerator()
  }, [length, charAllowed, numAllowed, setPassword])

  const copiedToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password)
  }, [password])


  return (
    <>
      <div className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
        {/* Heading */}
        <h1 className='text-white text-center my-3'>Password Generator</h1>

        {/* //Password Field */}
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" 
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            readOnly
            ref={passwordRef}
          />
          <button onClick={copiedToClipBoard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>Copy</button>
        </div>

        {/* Control */}
        <div className='flex text-sm gap-x-2'>
          {/* Range Selector */}
          <div className='flex item-center gap-x-1'>
            <input type="range"
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>

          {/* Number Allowed */}
          <div className='flex item-center gap-x-1'>
            <input type="checkbox" 
              defaultChecked={numAllowed}
              id = "numberInput"
              onChange={()=>{
                setNumAllowed((prev)=>!prev)
              }}
            />
            <label>Number</label>
          </div>

          {/* Character Allowed */}
          <div className='flex item-center gap-x-1'>
            <input type="checkbox" 
              defaultChecked={charAllowed}
              id = "charInput"
              onChange={()=>{
                setCharAllowed((prev)=>!prev)
              }}
            />
            <label>Special Character</label>
          </div>

        </div>

      </div>
    </>
  )
}

export default App
