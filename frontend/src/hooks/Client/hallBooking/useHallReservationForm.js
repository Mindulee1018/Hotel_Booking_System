import { useState } from 'react';

const useHallReservationForm = () => {
  const [formData, setFormData] = useState({
    bookingName: '',
    eventType: '',
    capacity: '',
    arrangementStyle: '',
    foodArrangement: '',
    barArrangement: '',
    decorArrangement: '',
  });

  const [cateringNeeded, setCateringNeeded] = useState(false);
  const [decorNeeded, setDecorNeeded] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCateringChange = (e) => {
    setCateringNeeded(e.target.checked);
  };

  const handleDecorChange = (e) => {
    setDecorNeeded(e.target.checked);
  };

  const handleSubmit = async () => {
    try {
      // Set the fixed userid
      const userid = '65f47fd2435e6437ddcb9eb1';
  
      const response = await fetch('/hallR/addres', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userid, // Include the fixed userid in the request body
          cateringNeeded,
          decorNeeded,
          // Add other necessary data fields here
        }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create reservation');
      }
  
      const data = await response.json();
      console.log('Reservation created:', data);
      // Optionally, you can handle the response according to your application's needs
    } catch (error) {
      console.error('Error creating reservation:', error.message);
      // Optionally, you can handle errors gracefully (e.g., displaying an error message to the user)
    }
  };

  return {
    formData,
    cateringNeeded,
    decorNeeded,
    handleInputChange,
    handleCateringChange,
    handleDecorChange,
    handleSubmit,
  };
};

export default useHallReservationForm;
