import React, { useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import useBulkStockDisplay from '../../../hooks/Staff/KitchenInventory/useBulkStockDisplay';
import useDeleteBulkStock from '../../../hooks/Staff/KitchenInventory/useDeleteBulkStock';
import useUpdateBulkStock from '../../../hooks/Staff/KitchenInventory/useUpdateBulkStock';
import KitchenSidebar from '../../../components/KitchenSideBar';
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet,Image } from '@react-pdf/renderer';

import logo from '../../../Sunset Araliya horizontal.png';


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
  const [bexpiryDate, setBExpiryDate] = useState("");
  const [bdescription, setBDescription] = useState("");
  const [searchkey,setsearchkey]=useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sort, setSort] = useState('');


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
      setBExpiryDate(BulkStock.bexpiryDate);
      setBDescription(BulkStock.bdescription);
    };

    const updateDetails = async () => {
      await updateBulkStock(nameToUpdate,bname, bcategory,bquantity,breorderLevel,bunits, bprice,bexpiryDate,bdescription );
    };

    const aggregatedStockList = {};
    BStockList.forEach(BulkStock => {
      const key = BulkStock.bname.toLowerCase(); // Assuming bname identifies duplicate entries
      if (!aggregatedStockList[key]) {
        aggregatedStockList[key] = { ...BulkStock };
      } else {
        // Sum quantities for duplicates
        aggregatedStockList[key].bquantity += BulkStock.bquantity;
        aggregatedStockList[key].bunits += BulkStock.bunits;
     // Update price and description for latest duplicate
     if (new Date(aggregatedStockList[key].createdAt) < new Date(BulkStock.createdAt)) {
      aggregatedStockList[key].bprice = BulkStock.bprice;
      aggregatedStockList[key].bdescription = BulkStock.bdescription;
    }
  }
});

    //search and filter
    const filteredStockList = Object.values(aggregatedStockList).filter(BulkStock => (
      
        BulkStock.bname.toLowerCase().includes(searchkey.toLowerCase()) &&
        (!filterCategory || BulkStock.bcategory.toLowerCase() === filterCategory.toLowerCase())
      
    )
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
          fontSize: 20,
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
                  <Text style={styles.heading}>Bulk Stock Report</Text>
                  <View style={styles.row}>
                      <Text style={styles.cell}>Product Name</Text>
                      <Text style={styles.cell}>Product Category</Text>
                      <Text style={styles.cell}>Quantity Available</Text>
                      <Text style={styles.cell}>No of units available </Text>
                      <Text style={styles.cell}>Latest Purchased Price At</Text>
                      <Text style={styles.cell}>Special Notes</Text>
                      <Text style={styles.cell}>Added Date and Time</Text>
                      <Text style={styles.cell}>Last Updated</Text>
                  </View>
                  {sortData(filteredStockList).map(bstock => (
                      <View style={styles.row} key={bstock._id}>
                          <Text style={styles.cell}>{bstock.bname}</Text>
                          <Text style={styles.cell}>{bstock.bcategory}</Text>
                          <Text style={styles.cell}>{bstock.bquantity}</Text>
                          <Text style={styles.cell}>{bstock.bunits}</Text>
                          <Text style={styles.cell}>{bstock.bprice}</Text>
                          <Text style={styles.cell}>{bstock.bdescription}</Text>
                          <Text style={styles.cell}>{new Date(bstock.createdAt).toLocaleString()}</Text>
                          <Text style={styles.cell}>{new Date(bstock.updatedAt).toLocaleString()}</Text>
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
    <h1 className="mb-4 mt-5">Bulk Inventory</h1>
    <PDFDownloadLink document={MyDocument} fileName="inventory_report.pdf"className="btn btn-primary mb-5"style={{marginRight:"2rem"}}>
                        {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download PDF'
                        }
                    </PDFDownloadLink>
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
            {[...new Set(filteredStockList.map(BulkStock => BulkStock.bcategory))].map(bcategory => (
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
      <table className="table" style={{ width: "75rem" }}>
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

        {sortData(filteredStockList).map((BulkStock) => {
          // Check reorder level for each item
          
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
                  <td><Link to={`/kitchenBulkStock/${BulkStock.bname}`} className="invisible-link-button">{BulkStock.bname}</Link></td>
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

export default BulkStock;