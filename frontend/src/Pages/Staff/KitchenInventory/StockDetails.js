import React from 'react';
import { useParams } from 'react-router-dom';
import useStockDetails from '../../../hooks/Staff/KitchenInventory/useStockDetails';
import KitchenSidebar from '../../../components/KitchenSideBar';

function StockDetails() {
    const { stockName } = useParams();
    const { stockDetails, isLoading, error } = useStockDetails(stockName);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


    return (
        <div className="row p-0">
            <KitchenSidebar/>
            <div className="col">
        <div>
            <h1 className="mb-4 mt-5">Stock Details for {stockName}</h1>
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
                                Reorder Level
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
                        {stockDetails.map((stock, index) => (
                            <tr key={index}>
                                <td>{stock.name}</td>
                                <td>{stock.category}</td>
                                <td>{stock.quantity}</td>
                                <td>{stock.reorderLevel}</td>
                                <td>{stock.price}</td>
                                <td>{stock.expiryDate}</td>
                                <td>{stock.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            ) : (
                <div>No product details available</div>
            )}
        </div>
    
        </div>
        </div>
        
    );
}

export default StockDetails;
   