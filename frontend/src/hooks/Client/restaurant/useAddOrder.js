import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAddOrder = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const AddOrder = async ( orderNumber,productName, Quantity, Price, cusName, email, contactNumber,Total) => {
        const orderDetails = {
            orderNumber,
            productName,
            Quantity,
            Price,
            cusName,
            email,
            contactNumber,
            Total
        };

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch("http://localhost:4000/order/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderDetails),
            });

            if (!response.ok) {
                const json = await response.json();
                setError(json.error);
            } else {
                // navigate("/displayOrders");
            }
        } catch (error) {
            console.log(error, "error");
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return { AddOrder, isLoading, error };
};

export default useAddOrder;
