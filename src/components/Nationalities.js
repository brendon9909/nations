import React, { useState, useEffect, useRef } from "react";

export default function Nationality() {
  const [name, setName] = useState(""); //create state for users name
  const [country, setCountry] = useState(null); //create state for country
  const [probability, setProbability] = useState(null); //create state for probability
  const inputRef = useRef(); //create ref to be used for focus

  function handleName() {
    //function to set name to user input
    let myName = document.querySelector("input");
    setName(myName.value);
    myName.value = "";
  }

  useEffect(() => {
    //useEffect to focus on input and to to fetch api data
    inputRef.current.focus();
    if (name !== "") {
      //check if name is defined before fetching data
      async function fetchData() {
        fetch(`https://api.nationalize.io/?name=${name}`)
          .then((res) => res.json())
          .then((data) => {
            setCountry(String(data.country[0].country_id)); //set the country
            setProbability(String(data.country[0].probability)); //set the probability

          })
          .catch((error) => {
            //error handling
            setCountry(String(error));
            setProbability("not applicable");
          });
      }
      fetchData(); //call the function
    }
  }, [name]); //use name as the dependency

  return (
    <div>
      <h2>Enter Your Name</h2>
      <input className="bigInput" type="text" ref={inputRef} />
      <br />
      <button className="bigButton" onClick={handleName}>Apply</button>
      <h1>Your Country id: {country}</h1>
      <h1>probability: {probability}</h1>
    </div>
  );
}
