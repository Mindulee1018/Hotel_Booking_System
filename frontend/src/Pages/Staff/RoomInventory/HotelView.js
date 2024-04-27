import React, { useEffect, useState } from 'react';
import Inventorysidebar from '../../../components/InventoryManagerSideBar';


const HotelView = () => {
  const [inventory, setInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
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
  }, []);
  

  const filter = inventory.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="row m-0 p-0">
    <Inventorysidebar/>
      
      <div className="container-fluid col">
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
                    <td>{inventory.reorderPoint}</td>
                    {/*<td>
                      <div className="d-grid gap-2">
                        <button type="button" className="btn btn-success btn-sm">
                          <a href={`/pages/inventory/edit/${item._id}`} style={{ textDecoration: 'none', color: 'white' }}>
                            Update
                          </a>
                        </button>
                      </div>
                    </td>*/}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div></div>
    </>
  );
};

export default HotelView;
