import React from "react";
import { useState, useEffect } from "react";

import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

import { endpointURL } from "../../util/EndpointURL";
import { change12To24 } from "../../util/24to12";
import "./ReservationGrid.scss";

function ReservationGrid({ allRestaurants }) {
  const [reservations, setReservations] = useState([]);

  const rows = reservations;

  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      headerClassName: "super-app-theme--header",
      width: 200,
      valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`,
    },
    {
      field: "phoneNumber",
      headerName: "Phone number",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "restaurantId",
      headerName: "Restaurant",
      headerClassName: "super-app-theme--header",
      width: 200,
      valueGetter: (params) => {
        allRestaurants.restaurants.filter((ele) => {
          if (ele.id === params.row.restaurantId) {
            params.row.restaurantId = ele.name;
          }
        });
        return params.row.restaurantId;
      },
    },
    {
      field: "time",
      headerName: "Arrival time",
      headerClassName: "super-app-theme--header",
      width: 250,
      valueGetter: (params) =>
        `${params.row.time.split("T")[0]} @ ${change12To24(
          params.row.time.split("T")[1].slice(0, 8)
        )}`,
    },
    {
      field: "numGuests",
      headerName: "# of Guest",
      headerClassName: "super-app-theme--header",
      width: 160,
    },

    {
      field: "email",
      headerName: "email",
      headerClassName: "super-app-theme--header",
      width: 290,
      valueGetter: (params) => `${params.row.email || "No email provided"}`,
    },
  ];

  const fetchAllReservations = async () => {
    try {
      let url = `${endpointURL}reservations`;
      const res = await fetch(url);

      if (!res.ok) {
        throw Error(`Could not fetch data from ${url}`);
      }

      const json = await res.json();
      setReservations(json.reservations);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllReservations();
  }, []);

  return (
    <div className="reservationGrid">
      {Object.keys(allRestaurants).length > 0 && (
        <Box
          sx={{
            height: 371,
            width: "100%",
            "& .super-app-theme--header": {
              backgroundColor: "gray",
              color: "white",
            },
          }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
        </Box>
      )}
    </div>
  );
}

export default ReservationGrid;
