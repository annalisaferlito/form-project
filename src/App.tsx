import React from "react";
import "./App.css";
import SignUp from './components/SignUp/SignUp';
import LogIn from './components/LogIn/LogIn';
import Navbar from './components/Navbar/Navbar';



function App() {
  return (
    <div>
      <Navbar />
      <LogIn />
    </div>
  );
}

export default App;
