import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AllResturants from "./screens/allRestaurants/AllRestaurants";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllResturants />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
