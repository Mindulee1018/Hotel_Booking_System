import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import useActivityList from "../../../hooks/Staff/Reception/useActivityList";
import ReceptionNavbar from "../../../components/receptionNavbar";

function SelectActivity() {
  const { ActivityList, isLoading, error } = useActivityList();
  const navigate = useNavigate();

  const [idList, setIdList] = useState([]);

  const handleAddClick = (activityIds, Price) => {
    // Navigate to the next page and pass the activityId
    //navigate("/addWatersportsReservation", { state: { activityIds } });
    navigate("/addWatersportsReservation", { state: { activityList: idList } });
  };

  const getActivities = (event, id, Price, qtyPerRound) => {
    const checked = event.target.checked;
    if (checked) {
      // const ids = idList;
      // ids.push(id);
      setIdList((currentList) => [
        ...currentList,
        {
          id,
          Price,
          qtyPerRound,
          Qty: qtyPerRound,
          activityTPrice: Price,
          noOfRides: 1,
        },
      ]);
      //setIdList(ids);
    } else {
      // const ids = idList;
      // const filteredIdList = ids.filter((filterId) => filterId === id);
      setIdList((currentList) => currentList.filter((item) => item.id !== id));
      //setIdList(filteredIdList);
    }
  };

  return (
    <div className="row">
      <ReceptionNavbar />
      <div className="col">
        <div>
          <div>
            <h1 className="mb-4 mt-5">Watersport Activities</h1>

            <div className="d-flex align-items-center justify-content-around mb-3">
              <table
                className="table"
                style={{ width: "50rem" }}
              >
                <thead>
                  <tr>
                    <th></th>
                    <th className="border border-black bg-primary bg-opacity-25" scope="col">
                      Activity Name
                    </th>
                    <th className="border border-black bg-primary bg-opacity-25" scope="col">
                      Estimated Time
                    </th>
                    <th className="border border-black bg-primary bg-opacity-25" scope="col">
                      Price
                    </th>
                    <th className="border border-black bg-primary bg-opacity-25" scope="col">
                      Qty per Ride
                    </th>
                  </tr>
                </thead>

                {ActivityList.map((Watersport) => (
                  <tbody>
                    <tr>
                      <td>
                        <input
                          type="checkbox"
                          onClick={(event) =>
                            getActivities(
                              event,
                              Watersport.Activity,
                              Watersport.Price,
                              Watersport.qtyPerRound
                            )
                          }
                        ></input>
                      </td>

                      <td className="border border-black">
                        {Watersport.Activity}
                      </td>

                      <td className="border border-black">{Watersport.Time}</td>

                      <td className="border border-black">
                        Rs.{Watersport.Price}.00
                      </td>

                      <td className="border border-black">
                        {Watersport.qtyPerRound}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>
            </div>

            <button
              className="btn btn-primary"
              onClick={() => handleAddClick(idList)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectActivity;
