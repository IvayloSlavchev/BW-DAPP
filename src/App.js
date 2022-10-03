import React from "react";
import Header from './components/Header/Header';
import BuyTicket from './components/BuyTicket/BuyTicket'
import Main from "./components/Main/Main";
import Participant from "./components/Participant/Participant";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path='/buy' element={<BuyTicket />} />
        <Route path='/participant' element={<Participant />} />
      </Routes>
    
    </div>
  );
}

export default App;
