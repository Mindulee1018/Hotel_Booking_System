import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const useAddNotification = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const addNotification = async (email, roomNumbers, Message) => {
        
            const notification = {
                email,
                roomNumbers,
                Message,
              
            };
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
              "http://localhost:4000/notification/add",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(notification),
              }
            );
      
            if (!response.ok) {
              const json = await response.json();
              setError(json.error);
            } 
          } catch (error) {
            setError("An unexpected error occurred");
          } finally {
            setIsLoading(false);
          }
    };

    return {
        addNotification,
        isLoading,
        error
    };
};

export default useAddNotification;
