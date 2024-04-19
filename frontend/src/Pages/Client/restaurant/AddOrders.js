import React, { useState } from 'react';
import useAddOrder from "../../../hooks/Client/restaurant/useAddOrder";
import { useLocation } from "react-router-dom";

function AddNewOrder() {
    const [Quantity, setQuantity] = useState("");
    const [cusName, setcusName] = useState("");
    const [email, setemail] = useState("");
    const [contactNumber, setcontactNumber] = useState("");
    const [formError, setFormError] = useState("");
    const { AddOrder, isLoading, error } = useAddOrder();
    
    const location = useLocation();
    const { productname, price } = location.state || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return; 
        await AddOrder(productname, Quantity, price, cusName, email, contactNumber);
    };

    const validateForm = () => {
        if (!Quantity || !cusName || !email || !contactNumber) {
            alert("All fields must be filled.");
            return false;
        } else {
            setFormError("");
            return true;
        }
    };

    return (
        <div className="row d-flex align-items-center justify-content-center">
            <h1 className="m-5">Place New Order</h1>
            <form
                className="bg-primary bg-opacity-50"
                onSubmit={handleSubmit}
                style={{ width: "25rem" }}
            >
                <label className="form-label mt-3">Enter productName:</label>
                <input
                    type="text"
                    className="form-control"
                    value={productname}
                    disabled 
                />

                <label className="form-label mt-3">Quantity:</label>
                <input
                    type="number"
                    className="form-control"
                    value={Quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                
                <label className="form-label mt-3">Price:</label>
                <input
                    type="number"
                    className="form-control"
                    value={price}
                    disabled 
                />

                <label className="form-label mt-3">Enter Customer Name:</label>
                <input
                    type="text"
                    className="form-control"
                    value={cusName}
                    onChange={(e) => setcusName(e.target.value)}
                />

                <label className="form-label mt-3">Email:</label>
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                />

                <label className="form-label mt-3">Contact Number:</label>
                <input
                    type="number"
                    className="form-control"
                    value={contactNumber}
                    onChange={(e) => setcontactNumber(e.target.value)}
                />

                <button
                    type="submit"
                    className="btn btn-success m-4"
                >
                  Proceed to Checkout
                </button>

                {formError && <div id="Error" className="error">{formError}</div>}
            </form>
        </div>
    );
}

export default AddNewOrder;
