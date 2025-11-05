import React from "react";
import { useState, useEffect } from "react";

export default function States() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountryData(data);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCountries();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/states`
      );
      const data = await response.json();
      setStateData(data);
    } catch (e) {
      console.error(e);
    }
  };
  const fetchCity = async () => {
    try {
      const response = await fetch(
        `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
      );
      const data = await response.json();
      setCityData(data);
    } catch (e) {
      console.error(e);
    }
  };

  const Country = () => {
    // console.log(country)
    const handleChange = (e) => {
      e.preventDefault();
      // console.log(e)
      setCountry(e.target.value);
      fetchStates();
    };
    return (
      <>
        <select
          style={{ width: "300px" }}
          value={country}
          onChange={handleChange}
        >
          <option value="">Select Country</option>
          {countryData.map((data) => {
            return (
              <option key={data.country_name} value={data.country_name}>
                {data.country_name}
              </option>
            );
          })}
          {/* <option value="Second">Second</option>
          <option value="Third">Third</option> */}
        </select>
      </>
    );
  };
  const State = () => {
    const handleStateChange = (e) => {
      setState(e.target.value);
      fetchCity();
    };
    return (
      <>
        <select
          style={{ width: "200px" }}
          value={state}
          onChange={handleStateChange}
          disabled={country === ""} // conditional rendenring inside properties
        >
          <option value="">Select State</option>
          {stateData.map((data) => {
            return (
              <option key={data.state_name} value={data.state_name}>
                {data.state_name}
              </option>
            );
          })}
          {/* <option value="Second">Second</option>
          <option value="Third">Third</option> */}
        </select>
      </>
    );
  };
  const City = () => {
    const handleCityChange = (e) => {
      setCity(e.target.value);
    };

    return (
      <>
        <select
          style={{ width: "150px" }}
          value={city}
          onChange={handleCityChange}
          disabled={state === ""}
        >
          <option value="">Select City</option>
          {countryData.map((data) => {
            return (
              <option key={data.city_name} value={data.city_name}>
                {data.city_name}
              </option>
            );
          })}
          {/* <option value="Second">Second</option>
          <option value="Third">Third</option> */}
        </select>
      </>
    );
  };

  // console.log(country, state, city);
  console.log(countryData);
  return (
    <>
      <h1>Select Location</h1>
      <Country />
      <State />
      <City />
    </>
  );
}
