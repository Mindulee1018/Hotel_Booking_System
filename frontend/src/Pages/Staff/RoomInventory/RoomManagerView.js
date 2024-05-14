import React, { useEffect, useState } from 'react';
import Inventorysidebar from '../../../components/InventoryManagerSideBar';
import { useNavigate } from "react-router-dom";

const RoomManagerView = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState({});
  const navigate = useNavigate();

  //message
  const message = inventory.map((data, index) => {
    if(data.stockCount < data.reorderPoint ){ 
      return (
        <div class="alert alert-warning mb-5" role="alert">
          <span>item name:<b>{(index ? ', ' : '') + data.itemName}</b> is stockcount is low!</span>
        </div>
      )
      
    }
    return null;
  })


  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('http://localhost:4000/roominventory/');
        if (!response.ok) {
          throw new Error('Failed to fetch inventory data');
        }
        const data = await response.json();
        setInventory(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchInventory();
  }, []);

  const filter = inventory.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdate = (id) => {
    const selectedItem = inventory.find(item => item._id === id);
    if (selectedItem) {
      navigate(`/EditItem/${id}`, { state: { selectedItem } });
    } else {
      console.error("Item not found");
    }
  };

  const onDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/roominventory/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete inventory item');
      }
      alert('Deleted successfully');
      // Remove the deleted item from the inventory state
      setInventory(inventory.filter(item => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="row m-0 p-0">
        <Inventorysidebar/>
      
      <div className="container-fluid pt-5 col">
        <div className="row flex-nowrap">
          <div className="col py-3">
          <div><input
                type="search"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              /></div>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Item ID</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Unit_Price</th>
                  <th scope="col">Stock Count</th>
                  <th scope="col">Reorder Point</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {filter.map((item, index) => (
                  <tr key={index}>
                    <td>{item.itemID}</td>
                    <td>{item.itemName}</td>
                    <td>{item.description}</td>
                    <td>{item.unit_price}</td>
                    <td>{item.stockCount}</td>
                    <td>{item.reorderPoint}</td>
                    <td>
                        {item.stockCount < item.reorderPoint && (
                          <div class="alert alert-warning" role="alert">
                            Low stock count
                          </div>
                        )}
                      </td>
                    <td>
                      <div className="d-grid gap-2">
                        <button type="button" className="btn btn-success btn-sm" id={item.itemID} onClick={() => handleUpdate(item._id)}>
  
                            update
                          
                        </button>
                        <button type="button" className="btn btn-danger btn-sm" onClick={() => onDelete(item._id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="btn btn-primary">
              <a href="AddItem" style={{ textDecoration: 'none', color: 'white' }}>
                create new Item
              </a>
            </button>
          </div>
        </div>
      </div></div>
    </>
  );
};

export default RoomManagerView;