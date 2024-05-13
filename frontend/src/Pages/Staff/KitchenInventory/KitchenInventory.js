import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import useKitchenStockDisplay from '../../../hooks/Staff/KitchenInventory/useKitchenStockDisplay';
import useDeleteStock from '../../../hooks/Staff/KitchenInventory/useDeleteStock';
import useUpdateStock from '../../../hooks/Staff/KitchenInventory/useUpdateStock';
import KitchenSidebar from '../../../components/KitchenSideBar';

function KitchenInventory () {
    const {StockList, isLoading, error} = useKitchenStockDisplay();
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
    const [searchkey,setsearchkey]=useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [sort, setSort] = useState('');

    //display only unique categories in filter
    useEffect(() => {
      // Fetch unique categories when StockList changes
      const uniqueCategories = [...new Set(StockList.map(Stock => Stock.category))];
      if (uniqueCategories.length > 0) {
        setFilterCategory(''); // Select the first category by default
      }
    }, [StockList]);


    if (isLoading) {
        return <div className="alert alert-primary" role="alert">Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error}</div>;
      }
      const handleDelete = async () => {
        await deleteStock(nameToDelete);
       
        setNameToDelete("");
      };

      const getUpdateStock = (Stock) => {
        setNameToUpdate(Stock._id);
        setName(Stock.name);
        setCategory(Stock.category);
        setQuantity(Stock.quantity);
        setReorderLevel(Stock.reorderLevel);
        setPrice(Stock.price);
        setExpiryDate(Stock.expiryDate);
        setDescription(Stock.description);
      };

      const updateDetails = async () => {
        await updateStock(nameToUpdate,name, category,quantity,reorderLevel, price,expiryDate,description );
      };

      const aggregatedStockList = {};
    StockList.forEach(Stock => {
      const key = Stock.name.toLowerCase(); // Assuming bname identifies duplicate entries
      if (!aggregatedStockList[key]) {
        aggregatedStockList[key] = { ...Stock };
      } else {
        // Sum quantities for duplicates
        aggregatedStockList[key].quantity += Stock.quantity;
        
     // Update price and description for latest duplicate
     if (new Date(aggregatedStockList[key].createdAt) < new Date(Stock.createdAt)) {
      aggregatedStockList[key].price = Stock.price;
      aggregatedStockList[key].description = Stock.description;
    }
  }
});

  

      //search and filter
      const filteredStockList = Object.values(aggregatedStockList).filter(Stock => (
        
          Stock.name.toLowerCase().includes(searchkey.toLowerCase()) &&
          (!filterCategory || Stock.category.toLowerCase() === filterCategory.toLowerCase())
      )
        );
      
      
      // Sort data function
      const sortData = () => {
        const sortedList = [...filteredStockList];
        if (sort === 'priceAsc') {
          sortedList.sort((a, b) => a.price - b.price);
        } else if (sort === 'priceDesc') {
          sortedList.sort((a, b) => b.price - a.price);
        } else if (sort === 'quantityAsc') {
          sortedList.sort((a, b) => a.quantity - b.quantity);
        } else if (sort === 'quantityDesc') {
          sortedList.sort((a, b) => b.quantity - a.quantity);
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



    
    
return (
  <div className="row p-0">
            <KitchenSidebar/>
            <div className="col">
    <div>
      <h1 className="mb-4 mt-5">Kitchen Inventory</h1>
      <a href="/AddStock" className="btn btn-primary mb-5">
              Add New Stock
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
              {StockList.map(Stock => Stock.category).filter((value, index, self) => self.indexOf(value) === index).map(category => (
                <option key={category} value={category}>{category}</option>
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
        <table className="table" style={{ width: "75rem" }}>
          <tr>
            <th className="border border-black" scope="col">
              Product Name
            </th>
            <th className="border border-black" scope="col">
              Product Category
            </th>
            <th className="border border-black" scope="col">
              Quantity Available
            </th>
            <th className="border border-black" scope="col">
              Latest Purchased Price At
            </th>
            <th className="border border-black" scope="col">
              SpeciaNotes
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

          
          {sortData(filteredStockList).map((Stock) => {
            // Check reorder level for each item
            
            return(
            
            <tbody key={Stock._id}>
              <tr>
                <td>
                  {nameToUpdate === Stock._id ? (
                    <input
                      class="tabledit-input form-control input-sm"
                      type="text"
                      name="name"
                      defaultValue={Stock.name}
                      disabled=""
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                    ></input>
                  ) : (
                    <td><Link to={`/kitchenStock/${Stock.name}`} className="invisible-link-button">{Stock.name}</Link></td>
                  )}
                </td>

                <td>
                  {nameToUpdate === Stock._id ? (
                    <input
                      class="tabledit-input form-control input-sm"
                      type="text"
                      name="category"
                      defaultValue={Stock.category}
                      disabled=""
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    ></input>
                  ) : (
                    <td>{Stock.category}</td>
                  )}
                </td>

                <td>
                  {nameToUpdate === Stock._id ? (
                    <input
                      class="tabledit-input form-control input-sm"
                      type="number"
                      name="quantity"
                      defaultValue={Stock.quantity}
                      disabled=""
                      onChange={(e) => {
                        setQuantity(e.target.value);
                      }}
                    ></input>
                  ) : (
                    <td>{Stock.quantity}</td>
                  )}
                </td>

                <td>
                  {nameToUpdate === Stock._id ? (
                    <input
                      class="tabledit-input form-control input-sm"
                      type="number"
                      name="price"
                      defaultValue={Stock.price}
                      disabled=""
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    ></input>
                  ) : (
                    <td>{Stock.price}</td>
                  )}
                </td>

                <td>
                  {nameToUpdate === Stock._id ? (
                    <input
                      class="tabledit-input form-control input-sm"
                      type="text"
                      name="description"
                      defaultValue={Stock.description}
                      disabled=""
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                    ></input>
                  ) : (
                    <td>{Stock.description}</td>
                  )}
                </td>
                <td>{new Date(Stock.createdAt).toLocaleString()}</td>
                <td>{new Date(Stock.updatedAt).toLocaleString()}</td>


               
              </tr>
            </tbody>
            )
})}
        </table>
      </div>
    </div>
    </div>
  </div>
);

}

export default KitchenInventory;

 