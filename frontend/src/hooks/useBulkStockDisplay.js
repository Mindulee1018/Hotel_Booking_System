import { useState, useEffect } from 'react';


const useBulkStockDisplay = () => {
    const [BStockList, setBStockList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
        const fetchStock = async () => {
            setIsLoading(true);
            try{

                const StockResponse = await fetch ('http://localhost:4000/kitchenBulkStock/');
                if (!StockResponse.ok){
                    throw new Error('Failed to fetch Stock list');
                }
                const StockData = await StockResponse.json();
                setBStockList(StockData);
            }
            catch(error){
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStock();
    }, []);

    return {BStockList, isLoading, error};

};
export default useBulkStockDisplay;