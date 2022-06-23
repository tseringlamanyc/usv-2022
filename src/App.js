import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleRestaurant from "./screens/singleRestaurant/SingleRestaurant";
import AllResturants from "./screens/allRestaurants/AllRestaurants";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllResturants />} />
          <Route path="/:id" element={<SingleRestaurant />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
