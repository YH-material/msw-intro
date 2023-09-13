import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [advice, setAdvice] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://api.adviceslip.com/advice");
      const jsonResponse = await response.json();
      setAdvice(jsonResponse.slip);
    };
    fetchData();
  }, []);
  return (
    <div className="app">
      <p className="inspo-quote">
        {advice ? `"${advice.advice}"` : "Loading.."}
      </p>
      <p className="girly-things">Just girly things</p>
    </div>
  );
}

export default App;
