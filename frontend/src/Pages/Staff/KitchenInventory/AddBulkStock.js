import { useState } from "react";
import useAddBulkStock  from "../../../hooks/Staff/KitchenInventory/useAddBulkStock";
import KitchenSidebar from "../../../components/KitchenSideBar";

const AddBulkStock = () => {

    const [bname, setBName] = useState('');
    const [bcategory, setBCategory] = useState('');
    const [bquantity, setBQuantity] = useState('');
    const [breorderLevel, setBReorderLevel] = useState('');
    const [bunits, setBUnits] = useState('');
    const [bprice, setBPrice] = useState('');
    const [bdescription, setBDescription] = useState('');

    const { addBulkStock } = useAddBulkStock();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
    
        await addBulkStock(bname, bcategory, bquantity,breorderLevel,bunits, bprice, bdescription);
    };

    const validate = () => {
        const allFieldsFilled = bname && bcategory && bquantity && breorderLevel && bunits && bprice && bdescription;
        const errorElement = document.getElementById("Error");
        if (!allFieldsFilled) {
            errorElement.innerHTML = "All fields must be filled.";
            return false;
        } 
        //check if quantity is negative
        if(bquantity<0){
            errorElement.innerHTML = "Quantity cannot be negative.";
            return false;
        }
        if(bunits<0){
            errorElement.innerHTML = "Units cannot be negative.";
            return false;
        }
        if(bprice<0){
            errorElement.innerHTML = "Price cannot be negative.";
            return false;
        }
        
        
            errorElement.innerHTML = "";
            return true;
        
    };

    return (
        <div className="row p-0">
        <KitchenSidebar/>
        <div className="col">
            <div className="d-flex align-items-center justify-content-center mb-3 mt-5">
                <form onSubmit={handleSubmit} method="Post" style={{ width: "18rem" }}>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input type="text" className="form-control" id="productName" onChange={(e) => setBName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productCategory" className="form-label">Product Category</label>
                        <input type="text" className="form-control" id="productCategory" onChange={(e) => setBCategory(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productQuantity" className="form-label">Quantity </label>
                        <input type="number" className="form-control" id="productQuantity" onChange={(e) => setBQuantity(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productReorderLevel" className="form-label">Reorder Level </label>
                        <input type="number" className="form-control" id="productReorderLevel" onChange={(e) => setBReorderLevel(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productUnits" className="form-label">No. of Units available</label>
                        <input type="number" className="form-control" id="productUnits" onChange={(e) => setBUnits(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productPrice" className="form-label">Latest Purchased Price per unit</label>
                        <input type="number" className="form-control" id="productPrice" onChange={(e) => setBPrice(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Special Notes</label>
                        <input type="text" className="form-control" id="description" onChange={(e) => setBDescription(e.target.value)} />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" id="submit" onClick={validate}>Submit</button>

                    <p id="Error"></p>
                </form>
            </div>
            </div>
        </div>
    );
};
export default AddBulkStock;