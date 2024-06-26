import { useState } from "react";
import useAddStock  from "../../../hooks/Staff/KitchenInventory/useAddStock";
import KitchenSidebar from "../../../components/KitchenSideBar";

const AddStock = () => {

    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [reorderLevel, setReorderLevel] = useState('');
    const [price, setPrice] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [description, setDescription] = useState('');

    const { addStock } = useAddStock();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
    
        await addStock(name, category, quantity,reorderLevel, price,expiryDate, description);
    };

    const validate = () => {
        const allFieldsFilled = name && category && quantity && reorderLevel && price && expiryDate && description;
        const errorElement = document.getElementById("Error");
        if (!allFieldsFilled) {
            errorElement.innerHTML = "All fields must be filled.";
            return false;
        } 
        //check if quantity is negative
        if(quantity<0){
            errorElement.innerHTML = "Quantity cannot be negative.";
            return false;
        }
        if(price<0){
            errorElement.innerHTML = "Price cannot be negative.";
            return false;
        }
        
            errorElement.innerHTML = "";
            return true;
        
    };
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();
    
        // Add leading zero if month or day is less than 10
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
    
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="row p-0">
            <KitchenSidebar/>
            <div className="col">
            <div className="d-flex align-items-center justify-content-center mb-3 mt-5">
                <form onSubmit={handleSubmit} method="Post" style={{ width: "18rem" }}>
                    <div className="mb-3">
                        <label htmlFor="productName" className="form-label">Product Name</label>
                        <input type="text" className="form-control" id="productName" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productCategory" className="form-label">Product Category</label>
                        <input type="text" className="form-control" id="productCategory" onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productQuantity" className="form-label">Quantity Available</label>
                        <input type="number" className="form-control" id="productQuantity" onChange={(e) => setQuantity(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productReorderLevel" className="form-label">ReOrder Level</label>
                        <input type="number" className="form-control" id="productReorderLevel" onChange={(e) => setReorderLevel(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="productPrice" className="form-label">Latest Purchased Price at per 1kg</label>
                        <input type="number" className="form-control" id="productPrice" onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="expiryDate" className="form-label">Best Before Date</label>
                        <input type="date" className="form-control" id="expiryDate" min={getCurrentDate()} onChange={(e) => setExpiryDate(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Special Notes</label>
                        <input type="text" className="form-control" id="description" onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" id="submit" onClick={validate}>Submit</button>

                    <p id="Error"></p>
                </form>
            </div>
            </div>
        </div>
    );
};
export default AddStock;

/*const AddStock = () => {
    const [name, setName] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const { addStock, isLoading, error } = useAddStock();

    const handleSubmit = async (e) => {
        e.preventDefault()
    
        await addStock(name, category,quantity, price,description)
      }

      function validation()
        { 
            var submit = document.getElementById("submit");

            if(name ==='' && category ==='' && quantity ==='' && price ==='' && description ===''){
                // document.getElementById("emailError").innerHTML = "Can't be empty";
                 
                document.getElementById("Error").innerHTML = "All fields must be filled.";
                
              }
        }

    return(
        <div>
        <div className="d-flex align-items-center justify-content-center mb-3 mt-5" >
            <form onSubmit={handleSubmit} method='Post' style={{ width: "18rem" }} action=''>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Product Name</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{setName(e.target.value);}}/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Product Category</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{setCategory(e.target.value);}}/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Quantity Available</label>
                    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{setQuantity(e.target.value);}}/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Latest Price Purchased at</label>
                    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{setPrice(e.target.value);}}/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Special Notes</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>{setDescription(e.target.value);}}/>
                </div>
                <button type="submit" className="btn btn-primary" id="submit"disabled={isLoading} onClick={() => { validation(); }}>Submit</button>

                <p id="Error"></p>
            </form>
        </div>

        
        </div>

    )}*/

    