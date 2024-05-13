
import React, { useState, useEffect } from 'react';
import useBulkStockDisplay from '../../../hooks/Staff/KitchenInventory/useBulkStockDisplay';
import useDeleteBulkStock from '../../../hooks/Staff/KitchenInventory/useDeleteBulkStock';
import useUpdateBulkStock from '../../../hooks/Staff/KitchenInventory/useUpdateBulkStock';
import useKitchenStockDisplay from '../../../hooks/Staff/KitchenInventory/useKitchenStockDisplay';
import useDeleteStock from '../../../hooks/Staff/KitchenInventory/useDeleteStock';
import useUpdateStock from '../../../hooks/Staff/KitchenInventory/useUpdateStock';
import KitchenSidebar from '../../../components/KitchenSideBar';

function CombinedInventory() {
    const { BStockList, isLoading: bulkLoading, error: bulkError } = useBulkStockDisplay();
    const { deleteBulkStock } = useDeleteBulkStock();
    const { updateBulkStock } = useUpdateBulkStock();
    const { StockList, isLoading: kitchenLoading, error: kitchenError } = useKitchenStockDisplay();
    const { deleteStock } = useDeleteStock();
    const { updateStock } = useUpdateStock();

    const [searchkey, setSearchKey] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [sort, setSort] = useState('');
    const [nameToDelete, setNameToDelete] = useState('');
    const [nameToUpdate, setNameToUpdate] = useState('');
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [bname, setBName] = useState("");
    const [bcategory, setBCategory] = useState("");
    const [bquantity, setBQuantity] = useState("");
    const [bprice, setBPrice] = useState("");
    const [bdescription, setBDescription] = useState("");

    const allStockList = [...BStockList, ...StockList];

    // Sort data function
    const sortData = () => {
        const sortedList = [...allStockList];
        if (sort === 'priceAsc') {
            sortedList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sort === 'priceDesc') {
            sortedList.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (sort === 'quantityAsc') {
            sortedList.sort((a, b) => parseFloat(a.quantity) - parseFloat(b.quantity));
        } else if (sort === 'quantityDesc') {
            sortedList.sort((a, b) => parseFloat(b.quantity) - parseFloat(a.quantity));
        } else if (sort === 'createdAtAsc') {
            sortedList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        } else if (sort === 'createdAtDesc') {
            sortedList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sort === 'updatedAtAsc') {
            sortedList.sort((a, b) => new Date(a.updatedAt) - new Date(b.updatedAt));
        } else if (sort === 'updatedAtDesc') {
            sortedList.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
        }
        return sortedList;
    };

    if (bulkLoading || kitchenLoading) {
        return <div className="alert alert-primary" role="alert">Loading...</div>;
    }

    if (bulkError || kitchenError) {
        return <div>Error: {bulkError || kitchenError}</div>;
    }

    const handleDelete = async (nameToDelete) => {
        const isBulkStock = BStockList.find(item => item.bname === nameToDelete);
        if (isBulkStock) {
            await deleteBulkStock(nameToDelete);
        } else {
            await deleteStock(nameToDelete);
        }
        setNameToDelete('');
    };

    const handleUpdate = async () => {
        const isBulkStock = BStockList.find(item => item._id === nameToUpdate);
        if (isBulkStock) {
            await updateBulkStock(nameToUpdate, name, category, quantity, price, description);
        } else {
            await updateStock(nameToUpdate, name, category, quantity, price, description);
        }
    };


   
    // Render the table rows
    const renderRows = () => {
        return sortData().map(item => (
            <tr key={item._id}>
                {/* Render table cells based on the item properties */}
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td>{item.price}</td>
                <td>{item.description}</td>
                <td>
                    <button className="btn btn-danger" onClick={() => setNameToDelete(item.name)}>DELETE</button>
                </td>
                <td>
                    <button className="btn btn-primary" onClick={() => setNameToUpdate(item._id)}>UPDATE</button>
                </td>
            </tr>
        ));
    };

    return (
        <div className="row p-0">
            <KitchenSidebar/>
            <div className="col">
                <div>
                    <h1 className="mb-4 mt-5">Kitchen Inventory</h1>
                    <a href="/AddBulkStock" className="btn btn-primary mb-5"style={{marginRight:"2rem"}}>
                        Add New Bulk Stock
                    </a>
                    <a href="/AddStock" className="btn btn-primary mb-5">
                        Add New Fresh Produce
                    </a>
                
                    

                    {/* Inventory Table */}
                    <div className="d-flex align-items-center justify-content-around mb-3">
                        <table className="table" style={{ width: "75rem" }}>
                            <thead>
                                <tr>
                                    <th className="border border-black" scope="col">Product Name</th>
                                    <th className="border border-black" scope="col">Product Category</th>
                                    <th className="border border-black" scope="col">Quantity</th>
                                    <th className="border border-black" scope="col">Price</th>
                                    <th className="border border-black" scope="col">Description</th>
                                    <th className="border border-black" scope="col">Added Date and Time</th>
                                    <th className="border border-black" scope="col">Last Updated</th>
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {sortData().map(item => (
                                    <tr key={item._id}>
                                        <td>{item.name || item.bname}</td>
                                        <td>{item.category || item.bcategory}</td>
                                        <td>{item.quantity || item.bquantity}</td>
                                        <td>{item.price|| item.bprice}</td>
                                        <td>{item.description||item.bdescription}</td>
                                        <td>{new Date(item.createdAt).toLocaleString()}</td>
                                        <td>{new Date(item.updatedAt).toLocaleString()}</td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CombinedInventory;