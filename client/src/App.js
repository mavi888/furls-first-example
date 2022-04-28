import React, { useState } from "react";

import awsConfig from "./aws-config";
import axios from 'axios';


import "./App.css";

function App() {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [name, setName] = useState("");

  const endpoint = awsConfig.API.greetingsEndpoint;

  const wasGreeted = async () => {
    const response = await axios.get(endpoint, {
      params: {
        name: name
      }
    })
    
    setShowResult(true);
    setApiMessage(response.data);
  };

  const greet = async () => {
    await axios.post(endpoint, null, {
      params: {
        name: name,
      },
      headers: {
        'content-type': 'text/json'
      }
    })

    setShowResult(true);
    setApiMessage(`Hola ${name}`);
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Greeter</h1>
        <input type="text" onChange={handleChange} />
        <button onClick={wasGreeted}>Was greeted?</button>
        <button onClick={greet}>Greet</button>
        <div>
          {showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
        </div>
      </header>
    </div>
  );
}

export default App;