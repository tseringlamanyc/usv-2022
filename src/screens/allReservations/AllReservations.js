import React from "react";
import { useEffect, useState } from "react";

import Navbar from "../../components/navBar/NavBar";
import ReservationGrid from "../../components/reservationList/ReservationGrid";
import { endpointURL } from "../../util/EndpointURL";

function AllReservations() {
  const [allRestaurants, setAllRestaurants] = useState({});
  const [error, setError] = useState(null);

  const fetchAllRestaurants = async () => {
    try {
      let url = `${endpointURL}restaurants`;
      const res = await fetch(url);

      if (!res.ok) {
        throw Error(`Could not fetch data for that ${url}`);
      }

      const json = await res.json();
      setAllRestaurants(json);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchAllRestaurants();
  }, []);

  return (
    <div>
      <Navbar />
      <ReservationGrid allRestaurants={allRestaurants} />
    </div>
  );
}

export default AllReservations;
