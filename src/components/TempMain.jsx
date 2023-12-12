import React, { useState, useEffect } from "react";
import "./css/style.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRegular,
  faCloudSun,
  faStreetView,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const TempMain = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isError,setError]=useState(false);

  const [search, setSearch] = useState("Thane");
  const api_Key = "18734b0f9e85affe3a1d01585377aea9";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${api_Key}`;

  useEffect(() => {
    const fetchApi = async () => {
     try{
        const response = await fetch(url);
        const resJson = await response.json();
          console.log(resJson);
          if(resJson.cod==='404' || resJson.cod==='400'){
            setError(true);
            setLoading(false);
            return 
          }
          
    
        setData(resJson);
        setLoading(false);
        setError(false);
     }
     catch{
        setError(true);
        setLoading(false);
     }
    };

    fetchApi();
  }, [search]);

  if (loading) {
    return <div style={{alignSelf:'center',justifyContent:'center',display:'flex' ,fontSize:'6rem'}}>Loading....</div>;
  }
// const sunRise=new Date(data.sys.sunrise)
// const sunSet=new Date(data.sys.sunset)
  return (
    <>
      <div className="main-container">
        <h1>Wherever you go</h1>
        <h4
          style={{
            marginTop: "-1.rem",
            fontWeight: "lighter",
            fontSize: "1.0rem",
          }}
        >
          Weather is there for you!
        </h4>
        <div className="logo">
          <FontAwesomeIcon icon={faCloudSun} className="main-icon" />
        </div>
        <h4 style={{ fontWeight: "bold", color: "gray" }}>
          I can handle the heat, but only to a certain degree.
        </h4>
        <input
          type="serach"
          className="search-input"
          placeholder="location?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {isError? (
          <p>No Data Found!</p>
        ) : (
          <div className="ans">
            <h2 style={{ color: "#fff", display: "inline" }}>
              {data.main.temp_min.toFixed()}°c
            </h2>
            <h3 style={{ textAlign: "end", marginTop: "-3.5rem" }}>
              {data.sys.country}
            </h3>
            <h1
              className="location"
              style={{
                marginTop: "-6rem",
                marginBottom: "3rem",
                fontSize: "3rem",
              }}
            >
              <FontAwesomeIcon
                className="logo2"
                icon={faStreetView}
                style={{
                  height: "5rem",
                  opacity: "0.4",
                  animation: "trans-x infinite linear 2000ms",
                  paddingRight: "1rem",
                  marginBottom: "1rem",
                }}
              />
              {search.toUpperCase()}
            </h1>

            <div
              style={{ marginTop: "-4rem", color: "gray" }}
              className="humid-feels"
            >
              <div>
                <h5
                  style={{
                    marginTop: "-4rem",
                    fontWeight: "lighter",
                    fontSize: "1.5rem",
                  }}
                >
                  Feels like: {data.main.feels_like.toFixed()}°c{" "}
                </h5>

                <h5
                  style={{
                    marginTop: "-3rem",
                    fontWeight: "lighter",
                    fontSize: "1.5rem",
                  }}
                >
                  Humidity: {data.main.humidity.toFixed()}%
                </h5>
                <h5
                  style={{
                    marginTop: "-3rem",
                    fontWeight: "lighter",
                    fontSize: "1.5rem",
                  }}
                >
                  Weather: {data.weather[0].main}
                </h5>
                <h5
                  style={{
                    marginTop: "-3rem",
                    fontWeight: "lighter",
                    fontSize: "1.5rem",
                  }}
                >
                  Wind Speed: {data.wind.speed}Mph
                </h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TempMain;
