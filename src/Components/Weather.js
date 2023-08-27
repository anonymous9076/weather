import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css';
import { FaStreetView } from 'react-icons/fa'

function Weather() {
  const [input, setInput] = useState();
  const [weather, setWeather] = useState();
  const [temp, setTemp] = useState();
  const [area, setArea] = useState();
  const [error,setError]=useState()

  //first way fetch() and async/await

  //   useEffect(() => {
  //     const fun = async () => {
  //       let url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=17861168c35b5da52ca956150a317416&units=metric`;
  //         let responce = await fetch(url)
  //         resJson = await responce.json();
  //         setTemp(resJson.main);
  //         setArea(resJson.coord)
  //         if(resJson.weather){
  //         setWeather(resJson.weather[0])
  //       }}
  //     fun();
  // }, [input])

  
  //2nd way using axios .then() .catch()

  useEffect(() => {
    const asynchronize = () => {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=17861168c35b5da52ca956150a317416&units=metric`;
      axios.get(url)
        .then((res) => {
          setError(null)
          setTemp(res.data.main)
          setArea(res.data.coord)
          if (res.data.weather) {
            setWeather(res.data.weather[0])
          }
        }
        )
        .catch((err) => {
          setError(err)
        })

    }
    asynchronize();
  }, [input])


  return (
    <div className='body'>
      <div className='container'>

        <div className='search'>
          <input id='input' type='search' onChange={(e) => setInput(e.target.value)} placeholder='enter location'  ></input>
        </div>
        {!temp ? (
          <p style={{ textAlign: 'center' }}>NO CITY FOUND</p>)
          : (<>
            {!error ?
              <div id='msg' className='location neon'>
                <img className='icons' src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt='...' ></img>
                <h3>tempreature : {temp.temp} °Cel</h3>
                <h1 ><FaStreetView /> {input.toUpperCase()}</h1>
                <h4>Co-ordinates :</h4>
                <p>lat : {area.lat}° <br></br>lon : {area.lon}°</p>
              </div>
              : 
                <p style={{ textAlign: 'center' }}>NO CITY FOUND</p>
              }
          </>)
        }
      </div>

    </div>
  )
}

export default Weather