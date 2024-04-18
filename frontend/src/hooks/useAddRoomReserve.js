import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAddRoomReserve = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const addRoomReserve = async (
        Checkindate,
        Checkoutdate,
        NoOfGuests,
        firstName,
        lastName,
        Email,
        Address,
        phoneno

    ) => {
        const reservationDetails = {
            Checkindate,
            Checkoutdate,
            NoOfGuests,
            firstName,
            lastName,
            Email,
            Address,
            phoneno
        };

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                "http://localhost:4000/roomreservation/roomReservation",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(reservationDetails),
                }
            );

            if (!response.ok) {
                const json = await response.json();
                setError(json.error);
            } else {
                navigate("/roomreservation");
            }
        } catch (error) {
            setError("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return { addRoomReserve, isLoading, error };
};

export default useAddRoomReserve;