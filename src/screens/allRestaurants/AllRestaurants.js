import React from "react";
import { useEffect, useState } from "react";

import RestaurantList from "../../components/restaurantList/RestaurantList.js";
import SearchBar from "../../components/searchBar/SearchBar.js";
import LoadingView from "../../components/views/LoadingView.js";
import EmptyList from "../../components/views/EmptyList.js";
import FormModal from "../../components/modal/FormModal.js";
import Navbar from "../../components/navBar/NavBar.js";

import { endpointURL } from "../../util/EndpointURL";

import "./AllRestaurants.scss";

function AllRestaurants() {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [error, SetError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const searchHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase);
  };

  const filterRestaurants = allRestaurants.filter((ele) => {
    if (searchTerm === "") {
      return ele;
    } else {
      return ele.name.toLowerCase().includes(searchTerm);
    }
  });

  const fetchRestaurants = async () => {
    try {
      let url = `${endpointURL}restaurants`;
      const res = await fetch(url);

      if (!res.ok) {
        throw Error(`Could not fetch data for that ${url}`);
      }

      const json = await res.json();
      let sorted = json.restaurants.sort((a, b) => a.name.localeCompare(b.name));
      setAllRestaurants(sorted);
      setIsLoading(false);
    } catch (err) {
      SetError(err.message);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="allRestaurant">
      <Navbar />
      <SearchBar searchHandler={searchHandler} />

      <FormModal getAllRestaurants={fetchRestaurants} prompt="Add Restaurant" method="POST" />

      {isLoading && <LoadingView />}

      {!isLoading && searchTerm.length !== 0 && filterRestaurants.length === 0 && (
        <EmptyList searchTerm={searchTerm} />
      )}

      {filterRestaurants.length > 0 && (
        <RestaurantList searchTerm={searchTerm} restaurants={filterRestaurants} />
      )}
    </div>
  );
}

export default AllRestaurants;
