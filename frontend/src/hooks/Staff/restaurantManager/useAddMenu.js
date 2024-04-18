import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAddMenu = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const addMenu = async (productName, Price, category, ImageFile) => {
    setIsLoading(true);
    setError(null);

    console.log(ImageFile, "fileee");

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("Price", Price);
    formData.append("category", category);
    if (ImageFile) {
      formData.append("Image", ImageFile);
    }

    try {
      const response = await fetch("http://localhost:4000/menu/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
      } else {
        navigate("/menu");
        alert("Activity Added successfully");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  //   const addMenu = async (productName, Price, category) => {
  //     setIsLoading(true);
  //     setError(null);

  //     try {
  //       const response = await fetch('http://localhost:4000/menu/add', {
  //         method: 'POST',
  //         headers: {'Content-Type': 'application/json'},
  //         body: JSON.stringify({productName, Price, category})
  //       });

  //       if (!response.ok) {
  //         const json = await response.json();
  //         setError(json.error);
  //       } else {
  //         navigate('/menu');
  //       }
  //     } catch (error) {
  //       setError("An unexpected error occurred");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  return { addMenu, isLoading, error };
};

export default useAddMenu;
