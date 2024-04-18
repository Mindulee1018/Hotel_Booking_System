
import { useState } from "react";

export function useFormState(initialState) {
    const [formData, setFormData] = useState(initialState);

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    return {
        formData,
        handleOnChange
    };
}

export function usePaymentSubmission() {
    const submitOrder = async (orderData) => {
        return fetch("http://localhost:4000/payment/create_payment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });
    };

    const sendThankYouEmail = async (email) => {
        return fetch("http://localhost:4000/payment/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });
    };

    return {
        submitOrder,
        sendThankYouEmail
    };
}

/*import { useState } from "react";

const usePayment = () => {
    const [order, setOrder] = useState({
        c_name: "",
        email: "",
        card_number: "",
        cvc: "",
        card_expiration: "",
        
    });

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setOrder((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (callback) => {
        try {
            await callback(order);
            alert("Reservation added!");
        } catch (error) {
            console.error("Error adding order or sending email:", error);
            alert("An error occurred while processing your request. Please try again later.");
        }
    };

    return { order, handleOnChange, handleSubmit };
};

export default usePayment;*/