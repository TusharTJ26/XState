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
          "https://location-selector.labs.crio.do/countries"
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

  useEffect(() => {
    const fetchStates = async () => {
      // console.log(country);
      try {
        const response = await fetch(
          `https://location-selector.labs.crio.do/country=${country}/states`
        );
        const data = await response.json();
        setStateData(data);
      } catch (e) {
        console.error(e);
      }
    };
    if (country !== "") {
      fetchStates();
    }
  }, [country]);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await fetch(
          ` https://location-selector.labs.crio.do/country=${country}/state=${state}/cities`
        );
        const data = await response.json();
        setCityData(data);
      } catch (e) {
        console.error(e);
      }
    };
    if (state !== "") {
      fetchCity();
    }
  }, [state]);

  const Country = () => {
    // console.log(country)
    const handleChange = (e) => {
      e.preventDefault();
      // console.log(e.target.value);
      setCountry(e.target.value);
      // fetchStates();
    };
    return (
      <>
        <select
          style={{ width: "300px" }}
          value={country}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Country
          </option>
          {/* {countryData.map((data) => {
            return (
              <option key={data} value={data}>
                {data}
              </option>
            );
          })} */}
          {countryData.length > 0
            ? countryData.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))
            : null}

          {/* <option value="Second">Second</option>
          <option value="Third">Third</option> */}
        </select>
      </>
    );
  };
  const State = () => {
    const handleStateChange = (e) => {
      setState(e.target.value);
      // fetchCity();
    };
    return (
      <>
        <select
          style={{ width: "200px" }}
          value={state}
          onChange={handleStateChange}
          disabled={country === ""}
          // conditional rendenring inside properties
        >
          <option value="" disabled>
            Select State
          </option>
          {stateData.map((data) => {
            return (
              <option key={data} value={data}>
                {data}
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
          <option value="" disabled>
            Select City
          </option>
          {cityData.map((data) => {
            return (
              <option key={data} value={data}>
                {data}
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
  // console.log(countryData);
  return (
    <>
      <h1>Select Location</h1>
      <Country />
      <State />
      <City />
      <br />

      {city !== "" ? (
        <h4>
          <b>
            You selected
            <span style={{ fontSize: "1.3rem" }}> {city}</span>
          </b>
          <span style={{ color: "grey" }}>
            , {state}, {country}
          </span>
        </h4>
      ) : null}
    </>
  );
}
