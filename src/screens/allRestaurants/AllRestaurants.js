import React from "react";
import { useEffect, useState } from "react";
import RestaurantList from "../../components/restaurantList/RestaurantList.js";
import SearchBar from "../../components/searchBar/SearchBar.js";

import "./AllRestaurants.scss";
import { endpointURL } from "../../util/EndpointURL";
import LoadingView from "../../components/views/LoadingView.js";
import EmptyList from "../../components/views/EmptyList.js";
import CreateRestaurantForm from "../../components/forms/createRestaurant/CreateRestaurantForm.js";

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

  useEffect(() => {
    const fetchResturants = async () => {
      try {
        let url = `${endpointURL}api/restaurants`;
        const res = await fetch(url);

        if (!res.ok) {
          throw Error(`Could not fetch data for that ${url}`);
        }

        const json = await res.json();
        setAllRestaurants(json.restaurants);
        setIsLoading(false);
      } catch (err) {
        SetError(err.message);
      }
    };

    fetchResturants();
  }, []);

  return (
    <div>
      <SearchBar searchHandler={searchHandler} />
      <CreateRestaurantForm />

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
