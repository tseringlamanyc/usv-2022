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
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [restaurantLocation, setRestaurantLocation] = useState("");
  const [restaurantCuisine, setRestaurantCuisine] = useState("");
  const [restaurantPrice, setRestaurantPrice] = useState("");
  const [restaurantService, setRestaurantSerivce] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const searchHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setSearchTerm(lowerCase);
  };

  const locationHandler = (e) => {
    setRestaurantLocation(e.target.value);
  };

  const cuisineHandler = (e) => {
    setRestaurantCuisine(e.target.value);
  };

  const priceHandler = (e) => {
    setRestaurantPrice(e.target.value);
  };

  const serviceHandler = (e) => {
    setRestaurantSerivce(e.target.value);
  };

  const filterByName = (filteredData) => {
    if (searchTerm === "") {
      return filteredData;
    }
    const filterRestaurant = filteredData.filter((r) => r.name.toLowerCase().includes(searchTerm));
    return filterRestaurant;
  };

  const filterByLocation = (filteredData) => {
    if (!restaurantLocation || restaurantLocation === "All") {
      return filteredData;
    }
    const filterRestaurants = filteredData.filter((r) => r.location === restaurantLocation);
    return filterRestaurants;
  };

  const filterByCuisine = (filteredData) => {
    if (!restaurantCuisine || restaurantCuisine === "All") {
      return filteredData;
    }
    const filterRestaurants = filteredData.filter((r) => r.cuisine === restaurantCuisine);
    return filterRestaurants;
  };

  const filterByPrice = (filteredData) => {
    if (!restaurantPrice || restaurantPrice === "All") {
      return filteredData;
    }
    const filterRestaurants = filteredData.filter((r) => r.price === restaurantPrice);
    return filterRestaurants;
  };

  const filterByService = (filteredData) => {
    if (!restaurantService || restaurantService === "All") {
      return filteredData;
    }
    const filterRestaurants = filteredData.filter((r) => r.diningRestriction === restaurantService);
    return filterRestaurants;
  };

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
      setFilteredRestaurants(sorted);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    let fData = filterByName(allRestaurants);
    fData = filterByLocation(fData);
    fData = filterByCuisine(fData);
    fData = filterByPrice(fData);
    fData = filterByService(fData);
    setFilteredRestaurants(fData);
  }, [searchTerm, restaurantLocation, restaurantCuisine, restaurantPrice, restaurantService]);

  return (
    <div className="allRestaurant">
      <Navbar />
      <SearchBar
        searchHandler={searchHandler}
        restaurantData={allRestaurants}
        locationHandler={locationHandler}
        cuisineHandler={cuisineHandler}
        priceHandler={priceHandler}
        serviceHandler={serviceHandler}
      />

      <FormModal
        getAllRestaurants={fetchRestaurants}
        variant={"outlined"}
        prompt="Add Restaurant"
        method="POST"
      />

      {isLoading && <LoadingView />}

      {!isLoading && searchTerm.length !== 0 && filteredRestaurants.length === 0 && (
        <EmptyList searchTerm={searchTerm} />
      )}

      {filteredRestaurants.length > 0 && (
        <RestaurantList searchTerm={searchTerm} restaurants={filteredRestaurants} />
      )}
    </div>
  );
}

export default AllRestaurants;
