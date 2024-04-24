import React, { useState, useEffect} from 'react';
import useBulkStockDisplay from '../../../hooks/Staff/KitchenInventory/useBulkStockDisplay';
import useDeleteBulkStock from '../../../hooks/Staff/KitchenInventory/useDeleteBulkStock';
import useUpdateBulkStock from '../../../hooks/Staff/KitchenInventory/useUpdateBulkStock';
import KitchenSidebar from '../../../components/KitchenSideBar';

function BulkStock () {
  const {BStockList, isLoading, error} = useBulkStockDisplay();
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
  const [bdescription, setBDescription] = useState("");
  const [searchkey,setsearchkey]=useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sort, setSort] = useState('');
  const [reorderNotification, setReorderNotification] = useState({});

  //display only unique categories in filter
  useEffect(() => {
    // Fetch unique categories when StockList changes
    const uniqueCategories = [...new Set(BStockList.map(BulkStock => BulkStock.category))];
    if (uniqueCategories.length > 0) {
      setFilterCategory(''); // Select the first category by default
    }
  }, [BStockList]);


  if (isLoading) {
      return <div className="alert alert-primary" role="alert">Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
    const handleDelete = async () => {
      await deleteBulkStock(nameToDelete);
     
      setNameToDelete("");
    };

    const getUpdateBulkStock = (BulkStock) => {
      setNameToUpdate(BulkStock._id);
      setBName(BulkStock.bname);
      setBCategory(BulkStock.bcategory);
      setBQuantity(BulkStock.bquantity);
      setBReorderLevel(BulkStock.breorderLevel);
      setBUnits(BulkStock.bunits);
      setBPrice(BulkStock.bprice);
      setBDescription(BulkStock.bdescription);
    };

    const updateDetails = async () => {
      await updateBulkStock(nameToUpdate,bname, bcategory,bquantity,breorderLevel,bunits, bprice,bdescription );
    };



    //search and filter
    const filteredStockList = BStockList.filter(BulkStock => {
      return(
        BulkStock.bname.toLowerCase().includes(searchkey.toLowerCase()) &&
        (!filterCategory || BulkStock.bcategory.toLowerCase() === filterCategory.toLowerCase())
      );
    }
    );
    // Sort data function
    const sortData = () => {
      const sortedList = [...filteredStockList];
      if (sort === 'priceAsc') {
        sortedList.sort((a, b) => a.bprice - b.bprice);
      } else if (sort === 'priceDesc') {
        sortedList.sort((a, b) => b.bprice - a.bprice);
      } else if (sort === 'quantityAsc') {
        sortedList.sort((a, b) => a.bquantity - b.bquantity);
      } else if (sort === 'quantityDesc') {
        sortedList.sort((a, b) => b.bquantity - a.bquantity);
      }
      else if (sort === 'newestCreated') {
        sortedList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sort === 'oldestCreated') {
        sortedList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (sort === 'newestUpdated') {
        sortedList.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
      } else if (sort === 'oldestUpdated') {
        sortedList.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
      }
      return sortedList;
    };
     //check reorder level
     const checkReorderLevel = (BulkStock) => {
      if (BulkStock.bquantity === BulkStock.breorderLevel && !reorderNotification[BulkStock._id]) {
        alert(`Alert: Quantity for ${BulkStock.bname} has reached its reorder level.`);
        // Set the notification sent flag to true for this item
        setReorderNotification((prev) => ({
          ...prev,
          [BulkStock._id]: true,
        }));
      }
    };

  
  
return (
<div className="row p-0">
      <KitchenSidebar/>
      <div className="col">
  <div>
    <h1 className="mb-4 mt-5">Bulk Inventory</h1>
    <a href="/AddBulkStock" className="btn btn-primary mb-5">
            Add New Bulk Stock
          </a>

     {/* Search Input  and filter*/}
     <div className="row justify-content-center mb-3">
        <div className="col-auto">
          <input
            type="text"
            placeholder="Search..."
            value={searchkey}
            onChange={(e) => setsearchkey(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-auto">
          <select
            className="form-select"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {BStockList.map(BulkStock => BulkStock.bcategory).filter((value, index, self) => self.indexOf(value) === index).map(bcategory => (
              <option key={bcategory} value={bcategory}>{bcategory}</option>
            ))}
          </select>
        </div>
        <div className="col-auto">
             <select
              className="form-select"
              value={sort}
              onChange={(e) => {
        setSort(e.target.value);
       }}
       >
     <option value="">Sort by...</option>
     <option value="priceAsc">Price Low to High</option>
     <option value="priceDesc">Price High to Low</option>
     <option value="quantityAsc">Quantity Low to High</option>
     <option value="quantityDesc">Quantity High to Low</option>
    </select>
      </div>
      <div className="col-auto">
            <select
              className="form-select"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
              }}
            >
              <option value="">Sort by date...</option>
              <option value="newestCreated">Newest to Oldest (Created)</option>
              <option value="oldestCreated">Oldest to Newest (Created)</option>
              <option value="newestUpdated">Newest to Oldest (Updated)</option>
              <option value="oldestUpdated">Oldest to Newest (Updated)</option>
            </select>
          </div>
      </div>
      

    <div className="d-flex align-items-center justify-content-around mb-3">
      <table className="table table-dark table-striped" style={{ width: "75rem" }}>
        <thead>
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
            Special Notes
          </th>
          <th className="border border-black" scope="col">
            Added Date and Time
          </th>
          <th className="border border-black" scope="col">
            Last Updated
          </th>
          <th></th>
          <th></th>
        </tr>
        </thead>

        
        {sortData().map((BulkStock) => {
          // Check reorder level for each item
          checkReorderLevel(BulkStock);
          return(
          <tbody key={BulkStock._id}>
            <tr>
              <td>
                {nameToUpdate === BulkStock._id ? (
                  <input
                    class="tabledit-input form-control input-sm"
                    type="text"
                    name="bname"
                    defaultValue={BulkStock.bname}
                    disabled=""
                    onChange={(e) => {
                      setBName(e.target.value);
                    }}
                  ></input>
                ) : (
                  <td>{BulkStock.bname}</td>
                )}
              </td>

              <td>
                {nameToUpdate === BulkStock._id ? (
                  <input
                    class="tabledit-input form-control input-sm"
                    type="text"
                    name="bcategory"
                    defaultValue={BulkStock.bcategory}
                    disabled=""
                    onChange={(e) => {
                      setBCategory(e.target.value);
                    }}
                  ></input>
                ) : (
                  <td>{BulkStock.bcategory}</td>
                )}
              </td>

              <td>
                {nameToUpdate === BulkStock._id ? (
                  <input
                    class="tabledit-input form-control input-sm"
                    type="number"
                    name="bquantity"
                    defaultValue={BulkStock.bquantity}
                    disabled=""
                    onChange={(e) => {
                      setBQuantity(e.target.value);
                    }}
                  ></input>
                ) : (
                  <td>{BulkStock.bquantity}</td>
                )}
              </td>
              <td>
                {nameToUpdate === BulkStock._id ? (
                  <input
                    class="tabledit-input form-control input-sm"
                    type="number"
                    name="bunits"
                    defaultValue={BulkStock.bunits}
                    disabled=""
                    onChange={(e) => {
                      setBUnits(e.target.value);
                    }}
                  ></input>
                ) : (
                  <td>{BulkStock.bunits}</td>
                )}
              </td>

              <td>
                {nameToUpdate === BulkStock._id ? (
                  <input
                    class="tabledit-input form-control input-sm"
                    type="number"
                    name="bprice"
                    defaultValue={BulkStock.bprice}
                    disabled=""
                    onChange={(e) => {
                      setBPrice(e.target.value);
                    }}
                  ></input>
                ) : (
                  <td>{BulkStock.bprice}</td>
                )}
              </td>

              <td>
                {nameToUpdate === BulkStock._id ? (
                  <input
                    class="tabledit-input form-control input-sm"
                    type="text"
                    name="description"
                    defaultValue={BulkStock.bdescription}
                    disabled=""
                    onChange={(e) => {
                      setBDescription(e.target.value);
                    }}
                  ></input>
                ) : (
                  <td>{BulkStock.bdescription}</td>
                )}
              </td>
              <td>{new Date(BulkStock.createdAt).toLocaleString()}</td>
              <td>{new Date(BulkStock.updatedAt).toLocaleString()}</td>

              <td>
                <a
                  href="#"
                  style={{ width: "5rem" }}
                  className="btn btn-outline-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#Modal"
                  onClick={() => setNameToDelete(BulkStock.bname)}
                >
                  DELETE
                </a>
              </td>

              <td>
                {nameToUpdate === BulkStock._id ? (
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
                    className="btn btn-outline-primary"
                    style={{ width: "5rem" }}
                    onClick={() => getUpdateBulkStock(BulkStock)}
                  >
                    Update
                  </a>
                )}
              </td>
            </tr>
          </tbody>
          )
})}
      </table>
    </div>
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

export default BulkStock;