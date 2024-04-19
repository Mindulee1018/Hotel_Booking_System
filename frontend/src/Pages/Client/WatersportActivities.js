import React, { useState } from "react";

import useActivityList from "../../hooks/Staff/Reception/useActivityList";

function WatersportActivities() {
  const { ActivityList, isLoading, error } = useActivityList();

  if (isLoading) {
    return (
      <div className="alert alert-primary" role="alert">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="row p-0">
      <div className="col">
        <div>
          <h1 className="mb-4 mt-5">Watersport Activities</h1>

          <div className="row d-flex align-items-center justify-content-around mb-3">
            {/* <div className="row"> */}
            {ActivityList.map((Watersport) => (
              <div className="col-lg-3">
                <div className="card mb-4">
                  <div className="card-body">
                    {Watersport.Image && Watersport.Image.data && (
                      <img
                        style={{ width: "10rem" }}
                        src={`data:${
                          Watersport.Image.contentType
                        };base64,${btoa(
                          String.fromCharCode.apply(
                            null,
                            Watersport.Image.data.data
                          )
                        )}`}
                        className="card-img-top mb-1"
                        alt={Watersport.Activity}
                      />
                    )}
                    <h5 className="card-title">{Watersport.Activity}</h5>
                    <p className="card-text fw-medium">{Watersport.Time}</p>
                    <p className="card-text fw-medium text-dark bg-warning bg-opacity-50">
                      Rs.{Watersport.Price}.00
                    </p>
                    Qty Per Round
                    <p className="card-text fw-medium">
                      {Watersport.qtyPerRound}
                    </p>
                    <p className="card-text fw-medium">
                      {Watersport.Description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {/* </div> */}
          </div>
        </div>

        {/* model  */}
      </div>
    </div>
  );
}

export default WatersportActivities;
