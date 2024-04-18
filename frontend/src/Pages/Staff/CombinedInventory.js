import React, { useState, useEffect } from 'react';
import useBulkStockDisplay from '../../hooks/useBulkStockDisplay';
import useDeleteBulkStock from '../../hooks/useDeleteBulkStock';
import useUpdateBulkStock from '../../hooks/useUpdateBulkStock';
import useKitchenStockDisplay from '../../hooks/useKitchenStockDisplay';
import useDeleteStock from '../../hooks/useDeleteStock';
import useUpdateStock from '../../hooks/useUpdateStock';
import KitchenSidebar from '../../components/KitchenSideBar';

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
                <h1 className="mb-4 mt-5">Combined Inventory</h1>
                {/* Add New Stock buttons for bulk and kitchen inventory */}
                <a href="/AddBulkStock" className="btn btn-primary mb-2">Add New Bulk Stock</a>
                <a href="/AddStock" className="btn btn-primary mb-2">Add New Kitchen Stock</a>

                {/* Search Input and filter */}
                <div className="row justify-content-between mb-3">
                    <div className="col-auto">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchkey}
                            onChange={(e) => setSearchKey(e.target.value)}
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
                            {/* Render options based on available categories */}
                        </select>
                    </div>
                    <div className="col-auto">
                        <select
                            className="form-select"
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value="">Sort by...</option>
                            <option value="priceAsc">Price Low to High</option>
                            <option value="priceDesc">Price High to Low</option>
                            <option value="quantityAsc">Quantity Low to High</option>
                            <option value="quantityDesc">Quantity High to Low</option>
                            <option value="createdAtAsc">Oldest to Newest (Created)</option>
                            <option value="createdAtDesc">Newest to Oldest (Created)</option>
                            <option value="updatedAtAsc">Oldest to Newest (Updated)</option>
                            <option value="updatedAtDesc">Newest to Oldest (Updated)</option>
                        </select>
                    </div>
                </div>

                {/* Render the table */}
                <table className="table" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Product Category</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderRows()}
                    </tbody>
                </table>
            </div>

            {/* Delete Confirmation Modal */}
            <div className="modal fade" id="Modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                {/* Modal content */}
            </div>

            {/* Update Modal */}
            <div className="modal fade" id="UpdateModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                {/* Modal content */}
            </div>
            </div>
        </div>
    );
}

export default CombinedInventory;