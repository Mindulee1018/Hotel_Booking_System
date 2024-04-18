import { useState, useEffect } from 'react';


const useKitchenStockDisplay = () => {
    const [StockList, setStockList] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  
    useEffect(() => {
        const fetchStock = async () => {
            setIsLoading(true);
            try{

                const StockResponse = await fetch ('http://localhost:4000/kitchenStock/');
                if (!StockResponse.ok){
                    throw new Error('Failed to fetch Stock list');
                }
                const StockData = await StockResponse.json();
                setStockList(StockData);
            }
            catch(error){
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStock();
    }, []);

    return {StockList, isLoading, error};

};
export default useKitchenStockDisplay;