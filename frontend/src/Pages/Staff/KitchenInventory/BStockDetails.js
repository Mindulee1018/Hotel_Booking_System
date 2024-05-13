import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import useBStockDetails from '../../../hooks/Staff/KitchenInventory/useBStockDetails';
import useDeleteBulkStock from '../../../hooks/Staff/KitchenInventory/useDeleteBulkStock';
import useUpdateBulkStock from '../../../hooks/Staff/KitchenInventory/useUpdateBulkStock';
import KitchenSidebar from '../../../components/KitchenSideBar';

function BStockDetails() {
    const { bstockName } = useParams();
    const { bstockDetails, isLoading, error } = useBStockDetails(bstockName);
    const { deleteBulkStock } = useDeleteBulkStock();
    const { updateBulkStock } = useUpdateBulkStock();
    const [nameToDelete, setNameToDelete] = useState("");
    const [nameToUpdate, setNameToUpdate] = useState("");
    const [bname, setBName] = useState("");
    const [bcategory, setBCategory] = useState("");
    const [bquantity, setBQuantity] = useState("");
    const [breorderLevel, setBReorderLevel] = useState('');
    const [bunits, setBUnits] = useState("");
    const [bprice, setBPrice] = useState("");
    const [bexpiryDate, setBExpiryDate] = useState("");
    const [bdescription, setBDescription] = useState("");
    const [reorderNotification, setReorderNotification] = useState({});



    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleDelete = async () => {
        await deleteBulkStock(nameToDelete);
       
        setNameToDelete("");
      };

      const getUpdateBulkStock = (bstock) => {
      setNameToUpdate(bstock._id);
      setBName(bstock.bname);
      setBCategory(bstock.bcategory);
      setBQuantity(bstock.bquantity);
      setBReorderLevel(bstock.breorderLevel);
      setBUnits(bstock.bunits);
      setBPrice(bstock.bprice);
      setBExpiryDate(bstock.bexpiryDate);
      setBDescription(bstock.bdescription);
    };

    const updateDetails = async () => {
      await updateBulkStock(nameToUpdate,bname, bcategory,bquantity,breorderLevel,bunits, bprice,bexpiryDate,bdescription );
    };

      //check reorder level
      const checkReorderLevel = (bstock) => {
        if (bstock.bquantity === bstock.breorderLevel && !reorderNotification[bstock._id]) {
          alert(`Alert: Quantity for ${bstock.bname} has reached its reorder level.`);
          // Set the notification sent flag to true for this item
          setReorderNotification((prev) => ({
            ...prev,
            [bstock._id]: true,
          }));
        }
      };

   
    



    return (
        <div className="row p-0">
            <KitchenSidebar/>
            <div className="col">
        <div>
            <h1 className="mb-4 mt-5">Stock Details for {bstockName}</h1>
            {bstockDetails && bstockDetails.length > 0 ? (
                <div className="d-flex align-items-center justify-content-around mb-3">
                <table className="table"style={{ width: "75rem" }}>
                        <tr>
                        <th className="border border-black" scope="col">
            Product Name
          </th>
          <th className="border border-black" scope="col">
            Product Category
          </th>
          <th className="border border-black" scope="col">
            Quantity 
          </th>
          <th className="border border-black" scope="col">
            No of units available
          </th>
          <th className="border border-black" scope="col">
            Latest Purchased Price At per unit
          </th>
          <th className="border border-black" scope="col">
            Expiry Date
          </th>
          <th className="border border-black" scope="col">
            Special Notes
          </th>
                            <th></th>
                            <th></th>
                        </tr>
                    <tbody>
                        {bstockDetails.map((bstock, index) => {
                    checkReorderLevel(bstock);
                    return(
                     <tr key={index}>
                <td>
                  {nameToUpdate === bstock._id ? (
                    <input
                      class="tabledit-input form-control input-sm"
                      type="text"
                      name="category"
                      defaultValue={bstock.bname}
                      disabled=""
                      onChange={(e) => {
                        setBCategory(e.target.value);
                      }}
                    ></input>
                  ) : (
                    <td>{bstock.bname}</td>
                  )}
                </td>
                <td>
                  {nameToUpdate === bstock._id ? (
                    <input
                      class="tabledit-input form-control input-sm"
                      type="text"
                      name="category"
                      defaultValue={bstock.bcategory}
                      disabled=""
                      onChange={(e) => {
                        setBCategory(e.target.value);
                      }}
                    ></input>
                  ) : (
                    <td>{bstock.bcategory}</td>
                  )}
                </td>
                <td>
                  {nameToUpdate === bstock._id ? (
                    <input
                      class="tabledit-input form-control input-sm"
                      type="number"
                      name="quantity"
                      defaultValue={bstock.bquantity}
                      disabled=""
                      onChange={(e) => {
                        setBQuantity(e.target.value);
                      }}
                    ></input>
                  ) : (
                    <td>{bstock.bquantity}</td>
                  )}
                </td>
                <td>
                  {nameToUpdate === bstock._id ? (
                    <input
                      class="tabledit-input form-control input-sm"
                      type="number"
                      name="units"
                      defaultValue={bstock.bunits}
                      disabled=""
                      onChange={(e) => {
                        setBUnits(e.target.value);
                      }}
                    ></input>
                  ) : (
                    <td>{bstock.bunits}</td>
                  )}
                </td>
                <td>
                  {nameToUpdate === bstock._id ? (
                    <input
                      class="tabledit-input form-control input-sm"
                      type="number"
                      name="price"
                      defaultValue={bstock.bprice}
                      disabled=""
                      onChange={(e) => {
                        setBPrice(e.target.value);
                      }}
                    ></input>
                  ) : (
                    <td>{bstock.bprice}</td>
                  )}
                </td>
                                <td>{bstock.bexpiryDate}</td>
                                <td>
                  {nameToUpdate === bstock._id ? (
                    <input
                      class="tabledit-input form-control input-sm"
                      type="text"
                      name="description"
                      defaultValue={bstock.bdescription}
                      disabled=""
                      onChange={(e) => {
                        setBDescription(e.target.value);
                      }}
                    ></input>
                  ) : (
                    <td>{bstock.bdescription}</td>
                  )}
                </td>

                <td>
                       <a
                         href="#"
                         className="btn btn-danger"
                         data-bs-toggle="modal"
                         data-bs-target="#Modal"
                         onClick={() => setNameToDelete(bstock.bname)}
                  >
                    DELETE
                  </a>
                </td>
                <td>
                  {nameToUpdate === bstock._id ? (
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
                      onClick={() => getUpdateBulkStock(bstock)}
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

export default BStockDetails;