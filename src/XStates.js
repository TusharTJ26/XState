import React, { useState, useEffect } from "react";

export default function XStates() {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [countryError, setCountryError] = useState(false);
  const [stateError, setStateError] = useState(false);

  useEffect(() => {
    fetch("https://location-selector.labs.crio.do/countries")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setCountryData(data);
        setCountryError(false);
      })
      .catch(() => {
        setCountryData([]);
        setCountryError(true);
      });
  }, []);

  useEffect(() => {
    if (!country) return;

    fetch(`https://location-selector.labs.crio.do/country=${country}/states`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setStateData(data);
        setStateError(false);
      })
      .catch(() => {
        setStateData([]);
        setStateError(true);
      });
  }, [country]);

  useEffect(() => {
    if (!state) return;

    fetch(
      `https://location-selector.labs.crio.do/country=${country}/state=${state}/cities`
    )
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => setCityData(data))
      .catch(() => setCityData([]));
  }, [state, country]);

  return (
    <div>
      <h2>Select Location</h2>

      <label>Select Country:</label>
      <select
        value={country}
        onChange={(e) => {
          setCountry(e.target.value);
          setState("");
          setCity("");
        }}
      >
        <option value="">--Select--</option>
        {countryData.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      {countryError && <p>Failed to load countries.</p>}

      {country && (
        <>
          <label>Select State:</label>
          <select
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setCity("");
            }}
          >
            <option value="">--Select--</option>
            {stateData.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {stateError && <p>Failed to load states.</p>}
        </>
      )}
      {state && (
        <>
          <label>Select City:</label>
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">--Select--</option>
            {cityData.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </>
      )}
    </div>
  );
}
