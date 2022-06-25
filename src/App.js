import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SingleRestaurant from "./screens/singleRestaurant/SingleRestaurant";
import AllResturants from "./screens/allRestaurants/AllRestaurants";
import AboutMe from "./screens/aboutMe/AboutMe";
import AllReservations from "./screens/allReservations/AllReservations";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllResturants />} />
          <Route path="/:id" element={<SingleRestaurant />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/reservations" element={<AllReservations />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
