import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);
  const [numberOfJokes, setNumberOfJokes] = useState(5);
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    fetchJokes(); // Fetch jokes when component mounts
  }, []);

  const fetchJokes = () => {
    setLoading(true); // Set loading to true when fetching jokes

    fetch(`/api/jokes?amount=${numberOfJokes}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setJokes(data);
        setLoading(false); // Set loading to false when jokes are fetched
      })
      .catch((error) => {
        console.error("Error fetching jokes:", error.message);
        setLoading(false); // Set loading to false on error
      });
  };

  const handleNumberChange = (e) => {
    setNumberOfJokes(e.target.value);
  };

  const handleButtonClick = () => {
    fetchJokes(); // Fetch jokes when button is clicked
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
      <button onClick={handleButtonClick} disabled={loading}>
        {loading ? "Loading..." : "Get Jokes"}
      </button>
      {loading ? (
        <p>Loading jokes...</p>
      ) : (
        jokes.map((joke, index) => (
          <div key={index}>
            <h4>{joke.setup}</h4>
            <p>{joke.delivery}</p>
          </div>
        ))
      )}
    </>
  );
}

export default App;
