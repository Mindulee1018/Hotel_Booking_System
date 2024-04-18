import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Inventorysidebar from '../../../components/InventoryManagerSideBar';



export const EditItem = () => {
  const [inventory, setInventory] = useState([]);
  const navigate = useNavigate();
  const [state, setState] = useState({
    itemID: '',
    itemName: '',
    description: '',
    unit_price: '',
    stockCount: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const { itemID, itemName, description, unit_price, stockCount } = state;

    const data = {
      itemID,
      itemName,
      description,
      unit_price,
      stockCount,
    };


      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:4000/roominventory/');
          if (response.ok) {
            const data = await response.json();
            setInventory(data);
          } else {
            throw new Error('Failed to fetch data');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      fetchData();
  

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
