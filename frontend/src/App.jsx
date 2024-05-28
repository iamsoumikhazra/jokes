import { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);
  const [numberOfJokes, setNumberOfJokes] = useState(5);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/jokes?amount=${numberOfJokes}`)
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [numberOfJokes]); 

  const handleNumberChange = (e) => {
    setNumberOfJokes(e.target.value);
  };

  const fetchJokes = () => {
    axios
      .get(`http://localhost:3000/jokes?amount=${numberOfJokes}`)
      .then((response) => {
        setJokes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1>Soumik was here!</h1>
      <input
        type="number"
        placeholder="Enter number of jokes"
        onChange={handleNumberChange}
        value={numberOfJokes}
        min="2"
        max="10"
        step="1"
        required
        pattern="[0-9]*"
      />
      <button onClick={fetchJokes}>Get Jokes</button>
      {jokes.map((joke, index) => (
        <div key={index}>
          <h3>{joke.setup}</h3>
          <h3>{joke.delivery}</h3>
        </div>
      ))}
    </>
  );
}

export default App;
