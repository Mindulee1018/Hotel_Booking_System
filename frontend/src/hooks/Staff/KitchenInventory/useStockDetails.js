import { useState, useEffect } from 'react';

const useStockDetails = (stockname) => {
    const [stockDetails, setStockDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStockDetails = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:4000/kitchenStock/name/${stockname}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                setStockDetails(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (stockname) {
            fetchStockDetails();
        }
    }, [stockname]);

    return { stockDetails, isLoading, error };
};

export default useStockDetails;