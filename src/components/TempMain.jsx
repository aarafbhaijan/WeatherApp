import React, { useState ,useEffect} from 'react';
import './css/style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRegular,faCloudSun,faStreetView} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';


const TempMain = () => {
    
    const [city,setCity]=useState(null);
    const [city2,setCity2]=useState({});

   
   

    const [search,setSearch]=useState('Mumbra');
    const api_Key='18734b0f9e85affe3a1d01585377aea9'
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${api_Key}`
    useEffect(()=>{
            
            const fetchApi=async ()=>{
                const response=await fetch(url);
                const resJson=await response.json()
                console.log(resJson);
                setCity(resJson.main)
                
                
                    // // use this(up) or this(down)
                // axios.get(url).then((res)=>{
                //     setCity(res.data.main);
                // }).catch((err)=>{
                //     setError(err)
                // })

                }
            
            fetchApi()

            },[search])



    useEffect(()=>{
        const fetch2Api=async ()=>{
            
            const res=await fetch(url);
            const resJson=await res.json();
            console.log(resJson.sys);
            setCity2(resJson.sys)
            // catch{
            //     console.log('Sorry No data Found!');
            // }
        }
        fetch2Api()
    },[search])
    
// const sunsetDate=new Date((city2.sunset)*1000)
const isError=!city || !city2 ;

const sunSet=new Intl.DateTimeFormat('en-us',{
    dateStyle:'full',
    timeStyle:'full'
})
    
    
  return (
   <>
   
   <div className='main-container'>
    <h1>Wherever you go</h1>
    <h4 style={{marginTop:'-1.rem',fontWeight:'lighter',fontSize:'1.0rem'}}>Weather is there for you!</h4>
    <div className='logo'><FontAwesomeIcon icon={faCloudSun} className='main-icon'/></div>
    <h4 style={{fontWeight:'bold', color:'gray'}}>
        I can handle the heat, but only to a certain degree.</h4>
    <input type="serach" className='search-input' placeholder='Search ' value={search} 
    onChange={e=>setSearch(e.target.value)}/>
    
    {
        isError?(
            <p>No Data Found!</p>
        ):(
            <div className='ans'>
                <h2 style={{color:'#fff',display:'inline',}}>{(city.temp_min).toFixed()}°c</h2><h3 style={{textAlign:'end',marginTop:'-3.5rem'}}>{city2.country}</h3>
        <h1 className='location' style={{marginTop:'-6rem',marginBottom:'3rem',fontSize:'3rem'}}><FontAwesomeIcon className='logo2' icon={faStreetView} 
        style={{height:'5rem',opacity:'0.4',animation:'trans-x infinite linear 2000ms',paddingRight:'1rem', marginBottom:'1rem'}}/>{search.toUpperCase()}</h1>
        
    <div style={{marginTop:'-4rem', color:'gray'}} className='humid-feels'>
        
        <div>
         
        <h5 style={{marginTop:'-4rem',fontWeight:'lighter',fontSize:'1.5rem'}}>Feels like: {(city.feels_like).toFixed()}°c </h5>
        
         <h5 style={{marginTop:'-3rem',fontWeight:'lighter',fontSize:'1.5rem'}}>Humidity: {(city.humidity).toFixed()}%</h5>
         <h5 style={{marginTop:'-3rem',fontWeight:'lighter',fontSize:'1.5rem'}}>Sun Rise:{city2.sunrise} </h5>
         <h5 style={{marginTop:'-3rem',fontWeight:'lighter',fontSize:'1.5rem'}}>Sun Set: {city2.sunset}</h5>
         
        </div>
    </div>
    </div>
        )
    }
    
   </div>
   </>

  )
}

export default TempMain