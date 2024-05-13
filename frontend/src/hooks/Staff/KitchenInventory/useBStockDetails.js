import { useState, useEffect } from 'react';

const useBStockDetails = (bstockname) => {
    const [bstockDetails, setBStockDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBStockDetails = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:4000/kitchenBulkStock/bname/${bstockname}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch product details');
                }
                const data = await response.json();
                setBStockDetails(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        if (bstockname) {
            fetchBStockDetails();
        }
    }, [bstockname]);

    return { bstockDetails, isLoading, error };
};

export default useBStockDetails;