import React, { useEffect, useState } from 'react';
import { useNavigate, useParams,useLocation } from 'react-router-dom';
import Inventorysidebar from '../../../components/InventoryManagerSideBar';

export const EditItem = () => {
  const [inventory, setInventory] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [state, setState] = useState({
    itemID: '',
    itemName: '',
    description: '',
    unit_price: '',
    stockCount: '',
    reorderPoint: ''
  });

  const validateValues = (inputValues) => {
    let errors = {};
    if (!inputValues) {
      return errors; // Return empty errors object if inputValues is undefined
    }
    if (inputValues && inputValues.itemID && inputValues.itemID.length < 3) {
      errors.itemID = "itemID is too short";
    }
    if (inputValues && inputValues.itemName && inputValues.itemName.length < 1) {
      errors.itemName = "itemName is too short";
    }
    if (!inputValues.description || !inputValues.description.length || inputValues.description.length < 1) {
      errors.description = "Description is too short";
    }
  
    if (!inputValues.unit_price || inputValues.unit_price.length < 1) {
      errors.unit_price = "Price is too short";
    }
    if (!inputValues.stockCount || inputValues.stockCount.length < 1) {
      errors.stockCount = "Stock count is too short";
    }
    if (!inputValues.reorderPoint || inputValues.reorderPoint.length < 1) {
      errors.reorderPoint = "Reorder point is too short";
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

 {/* useEffect(()=>{
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/roominventory/${id}`);
        if (response.ok) {
          const data = await response.json();
          setInventory(data);
          console.log(state)
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  },[id]);*/}

  useEffect(() => {
    if (location.state && location.state.selectedItem) {
      const selectedItem = location.state.selectedItem;
      setState({
        itemID: selectedItem.itemID,
        itemName: selectedItem.itemName,
        description: selectedItem.description,
        unit_price: selectedItem.unit_price,
        stockCount: selectedItem.stockCount,
        reorderPoint: selectedItem.reorderPoint
      });
    } else {
      // Handle case when no item is passed
      console.error("No item data found");
    }
  }, [location.state]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("Save button clicked"); 

    console.log("Item ID:", state.itemID);


    const validationErrors = validateValues(state);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const { itemID, itemName, description, unit_price, stockCount, reorderPoint } = state; // eslint-disable-line


      const data = {
        itemID,
        itemName,
        description,
        unit_price,
        stockCount,
        reorderPoint
      };

      try {
        const response = await fetch(`http://localhost:4000/roominventory/update/${itemID}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          alert('Data submitted successfully');
          navigate(-1);
        } else {
          throw new Error('Failed to update data');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <>
      <div className="row m-0 p-0">
       <Inventorysidebar/>
      
      <div className="container-fluid col">
        <div className="row flex-nowrap">
          <div className="col py-3">
            <div className="mt-5 mb-5 ">
              <h4>
                <span className="badge text-bg-secondary">Inventory Edit</span>
              </h4>
            </div>

            <div className="row mb-5">
              <div className="col">
                <label className="form-label">ItemNo</label>
                <input
                  type="text"
                  name="itemID"
                  className="form-control"
                  placeholder="Enter itemID"
                  value={state.itemID}
                  onChange={handleChange}
                /> 
                {errors.itemID && (
                  <div className="text-danger mt-2">
                    {errors.itemID}
                  </div>
                )}
              </div>
              <div className="col-6">
                <label className="form-label">ItemName</label>
                <input
                  type="text"
                  name="itemName"
                  className="form-control"
                  placeholder="Enter itemName"
                  value={state.itemName}
                  onChange={handleChange}
                />
                {errors.itemName && (
                  <div className="text-danger mt-2">
                    {errors.itemName}
                  </div>
                )}
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <label className="form-label">description</label>
                <input
                  type="text"
                  name="description"
                  className="form-control"
                  placeholder="Enter description"
                  value={state.description}
                  onChange={handleChange}
                />
                {errors.description && (
                  <div className="text-danger mt-2">
                    {errors.description}
                  </div>
                )}
              </div>
              <div className="col">
                <label className="form-label">Unit_Price</label>
                <input
                  type="text"
                  name="unit_price"
                  className="form-control"
                  placeholder="Enter unit_price"
                  value={state.unit_price}
                  onChange={handleChange}
                />
                {errors.unit_price && (
                  <div className="text-danger mt-2">
                    {errors.unit_price}
                  </div>
                )}
              </div>
              <div className="col">
                <label className="form-label">Stock Count</label>
                <input
                  type="text"
                  name="stockCount"
                  className="form-control"
                  placeholder="Enter stockCount of the post"
                  value={state.stockCount}
                  onChange={handleChange}
                />
                {errors.stockCount && (
                  <div className="text-danger mt-2">
                    {errors.stockCount}
                  </div>
                )}
              </div>
              <div className="col">
                <label className="form-label">Reorder Point</label>
                <input
                  type="text"
                  name="reorderPoint"
                  className="form-control"
                  placeholder="Enter reorderPoint of the post"
                  value={state.reorderPoint}
                  onChange={handleChange}
                />
                {errors.reorderPoint && (
                  <div className="text-danger mt-2">
                    {errors.reorderPoint}
                  </div>
                )}
              </div>
            </div>
            <button className="btn btn-success mt-5" type="submit" onClick={onSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default EditItem;
