import React, { useState } from "react";
import OfferList from "../../hooks/useOfferList";


// import { useLocation, useNavigate } from 'react-router-dom';

function Offer() {
    const { offers } = OfferList();
    // const location = useLocation();
    // const navigate = useNavigate();

  return (
    <div className="vh-100">
      <div className="row" style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", marginTop: "20px", borderRadius: "5px", padding: "20px" }}>
        {offers.map((offers) => (
          <div className="col-md-7">
            <div className="card">
              <div className="card-body">
                {offers.Image && offers.Image.data && (
                  <img
                    style={{ width: "10rem" }}
                    src={`data:${offers.Image.contentType};base64,${btoa(
                      String.fromCharCode.apply(null, offers.Image.data.data)
                    )}`}
                    className="card-img-top mb-1"
                    alt={offers.Rtype}
                  />
                )}

                <p className="card-text">{offers.offerID}</p>
                <p className="card-text">{offers.offerName}</p>
                <p className="card-text">{offers.Date}</p>
                <p className="card-text">{offers.description}</p>
                

                {/*<div style={{ float: "right" }}>
                  <a href="/OfferDetails" className="btn btn-info" onClick={() => handleOfferSelect(offers.Rid)}>
                    Details
                  </a>
                </div>*/}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}
export default Offer;