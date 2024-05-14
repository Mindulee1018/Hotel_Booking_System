import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Inventorysidebar from '../../../components/InventoryManagerSideBar';

const AddItem = () => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [state, setState] = useState({
        itemID: "",
        itemName: "",
        description: "",
        unit_price: "",
        stockCount: "",
        reorderPoint: ""
    });

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validateValues(state);
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length === 0) {
            const data = { ...state };
            console.log(data);

            fetch('http://localhost:4000/roominventory/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            .then((response) => response.json())
            .then((data) => {
                alert('Item added to inventory');
                navigate("/RoomManagerView");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
    };

    const validateValues = (inputValues) => {
        let errors = {};
        if (inputValues.itemID.length < 3) {
            errors.itemID = "itemID is too short";
        }
        if (inputValues.itemName.trim() === "") {
            errors.itemName = "itemName is too short";
        }
        if (inputValues.description.trim() === "") {
            errors.description = "description is too short";
        }
        if (inputValues.unit_price.trim() === "") {
            errors.unit_price = "price is too short";
        }
        if (inputValues.stockCount.trim() === "") {
            errors.stockCount = "stockCount is too short";
        }
        if (inputValues.reorderPoint.trim() === "") {
            errors.reorderPoint = "reorderPoint is too short";
        }
        return errors;
    };

    return (
        <>
            <div class="row m-0 p-0">
                <Inventorysidebar/>
                <div class="container-fluid col">
                    <div class="row flex-nowrap">
                        <div class="col py-3">
                            <div class="mt-5 mb-5">
                                <h4>
                                    <span class="badge text-bg-secondary">
                                        Inventory Add
                                    </span>
                                </h4>
                            </div>

                            {/* table */}
                            <div class="row mb-5">
                                <div class="col">
                                    <label class="form-label">ItemID</label>
                                    <input
                                        type="text"
                                        name="itemID"
                                        className='form-control'
                                        placeholder="Enter itemID"
                                        value={state.itemID}
                                        onChange={handleChange}
                                    />
                                    {errors.itemID && (
                                        <div class="text-danger mt-2">
                                            ItemID should have 4 characters
                                        </div>
                                    )}
                                </div>
                                <div class="col-6">
                                    <label class="form-label">ItemName</label>
                                    <input
                                        type="text"
                                        name="itemName"
                                        className='form-control'
                                        placeholder="Enter itemName"
                                        value={state.itemName}
                                        onChange={handleChange}
                                    />
                                    {errors.itemName && (
                                        <div class="text-danger mt-2">
                                            ItemName can't be null
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div class="row mt-4">
                                <div class="col">
                                    <label class="form-label">description</label>
                                    <input
                                        type="text"
                                        name="description"
                                        className='form-control'
                                        placeholder="Enter the description"
                                        value={state.description}
                                        onChange={handleChange}
                                    />
                                    {errors.description && (
                                        <div class="text-danger mt-2">
                                            Description can't be null
                                        </div>
                                    )}
                                </div>
                                <div class="col">
                                    <label class="form-label">unit_price</label>
                                    <input
                                        type="text"
                                        name="unit_price"
                                        className='form-control'
                                        placeholder="Enter the unit price"
                                        value={state.unit_price}
                                        onChange={handleChange}
                                    />
                                    {errors.unit_price && (
                                        <div class="text-danger mt-2">
                                            Price can't be null
                                        </div>
                                    )}
                                </div>
                                <div class="col">
                                    <label class="form-label">Stock Count</label>
                                    <input
                                        type="text"
                                        name="stockCount"
                                        className='form-control'
                                        placeholder="Enter stockCount of the post"
                                        value={state.stockCount}
                                        onChange={handleChange}
                                    />
                                    {errors.stockCount && (
                                        <div class="text-danger mt-2">
                                            StockCount can't be null
                                        </div>
                                    )}
                                </div>
                                <div class="col">
                                    <label class="form-label">Reorder Point</label>
                                    <input
                                        type="text"
                                        name="reorderPoint"
                                        className='form-control'
                                        placeholder="Enter reorderPoint of the post"
                                        value={state.reorderPoint}
                                        onChange={handleChange}
                                    />
                                    {errors.reorderPoint && (
                                        <div class="text-danger mt-2">
                                            reorderPoint can't be null
                                        </div>
                                    )}
                                </div>
                            </div>
                            <button className='btn btn-success mt-5' type='submit' onClick={handleSubmit}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddItem;
