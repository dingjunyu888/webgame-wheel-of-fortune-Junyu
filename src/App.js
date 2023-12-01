import React, { useState } from 'react';
import './App.css';
import LoginForm from './LoginForm.js';
import WheelOfFortuneGame from './WheelOfFortuneGame';


function App() {
  const [user, setUser] = useState(null);

  	// this will be called by the LoginForm
	function HandleLogin(user) {
		setUser(user);
	}


  return (
    <div className="App">
        <WheelOfFortuneGame />
    </div>
  );
}

export default App;