import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAddRoom = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const addRoom = async (
    Rid,
    Rtype,
    description,
    capacity,
    NoOfBeds,
    price,
    status, 
    ImageFile
  ) => {
    // const roomDetails = {
    //   Rid,
    //   Rtype,
    //   description,
    //   capacity,
    //   NoOfBeds,
    //   price,
    //   status,
    // };
    setIsLoading(true);
    setError(null);

    console.log(ImageFile,"file")

    const formData = new FormData();
    formData.append("Rid", Rid);
    formData.append("Rtype", Rtype);
    formData.append("description", description);
    formData.append("capacity", capacity);
    formData.append("NoOfBeds", NoOfBeds);
    formData.append("price", price);
    formData.append("status", status);
    if (ImageFile) {
      formData.append("Image", ImageFile);
    }

    try {
      const response = await fetch("http://localhost:4000/room/roomAdd", {
        method: "POST",
        body: formData,
        // headers: { "Content-Type": "application/json" },
        // body: JSON.stringify(roomDetails),
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error);
      } else {
        navigate("/rooms");
        alert("Room Added successfully");
      }
    } catch (error) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return { addRoom, isLoading, error };
};

export default useAddRoom;
