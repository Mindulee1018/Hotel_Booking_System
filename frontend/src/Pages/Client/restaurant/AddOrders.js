import React, { useEffect, useState } from 'react';
import useAddOrder from "../../../hooks/Client/restaurant/useAddOrder";
import { useLocation } from "react-router-dom"; // Correct import statement

function AddNewOrder() {
    const [productName, setproductName] = useState("");
    const [Quantity, setQuantity] = useState("");
    const [Price, setPrice] = useState("");
    const [cusName, setcusName] = useState("");
    const [email, setemail] = useState("");
    const [contactNumber, setcontactNumber] = useState("");
    const [formError, setFormError] = useState("");
    const { AddOrder, isLoading, error } = useAddOrder();
    
    const location = useLocation(); // Correct usage

    const { productname, price } = location.state || {};

    const handleSubmit = async (e) => {
        //await AddResev(Date, Name, Capacity, email, ContactNumber);
        e.preventDefault();
        if (!validate()) return;

        await AddOrder(productName, Quantity, Price, cusName, email, contactNumber);
    };

    const validate = () => {
        const allFieldsFilled = productName && Quantity && Price && cusName && email && contactNumber;

        //const errorElement = document.getElementById("Error");
        if (!allFieldsFilled) {
            setFormError("All fields must be filled."); // using React state for error message
            return false;
        } else {
            setFormError(""); // clear error message
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
                    id="productName"
                    name="productName"
                    className="form-control"
                    value={productname}
                    onChange={(e) => setproductName(e.target.value)}
                />

                <label className="form-label mt-3">Quantity:</label>
                <input
                    type="number"
                    className="form-control"
                    value={1}
                    onChange={(e) => setQuantity(e.target.value)}
                />
                <label className="form-label mt-3">Price:</label>
                <input
                    type="number"
                    className="form-control"
                    id="Price"
                    value={price}
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                />

                <label className="form-label mt-3">Enter Customer Name:</label>
                <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setcusName(e.target.value)}
                />



                <label className="form-label mt-3">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    onChange={(e) => setemail(e.target.value)}
                />

                <label className="form-label mt-3">Contact Number:</label>
                <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setcontactNumber(e.target.value)}
                />

                <button
                    type="submit"
                    className="btn btn-success m-4"
                    id="submit"
                    onClick={validate}
                >
                  Proceed to Checkout
                </button>

                {formError && <div id="Error" className="error">{formError}</div>}

                {/* {error && <div className="error">{error}</div>} */}
            </form>
        </div>
    );
}
export default AddNewOrder;
