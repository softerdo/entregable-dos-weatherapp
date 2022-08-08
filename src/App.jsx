import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'
import LoadingData from './components/LoadingData'

function App() {
  
  const [coords, setCoord] = useState()
  

  useEffect(() => {

    const success = pos => {
      const latlon = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude
      }
      setCoord(latlon)
    }

    navigator.geolocation.getCurrentPosition(success)
  }, [])

  return (
    <div className="App">
        <Card lon={coords?.lon} lat={coords?.lat} />
    </div>
  )
}

export default App
