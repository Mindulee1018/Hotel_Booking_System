import React, { useEffect, useState } from 'react'
import Header from '../../component/Header';
import axios from 'axios';

const View = () => {
  const [state, setState] = useState({
    inventory: []
  })

    useEffect(() => {
        axios.get("http://localhost:8000/inventory/").then(res =>{
            if(res.data){
              setState({
                inventory:res.data
              })
            }
        })
    }, [state]);
  return (
    <>
      {/*<div class="col">
          <Header dashboard={"Inventory Management System"} />
  </div>*/}
      <div class="container-fluid">
        <div class="row flex-nowrap">
          <div class="col py-3">
           
            {/* details */}
            <table class="table table-striped">
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
                    </td>
                    </tr>
                ))}
                </tbody>
                </table>
            </div>
        </div>
      </div>
    </>
  )
}

export default View