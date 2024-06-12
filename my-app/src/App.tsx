import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import AlbasaPage from './page/albasa';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<AlbasaPage />} />
        
        </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App;
