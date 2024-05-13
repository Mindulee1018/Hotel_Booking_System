import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Inventorysidebar from '../../../components/InventoryManagerSideBar';


const AddItem = () => {
    const navigate = useNavigate();
    const [setErrors,errors] =useState();
    const [state, setState] = useState({
        itemID: "",
        itemName: "",
        description: "",
        unit_price: "",
        stockCount: "",
        reorderPoint: ""
      })
    
      {/*const handleChange = (e) =>{
        const {name, value} = e.target;
    
        setState({...state,[name]:value})
      }
    
      const onsubmit = (e) => {
      e.preventDefault();*/}
      
      const [submitting, setSubmitting] = useState(false);
    
      const validateValues = (inputValues) => {
        let errors = {};
        if (inputValues.itemID.length < 3) {
          errors.itemNo = "itemID is too short";
        }
        if (inputValues.itemName.length < 1) {
          errors.itemName = "itemName is too short";
        }
        if (inputValues.description.length < 1) {
          errors.color = "description is too short";
        }
        if (inputValues.unit_price.length < 1) {
          errors.price = "price is too short";
        }
        if (inputValues.stockCount.length < 1) {
          errors.stockCount = "stockCount is too short";
        }
        if (inputValues.reorderPoint.length < 1) {
          errors.reorderPoint = "reorderPoint is too short";
        }
        return errors;
      };

      const handleChange = (e) =>{
        setState({ ...state, [e.target.name]: e.target.value });
        //setErrors(validateValues(state));
      }
      
      const handleSubmit = (event) =>{
        event.preventDefault();
        //setErrors(validateValues(state));
        setSubmitting(true);

        if(Object.keys(errors).length === 0 && submitting){
    
        const 
        {
            itemID, 
            itemName, 
            description,
            unit_price,
            stockCount,
            reorderPoint
        } = state;
    
        const data = {
            itemID: itemID,
            itemName: itemName,
            description: description,
            unit_price: unit_price,
            stockCount: stockCount,
            reorderPoint: reorderPoint
        }
        console.log(data);

        fetch('http://localhost:4000/roominventory/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((data) => {
            alert('Item added to inventory');
            navigate(-1);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }};
    
  return (
    <>
    <div class="row m-0 p-0">
    
      <Inventorysidebar/>
  
    
   
    <div class="container-fluid col">
      <div class="row flex-nowrap">
        <div class="col py-3">
            <div class="mt-5 mb-5 ">
                <h4>
                    <span class="badge text-bg-secondary">
                    Inventory Add 
                    </span>
                </h4>
            </div>
          
    {/* table */}
  <div class="row mb-5">
    <div class="col">
        <label class="form-label">ItemID</label>
        <input 
        type="text"
        name="itemID" 
        className='form-control'
        placeholder="Enter itemID"
        value={state.itemID}
        onChange={handleChange}
        />
        {errors.itemID && (
          <div class="text-danger mt-2">
            ItemID should have 4 characters
          </div>)}
    </div>
    <div class="col-6">
    <label class="form-label">ItemName</label>
        <input 
        type="text"
        name="itemName" 
        className='form-control'
        placeholder="Enter itemName"
        value={state.itemName}
        onChange={handleChange}
        />
        {errors.itemName && (
          <div class="text-danger mt-2">
            ItemName can't be null
          </div>
          )}
    </div>
  </div>
  <div class="row mt-4">
  <div class="col">
    <label class="form-label">description</label>
        <input 
        type="text"
        name="description" 
        className='form-control'
        placeholder="Enter the description"
        value={state.description}
        onChange={handleChange}
        />
        {errors.description && (
          <div class="text-danger mt-2">
            Description can't be null
          </div>
          )}
    </div>
    <div class="col">
    <label class="form-label">unit_price</label>
        <input 
        type="text"
        name="unit_price" 
        className='form-control'
        placeholder="Enter the unit price"
        value={state.unit_price}
        onChange={handleChange}
        />
         {errors.unit_price && (
          <div class="text-danger mt-2">
            Price can't be null
          </div>
          )}
    </div>
    <div class="col">
    <label class="form-label">Stock Count</label>
        <input 
        type="text"
        name="stockCount" 
        className='form-control'
        placeholder="Enter stockCount of the post"
        value={state.stockCount}
        onChange={handleChange}
        />
        {errors.stockCount && (
          <div class="text-danger mt-2">
            StockCount can't be null
          </div>
          )}
    </div>
    <div class="col">
    <label class="form-label">Reorder Point</label>
        <input 
        type="text"
        name="reorderPoint" 
        className='form-control'
        placeholder="Enter reorderPoint of the post"
        value={state.reorderPoint}
        onChange={handleChange}
        />
         {errors.reorderPoint && (
          <div class="text-danger mt-2">
            reorderPoint can't be null
          </div>
          )}
    </div>

  <button className='btn btn-success mt-5' type='submit' onClick={(e)=>handleSubmit(e)}>
         Save
      </button>
</div>

          </div>
      </div>
    </div> </div>
  </>
  )
}

export default AddItem