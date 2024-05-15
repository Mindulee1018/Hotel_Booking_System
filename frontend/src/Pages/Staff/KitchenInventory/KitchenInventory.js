import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import useKitchenStockDisplay from '../../../hooks/Staff/KitchenInventory/useKitchenStockDisplay';
import useDeleteStock from '../../../hooks/Staff/KitchenInventory/useDeleteStock';
import useUpdateStock from '../../../hooks/Staff/KitchenInventory/useUpdateStock';
import KitchenSidebar from '../../../components/KitchenSideBar';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet,Image } from '@react-pdf/renderer';

import logo from '../../../Sunset Araliya horizontal.png';

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
    const [reorderNotification, setReorderNotification] = useState({});
    const [expiryNotification, setExpiryNotification] = useState({});
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

      //check reorder level
      const checkReorderLevel = (Stock) => {
        if (Stock.quantity <= Stock.reorderLevel && !reorderNotification[Stock._id]) {
          alert(`Alert: Quantity for ${Stock.name} has reached its reorder level.`);
          // Set the notification sent flag to true for this item
          setReorderNotification((prev) => ({
            ...prev,
            [Stock._id]: true,
          }));
        }
      };
      //check expiry date
      const checkExpiryDate = (Stock) => {
        const today = new Date();
        const expiry = new Date(Stock.expiryDate);
        const differenceInDays = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24)); // Calculate difference in days
      
        if (differenceInDays <= 2 && !expiryNotification[Stock._id]) { // Check if expiry is within 7 days
          alert(`Alert: ${Stock.name} is expiring soon. Only ${differenceInDays} days left.`);
          // Set the notification sent flag to true for this item
          setExpiryNotification((prev) => ({
            ...prev,
            [Stock._id]: true,
          }));
        }
      };

      const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#ffffff'
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        },
        heading: {
            fontSize: 15,
            marginBottom: 30,
            marginTop: 70,
            textAlign: 'center'
        },
        header: {
          position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            marginBottom: 20,
            backgroundColor: '#007bff',
            color: '#ffffff'
      },
      logo: {
        width: 100,
        height: 50
      },
        row: {
            flexDirection: 'row',
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
            padding: 5
        },
        cell: {
            width: '20%',
            textAlign: 'center',
            fontSize: 10
        },
        footer: {
          position: 'absolute',
          bottom: 30,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 8 // Adjust font size for the footer
      }
    });

    const MyDocument = (
        <Document>
            <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                    <Image src={logo} style={styles.logo} />
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading}>Fresh Produce Report</Text>
                    <View style={styles.row}>
                        <Text style={styles.cell}>Product Name</Text>
                        <Text style={styles.cell}>Product Category</Text>
                        <Text style={styles.cell}>Quantity Available</Text>
                        <Text style={styles.cell}>Latest Purchased Price At</Text>
                        <Text style={styles.cell}>Special Notes</Text>
                        <Text style={styles.cell}>Added Date and Time</Text>
                        <Text style={styles.cell}>Last Updated</Text>
                    </View>
                    {sortData(filteredStockList).map(stock => (
                        <View style={styles.row} key={stock._id}>
                            <Text style={styles.cell}>{stock.name}</Text>
                            <Text style={styles.cell}>{stock.category}</Text>
                            <Text style={styles.cell}>{stock.quantity}</Text>
                            <Text style={styles.cell}>{stock.price}</Text>
                            <Text style={styles.cell}>{stock.description}</Text>
                            <Text style={styles.cell}>{new Date(stock.createdAt).toLocaleString()}</Text>
                            <Text style={styles.cell}>{new Date(stock.updatedAt).toLocaleString()}</Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.footer}>
                    Downloaded: {new Date().toLocaleString()}
                </Text>
            </Page>
        </Document>
    );



    
    
return (
  <div className="row p-0">
            <KitchenSidebar/>
            <div className="col">
    <div>
      <h1 className="mb-4 mt-5">Kitchen Inventory</h1>
      <PDFDownloadLink document={MyDocument} fileName="inventory_report.pdf"className="btn btn-primary mb-5"style={{marginRight:"2rem"}}>
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download PDF'
                        }
                    </PDFDownloadLink>
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
            checkReorderLevel(Stock);
            checkExpiryDate(Stock);
            
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

 