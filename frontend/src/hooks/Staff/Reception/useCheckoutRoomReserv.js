import { useCallback } from 'react';

function useCheckoutRoomReserv() {
    const handleCheckOut = useCallback(async (reservationId) => {
        
        try {
            const response = await fetch(`http://localhost:4000/roomreservation/checkout/${reservationId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ checkout: true })
            });

            if (response.ok) {
                alert('Checkout successful!');
                // Optionally refresh the list or handle UI changes
            } else {
                alert('Checkout failed. Please try again.');
            }
        } catch (error) {
            console.error('Failed to checkout:', error);
            alert('Error checking out. Please check your network and try again.');
        }
    }, []);

    return{handleCheckOut};
}

export default useCheckoutRoomReserv;
