import { useState, useRef, useEffect } from 'react'

function App() {
  const[text, setText] = useState('')
  const[isThala, setIsThala] = useState(false)
  const audioRef = useRef(null)
  let [t, setT] = useState('')


  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    stopMusic()
    setT(text)
    setIsThala(checkForThala(text))
    if (isThala) {
      playMusic()
    }
  }

  const checkForThala = (text) => {
    return text.toLowerCase().includes('dhoni') || text.toLowerCase().includes('adeesh') || text.toLowerCase().includes('thala')  ||text.length === 7 || (text.match(/^[0-9]+$/) && addTillOne(text) === 7);
  }

  const addTillOne = (text) => {
    //Convert string to number
    let num = parseInt(text)
    while(num > 10){
      num = num.toString().split('').reduce((a,b) => parseInt(a) + parseInt(b))
    }
    return num
  }

  const playMusic = () => {
    audioRef.current.currentTime = 0 // Restart the song from the beginning
    audioRef.current.play()
  }

  const stopMusic = () => {
    audioRef.current.pause()
    audioRef.current.currentTime = 0 // Reset the song to the beginning
  }

  useEffect(() => {
    if (isThala) {
      playMusic()
    } else {
      stopMusic()
    }
  }, [isThala])
  
  return (
    <div className='h-screen bg-[#ffe69e] flex justify-center items-center'>
      <div className="bg-white p-8 rounded-xl shadow-lg">
      <h1 className="text-4xl font-bold text-orange-500 mb-4 text-center">THALA FOR A REASON</h1>
      <br />

      <form className='flex justify-around w-[430px]'>
        <input type="text" className="w-[350px] border-2 border-gray-300 p-2 rounded-lg outline-none" 
        onChange={(e) => handleTextChange(e)}/>
        <button className="bg-blue-500 text-white p-2 rounded-lg " onClick={(e) => handleSubmit(e)}type='submit'>Submit</button>
      </form>
      <audio ref={audioRef} src="./../thala-song.mp3" />
      {isThala &&  t.length !== 0 ?
      <div className='text-center text-2xl mt-5'>
        {t} is Thala for a reason
      </div>
      :
      <></>
      }
      </div>
    </div>
  )
}

export default App
