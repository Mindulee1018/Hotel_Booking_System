import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useAddReserv from "../../../hooks/Staff/Reception/useAddReserv";
import ReceptionNavbar from "../../../components/receptionNavbar";
import { checkActivityAvailability } from "../../../hooks/Staff/Reception/useCheckAvailability";

const AddReserv = () => {
  const location = useLocation();
  const [activityList, setActivityList] = useState(
    location.state?.activityList || []
  );
  const [totalPrice, setTotalPrice] = useState(0);

  const [nameToUpdate, setNameToUpdate] = useState("");
  const [Qty, setQty] = useState(null);

  const getUpdateData = (activity) => {
    setNameToUpdate(activity.id);
    setQty(activity.Qty || activity.qtyPerRound);
  };

  const updateDetails = async (selectedActivity) => {
    const quantity = Qty && Number(Qty);
    const updatedActivities = activityList.map((activity) => {
      if (activity.id === selectedActivity.id) {
        // Calculate the number of rides based on the updated quantity
        const noOfRides = Math.ceil(quantity / activity.qtyPerRound);
        const activityTPrice = Math.ceil(activity.Price * noOfRides);

        return {
          ...activity,
          Qty: quantity,
          noOfRides: noOfRides,
          activityTPrice: activityTPrice,
        };
      }
      return activity;
    });
    setActivityList(updatedActivities);
    setNameToUpdate(null);
    setQty(null);
  };

  useEffect(() => {
    const total = activityList.reduce(
      (acc, activity) =>
        acc +
        activity.Price *
          (activity.noOfRides ||
            Math.ceil(
              (activity.Qty || activity.qtyPerRound) / activity.qtyPerRound
            )),
      0
    );
    setTotalPrice(total);
  }, [activityList]);

  const [CusName, setCusName] = useState("");
  const [TelNo, setTelNo] = useState("");
  const [Address, setAddress] = useState("");
  const [checkinDate, setcheckinDate] = useState("");
  const [checkinTime, setcheckinTime] = useState("");
  const [isSlotUnvailable, setIsSlotUnvailable] = useState(false);

  const { addReserv } = useAddReserv();

  const handleSubmit = async () => {
    await addReserv(
      CusName,
      TelNo,
      Address,
      checkinDate,
      checkinTime,
      Qty,
      activityList
    );
  };

  const validate = async (e) => {
    e.preventDefault();
    const allFieldsFilled =
      CusName && TelNo && Address && checkinDate && checkinTime;
    const activities = await checkActivityAvailability(
      checkinDate,
      checkinTime
    );
    const available = checkIsActivityAlreadyBooked(activities, activityList);
    if (available) {
      setIsSlotUnvailable(true);
    } else {
      setIsSlotUnvailable(false);
      handleSubmit();
    }

    const errorElement = document.getElementById("Error");
    if (!allFieldsFilled) {
      errorElement.innerHTML = "All fields must be filled.";
      return false;
    } else {
      errorElement.innerHTML = "";
      return true;
    }
  };

  const checkIsActivityAlreadyBooked = (activities, selectedActivities) => {
    return (
      activities &&
      activities.some((activity) => {
        return activity.activityList.some((alreadyBookedActivity) => {
          return selectedActivities.some((selectedActivity) => {
            return selectedActivity.id === alreadyBookedActivity.id;
          });
        });
      })
    );
  };

  return (
    <div className="row mb-5">
      <div className="col">
      <ReceptionNavbar />
      </div>
      
      <div className="col-lg-10">

        <div className="mt-5 mb-4">
          <h3 className="text-primary fw-bolder fs-4">Selected Activities</h3>
        </div>

        <div>
          <div>
            <div className="row d-flex align-items-center justify-content-center">
              <table style={{ width: "48rem" }} >
                <thead className="bg-primary bg-opacity-25">
                  <tr>
                  <th className="border border-black">Activity Name</th>
                  <th className="border border-black">Price per round (Rs.)</th>
                  <th className="border border-black">Qty per round</th>
                  <th className="border border-black">No.of.People</th>
                  <th className="border border-black">Rounds</th>
                  <th className="border border-black">Total Price (Rs.)</th>
                </tr>
                </thead>
                

                {activityList &&
                  activityList.map((activity) => (
                    <tbody key={activity.id}>
                      <tr>
                        <td className="border border-black">{activity.id}</td>
                        <td className="border border-black">
                          {activity.Price}.00
                        </td>
                        <td className="border border-black">
                          {activity.qtyPerRound}
                        </td>
                        <td className="border border-black">
                          {nameToUpdate === activity.id ? (
                            <input
                              className="tabledit-input form-control input-sm"
                              type="number"
                              name="Qty"
                              value={Qty}
                              disabled=""
                              onChange={(e) => {
                                setQty(e.target.value);
                              }}
                            ></input>
                          ) : (
                            activity.Qty || activity.qtyPerRound
                          )}

                          {nameToUpdate === activity.id ? (
                            <button
                              className="btn btn-primary"
                              onClick={() => updateDetails(activity)}
                            >
                              Save
                            </button>
                          ) : (
                            <button
                              className="btn btn-primary ms-3"
                              onClick={() => getUpdateData(activity)}
                            >
                              Update
                            </button>
                          )}
                        </td>

                        <td className="border border-black">
                          {activity.noOfRides ||
                            Math.ceil(
                              (activity.Qty || activity.qtyPerRound) /
                                activity.qtyPerRound
                            )}
                        </td>

                        <td className="border border-black">
                          {activity.Price *
                            Math.ceil(
                              (activity.Qty || activity.qtyPerRound) /
                                activity.qtyPerRound
                            )}
                          .00
                        </td>
                      </tr>
                    </tbody>
                  ))}
              </table>

              {/* display total bill */}
              <div className="mt-2 mb-4">
                <span className="fw-bolder text-danger">Total Bill: </span>
                <span className="fw-bolder bg-warning bg-opacity-50">Rs.{totalPrice}.00</span>
              </div>

              <p className="text-primary fw-bolder fs-4">
                Customer Details Form
              </p>

              <div className="row align-items-center justify-content-center">
                <form
                  onSubmit={validate}
                  style={{ width: "18rem" }}
                  className="bg-primary bg-opacity-25 rounded"
                >
                  <div className="mb-3">
                    <label htmlFor="customerName" className="form-label">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="customerName"
                      onChange={(e) => setCusName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="contactNumber" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="contactNumber"
                      onChange={(e) => setTelNo(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="checkinDate" className="form-label">
                      Check-in Date
                    </label>

                    <input
                      type="Date"
                      className="form-control"
                      id="checkinDate"
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setcheckinDate(e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="checkinHour" className="form-label">
                      Check-in Hour
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="checkinHour"
                      min="9"
                      max="16"
                      placeholder="Enter hour (9-16)"
                      onChange={(e) => {
                        const hour = Math.max(
                          0,
                          Math.min(16, Number(e.target.value))
                        );
                        setcheckinTime(`${hour}:00`);
                      }}
                    />
                  </div>
                  <div>
                    {isSlotUnvailable && (
                      <p>
                        Sorry, this slot is not available. Please choose
                        another.
                      </p>
                    )}
                  </div>

                  <button type="submit" className="btn btn-success" id="submit">
                    Submit
                  </button>

                  <p id="Error"></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReserv;
