import { useState } from "react";
import useAddBuffet from "../../hooks/useAddBuffet";
import RestaurantNavbar from "../../components/RestaurantManagerNavbar";

const AddBuffet = () => {
    const [BuffetName, setBuffetName] = useState("");
    const [Description, setDescription] = useState("");
    const [Time, setTime] = useState("");
    const [Price, setPrice] = useState("");
    const [Image, setImage] = useState("");

    const { addBuffet, isLoading, error } = useAddBuffet();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await addBuffet(BuffetName, Description, Time, Price, Image);
    };

    function validation() {
        var submit = document.getElementById("submit");

        if (BuffetName === "" && Description === "" && Time === "" && Price === "" && Image === "") {
            // document.getElementById("emailError").innerHTML = "Can't be empty";

            document.getElementById("Error").innerHTML = "All fields must be filled.";
        }
    }

    return (
        <div className="row p-0">
      <RestaurantNavbar />
        <div className="row d-flex align-items-center justify-content-center mb-4 mt-1">

            <h1 className="mt-2 mb-3 ">Add New Buffet</h1>


            <form
                className="bg-primary bg-opacity-50"
                onSubmit={handleSubmit}
                method="Post"
                style={{ width: "30rem" }}
            >

                <div className="mb-3">
                    <label for="BuffetName" className="form-label mt-3">
                        Buffet Name:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="BuffetName"
                        onChange={(e) => {
                            setBuffetName(e.target.value);
                        }}
                    />
                </div>

                <div className="mb-3">
                    <label for="DescriptionTextarea" className="form-label mt-3">
                        Description:
                    </label>
                    <textarea
                        className="form-control"
                        id="DescriptionTextarea"
                        rows="6"
                        onChange={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                </div>



                <div class="mb-3">
                    <label className="form-label mt-3">Time:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="Time"
                        onChange={(e) => {
                            setTime(e.target.value);
                        }}
                    />
                </div>

                <div class="mb-3">
                    <label className="form-label mt-3">Price:</label>
                    <input
                        type="number"
                        className="form-control"
                        id="Price"
                        onChange={(e) => {
                            setPrice(e.target.value);
                        }}
                    />
                </div>

                <div class="mb-3">
                    <label for="formFile" className="form-label mt-3">
                        Image File
                    </label>
                    <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        onChange={(e) => {
                            setImage(e.target.files[0]);
                        }}
                    />
                </div>



                <button
                    type="submit"
                    className="btn btn-success m-4"
                    id="submit"
                    onClick={() => {
                        validation();
                    }}
                >
                    Add Buffet Details
                </button>

                <p id="Error"></p>
            </form>
        </div>
        </div>


    );
};

export default AddBuffet;
