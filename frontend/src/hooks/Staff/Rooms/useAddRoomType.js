import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAddRoomType = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const addRoomType = async (
    Rtype,
    description,
    capacity,
    NoOfBeds,
    price,
    NoofRooms,
    RoomNumbers,
    ImageFile
  ) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);

    console.log(RoomNumbers, "nos");

    const formData = new FormData();
    formData.append("Rtype", Rtype);
    formData.append("description", description);
    formData.append("capacity", capacity);
    formData.append("NoOfBeds", NoOfBeds);
    formData.append("price", price);
    formData.append("NoofRooms", NoofRooms);
    formData.append("RoomNumbers", RoomNumbers);
    if (ImageFile) {
      formData.append("Image", ImageFile);
    }

    try {
      const response = await fetch("http://localhost:4000/roomType/add", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const json = await response.json();
        setError(json.error || "Something went wrong");
      } else {
        setIsSuccess(true);
        navigate("/ManageRoom"); // Adjust this if you want to navigate to a specific path
      }
    } catch (error) {
      setError("An unexpected error occurred: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { addRoomType, isLoading, error, isSuccess };
};

export default useAddRoomType;
