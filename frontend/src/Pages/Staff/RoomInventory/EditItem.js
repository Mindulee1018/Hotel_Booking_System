import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Inventorysidebar from '../../../components/InventoryManagerSideBar';


export const EditItem = () => {
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();
  const errors =useState();
  const { id } = useParams();
  const [state, setState] = useState({
    itemID: '',
    itemName: '',
    description: '',
    unit_price: '',
    stockCount: '',
    reorderPoint: ''
  });

  {/*const validateValues = (inputValues) => {
    let errors = {};
    if (inputValues.itemID.length < 3) {
      errors.itemNo = "itemID is too short";
    }
    if (inputValues.itemName.length < 1) {
      errors.itemName = "itemName is too short";
    }
    if (inputValues.description.length < 1) {
      errors.color = "Description is too short";
    }
    if (inputValues.unit_price.length < 1) {
      errors.price = "price is too short";
    }
    if (inputValues.stockCount.length < 1) {
      errors.stockCount = "stockCount is too short";
    }
    if (inputValues.reorderPoint.length < 1) {
      errors.reorderPoint = "reorderPoint is too short";
    }
    return errors
  };*/}

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  useEffect(()=>{
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
  },[])

  const onSubmit = async (e) => {
    e.preventDefault();

    const { itemID, itemName, description, unit_price, stockCount } = state;

    const data = {
      itemID,
      itemName,
      description,
      unit_price,
      stockCount,
      // reorderPoint
    };

    
      
  

    try {
      const response = await fetch(`http://localhost:4000/RoomRestock/update/${itemID}`, {
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
                <div class="text-danger mt-2">
                    ItemID should have 4 characters
                </div>)}
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
                <div class="text-danger mt-2">
                    ItemName can't be null
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
                <div class="text-danger mt-2">
                    Description can't be null
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
                <div class="text-danger mt-2">
                    Unit Price can't be null
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
              <button className="btn btn-success mt-5" type="submit" onClick={onSubmit}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div></div>
    </>
  );
};

export default EditItem;