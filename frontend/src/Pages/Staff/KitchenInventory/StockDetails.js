
import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useStockDetails from '../../../hooks/Staff/KitchenInventory/useStockDetails';
import useDeleteStock from '../../../hooks/Staff/KitchenInventory/useDeleteStock';
import useUpdateStock from '../../../hooks/Staff/KitchenInventory/useUpdateStock';
import KitchenSidebar from '../../../components/KitchenSideBar';

function StockDetails() {
    const { stockName } = useParams();
    const { stockDetails, isLoading, error } = useStockDetails(stockName);
    const { deleteStock } = useDeleteStock();
    const { updateStock } = useUpdateStock();
    const [nameToDelete, setNameToDelete] = useState("");
    const [nameToUpdate, setNameToUpdate] = useState("");
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [reorderLevel, setReorderLevel] = useState('');
    const [price, setPrice] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [description, setDescription] = useState("");
    const [reorderNotification, setReorderNotification] = useState({});
    const [expiryNotification, setExpiryNotification] = useState({});
    const [sortOrder, setSortOrder] = useState('asc');


    // Helper to format the date to YYYY-MM-DD
    const formatDate = (date) => {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = ('0' + (d.getMonth() + 1)).slice(-2); // months are 0-indexed
      const day = ('0' + d.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    };

    // Sort stockDetails based on expiry date
    const sortStockByExpiry = (order) => {
      const sortedStock = [...stockDetails].sort((a, b) => {
          const dateA = new Date(a.expiryDate);
          const dateB = new Date(b.expiryDate);
          return order === 'asc' ? dateA - dateB : dateB - dateA;
      });
      return sortedStock;
  };
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!stockDetails) {
      return <div>No stock details available</div>;
  }
// Update stockDetails when sortOrder changes
const sortedStockDetails = sortStockByExpiry(sortOrder);
    const handleDelete = async () => {
        await deleteStock(nameToDelete);

        setNameToDelete("");
       
      };
      const getUpdateStock = (stock) => {
        setNameToUpdate(stock._id);
        setName(stock.name);
        setCategory(stock.category);
        setQuantity(stock.quantity);
        setReorderLevel(stock.reorderLevel);
        setPrice(stock.price);
        setExpiryDate(stock.expiryDate);
        setDescription(stock.description);
      };

      const updateDetails = async () => {
        await updateStock(nameToUpdate,name, category,quantity,reorderLevel, price,expiryDate,description );
      };

      //check reorder level
      const checkReorderLevel = (stock) => {
        if (stock.quantity <= stock.reorderLevel && !reorderNotification[stock._id]) {
          alert(`Alert: Quantity for ${stock.name} has reached its reorder level.`);
          // Set the notification sent flag to true for this item
          setReorderNotification((prev) => ({
            ...prev,
            [stock._id]: true,
          }));
        }
      };
      //check expiry date
      const checkExpiryDate = (stock) => {
        const today = new Date();
        const expiry = new Date(stock.expiryDate);
        const differenceInDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24)); // Calculate difference in days
      
        if (differenceInDays <= 2 && !expiryNotification[stock._id]) { // Check if expiry is within 7 days
          alert(`Alert: ${stock.name} is expiring soon. Only ${differenceInDays} days left.`);
          // Set the notification sent flag to true for this item
          setExpiryNotification((prev) => ({
            ...prev,
            [stock._id]: true,
          }));
        }
      };

   
    



return (
  <div className="row p-0">
      <KitchenSidebar/>
      <div className="col">
  <div>
      <h1 className="mb-4 mt-5">Stock Details for {stockName}</h1>
      <div className="d-flex align-items-center justify-content-around mb-3">
        <div className="col-auto">
            <select className="form-select" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                <option value="">Sort by...</option>
                <option value="asc">Expiring First</option>
                <option value="desc">Expiring Last</option>
            </select>
        </div>
    </div>
      {stockDetails && stockDetails.length > 0 ? (
          <div className="d-flex align-items-center justify-content-around mb-3">
          <table className="table"style={{ width: "75rem" }}>
              <tr>
                  <th className="border border-black" scope="col">
                      Name</th>
                  <th className="border border-black" scope="col">
                      Category</th>
                  <th className="border border-black" scope="col">
                      Quantity
                  </th>
                  <th className="border border-black" scope="col">
                      Price
                  </th>
                  <th className="border border-black" scope="col">
                      Expiry Date
                  </th>
                  <th className="border border-black" scope="col">
                      Description
                  </th>
                  <th></th>
                  <th></th>
              </tr>
        <tbody>
            {sortedStockDetails.map((stock, index) => {
        checkReorderLevel(stock);
        checkExpiryDate(stock);
        return(
          <tr key={index}>
    <td>
      {nameToUpdate === stock._id ? (
        <input
          class="tabledit-input form-control input-sm"
          type="text"
          name="category"
          defaultValue={stock.name}
          disabled=""
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        ></input>
      ) : (
        <td>{stock.name}</td>
      )}
    </td>
    <td>
      {nameToUpdate === stock._id ? (
        <input
          class="tabledit-input form-control input-sm"
          type="text"
          name="category"
          defaultValue={stock.category}
          disabled=""
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        ></input>
      ) : (
        <td>{stock.category}</td>
      )}
    </td>
    <td>
      {nameToUpdate === stock._id ? (
        <input
          class="tabledit-input form-control input-sm"
          type="number"
          name="quantity"
          defaultValue={stock.quantity}
          disabled=""
          onChange={(e) => {
            setQuantity(e.target.value);
          }}
        ></input>
      ) : (
        <td>{stock.quantity}</td>
      )}
    </td>
    <td>
      {nameToUpdate === stock._id ? (
        <input
          class="tabledit-input form-control input-sm"
          type="number"
          name="price"
          defaultValue={stock.price}
          disabled=""
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        ></input>
      ) : (
        <td>{stock.price}</td>
      )}
    </td>
        <td>{formatDate(stock.expiryDate)}</td>
    <td>
      {nameToUpdate === stock._id ? (
        <input
          class="tabledit-input form-control input-sm"
          type="text"
          name="description"
          defaultValue={stock.description}
          disabled=""
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></input>
      ) : (
        <td>{stock.description}</td>
      )}
    </td>

    <td>
            <a
              href="#"
              className="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#Modal"
              onClick={() => setNameToDelete(stock.name)}
      >
        DELETE
      </a>
    </td>
    <td>
      {nameToUpdate === stock._id ? (
        <a
          href="#"
          className="btn btn-primary"
          onClick={() => updateDetails()}
        >
          Save
        </a>
      ) : (
        <a
          href="#"
          className="btn btn-primary"
          onClick={() => getUpdateStock(stock)}
        >
          Update
        </a>
      )}
    </td>
                </tr>
        )
})}
                    </tbody>
                </table>
                </div>
            ) : (
                <div>No product details available</div>
            )}
        </div>
         {/* model  */}
    <div
      className="modal fade"
      id="Modal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              CAUTION
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>

            <form action="" method="delete">
              <button
                className="btn btn-outline-danger"
                onClick={handleDelete}
              >
                DELETE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    
        </div>
        </div>
        
    );
}

export default StockDetails;