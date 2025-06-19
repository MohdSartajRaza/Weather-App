import React, { useEffect, useState } from "react";
import "./style.css";
import WeatherCard from "../weather/weatherCard";

const Temp = () => {
  const [searchValue, setSearchValue] = useState("pune");
  const [tempInfo, setTempInfo] = useState({});
  const [finalValue, setFinalValue] = useState("");

  const getWeatherInfo = async () => {
    setFinalValue(searchValue);

    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q= ${finalValue}&units=metric&appid=43fb80e0bf236055a63a381fea6a4f0e
`;

      const res = await fetch(url);
      let data = await res.json();

      const { temp, humidity, pressure } = data.main;
      const { country, sunset } = data.sys;
      const { main: weathermood } = data.weather[0];
      const { name } = data;
      const { speed } = data.wind;

      const newWeatherData = {
        temp,
        humidity,
        country,
        name,
        speed,
        pressure,
        weathermood,
        sunset,
      };

      setTempInfo(newWeatherData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherInfo();
  }, [getWeatherInfo]);

  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search...."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button
            className="searchButton"
            type="button"
            onClick={() => getWeatherInfo()}
          >
            {" "}
            Search
          </button>
        </div>
      </div>
      <WeatherCard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
