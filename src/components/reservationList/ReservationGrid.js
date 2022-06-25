import React from "react";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { endpointURL } from "../../util/EndpointURL";

import "./ReservationGrid.scss";

function ReservationGrid() {
  const [reservations, setReservations] = useState([]);

  const columns = [
    {
      field: "fullName",
      headerName: "Full Name",
      width: 160,
      valueGetter: (params) => `${params.row.firstName} ${params.row.lastName}`,
    },
    { field: "phoneNumber", headerName: "Phone number", width: 130 },
    {
      field: "time",
      headerName: "Arrival time",
      width: 230,
      valueGetter: (params) =>
        `${params.row.time.split("T")[0]} ${params.row.time.split("T")[1].slice(0, 5)}`,
    },
    { field: "numGuests", headerName: "Guests", width: 80 },
    { field: "restaurantId", headerName: "Restaurant", width: 230 },
    {
      field: "email",
      headerName: "email",
      width: 230,
      valueGetter: (params) => `${params.row.email || "No email"}`,
    },
  ];

  const rows = reservations;

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
    <div style={{ height: 400, width: "100%" }} className="reservationGrid">
      <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </div>
  );
}

export default ReservationGrid;
