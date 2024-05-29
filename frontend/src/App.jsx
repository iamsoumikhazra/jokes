import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jokes, setJokes] = useState([]);
  const [numberOfJokes, setNumberOfJokes] = useState(5);
  const [loading, setLoading] = useState(false); // Track loading state

  useEffect(() => {
    fetchJokes(); // Fetch jokes when component mounts
  },[] );

  const fetchJokes = async () => {
    setLoading(true); // Set loading to true when fetching jokes

    try {
      const response = await axios.get(`/api/jokes?amount=${numberOfJokes}`);
      console.log("Response from server:", response); // Debugging log
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setJokes(response.data); // Store jokes in state
    } catch (error) {
      console.error("Error fetching jokes:", error.message);
    } finally {
      setLoading(false); // Set loading to false whether successful or not
    }
  };

  const handleNumberChange = (e) => {
    setNumberOfJokes(e.target.value);
  };

  const handleButtonClick = () => {
    fetchJokes(); // Fetch jokes when button is clicked
  };

  return (
    <div className="App">
      <h1>Soumik was here!</h1>
      <div>
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
      </div>
      {loading ? (
        <p>Loading jokes...</p>
      ) : (
        jokes.length > 0 && (
          <div>
            {jokes.map((joke, index) => (
              <div key={index}>
                <h4>{joke.setup}</h4>
                <p>{joke.delivery}</p>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default App;
