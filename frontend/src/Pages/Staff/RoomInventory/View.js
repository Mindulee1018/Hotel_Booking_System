import React, { useEffect, useState } from 'react';
import Header from '../../component/Header';

const View = () => {
  const [state, setState] = useState({
    inventory: [],
  });

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("http://localhost:8000/inventory/");
        
        if (!response.ok) {
          throw new Error('Error fetching inventory: ${response.statusText}');
        }

        const data = await response.json();
        
        setState({
          inventory: data,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchInventory();
  }, []); 

  return (
    <>
      {/*<div class="col">
          <Header dashboard={"Inventory Management System"} />
      </div>*/}
      <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col py-3">
            {/* Inventory Table */}
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">Item ID</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Unit Price</th>
                  <th scope="col">Stock Count</th>
                </tr>
              </thead>
              <tbody>
                {state.inventory.map((inventory, index) => (
                  <tr key={index}>
                    <td>{inventory.itemID}</td>
                    <td>{inventory.itemName}</td>
                    <td>{inventory.description}</td>
                    <td>{inventory.unit_price}</td>
                    <td>{inventory.stockCount}</td>
                    <td>
                      {/* Placeholder for additional operations */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default View;