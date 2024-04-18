import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAddNew = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const addActivity = async (Activity, Time, Price, qtyPerRound, ImageFile) => {
    setIsLoading(true);
    setError(null);

    console.log(ImageFile,"fileee")

    const formData = new FormData();
    formData.append("Activity", Activity);
    formData.append("Time", Time);
    formData.append("Price", Price);
    formData.append("qtyPerRound", qtyPerRound);
    if (ImageFile) {
      formData.append("Image", ImageFile);
    }

    try {
      const response = await fetch("http://localhost:4000/watersport/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
      } else {
        navigate("/WatersportsManagement");
        alert('Activity Added successfully');
      }
      
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // const addActivity = async (Activity, Time, Price, Description, Image) => {
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const response = await fetch('http://localhost:4000/watersport/add', {
  //       method: 'POST',
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify({ Activity, Time, Price, Description , Image})
  //     });

  //     if (!response.ok) {
  //       const json = await response.json();
  //       setError(json.error);
  //     } else {
  //       navigate('/');
  //     }
  //   } catch (error) {
  //     setError("An unexpected error occurred");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return { addActivity, isLoading, error };
};

export default useAddNew;
