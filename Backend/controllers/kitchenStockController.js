
const { default: mongoose } = require('mongoose')
const Stock = require("../Models/KitchenStockModel");

// add a product
const addStock = async (req, res) => {
  const { name, category, quantity,reorderLevel, price, expiryDate, description } = req.body;

  try {
     
          // If no record with the same name exists, create a new entry
          const stock = await Stock.create({ name, category, quantity,reorderLevel, price,expiryDate, description });
          res.status(201).json(stock);
      }
   catch (error) {
      res.status(400).json({ error: error.message });
  }
};

//  get all Stocks
const getStocks = async (req, res) => {
    try {
        const stocks = await Stock.find({});
        res.status(200).json(stocks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// get a single stock
const getsingleStock = async (req,res) =>{

  const {id} = req.params

  if(!mongoose.Types.ObjectId.isValid(id)){
    res.status(404).json({error: 'invalid id'})
  }

  const stock = await Stock.findById(id)

  if(!stock){
    res.status(404).json({error: 'No such produt'})
  }

  res.status(200).json(stock)
}

//update stocks
const updateStock = async (req, res) => {

  const { name, category, quantity,reorderLevel, price,expiryDate, description } = req.body;
  const{id}  = req.params;

  try{

  if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid ID' });
        }

  const update = await Stock.findById(id)

   if(!update){
    return res.status(404).json({ message: "Product not found" });
   }

   const updateFields = {};
   if (name) updateFields.name = name;
   if (category) updateFields.category = category;
   if (quantity) updateFields.quantity = quantity;
   if (reorderLevel) updateFields.reorderLevel = reorderLevel;
   if (price) updateFields.price = price;
   if (expiryDate) updateFields.expiryDate = expiryDate;
   if (description) updateFields.description = description;

   
   if (Object.keys(updateFields).length > 0) {
       const updatedStocks = await Stock.findByIdAndUpdate(id, { $set: updateFields }, { new: true });
       res.json(updatedStocks);
   } else {
       res.json({ message: 'No changes detected' });
   }
  }
  catch(error){
      res.status(500).json({error:error.message});
  }

}



// delete stocks
const deleteStock = async (req, res) => {
    try {
        const { stockName } = req.params; 
        const result = await Stock.findOneAndDelete({ name: stockName });

        if (!result) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// get a single stock by name
const getsingleName = async (req, res) => {
    const { stockname } = req.params;

    try {
        const stock = await Stock.find({ name:stockname });
        if (!stock) {
            return res.status(404).json({ error: 'No such product' });
        }
        res.status(200).json(stock);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { addStock, getStocks,getsingleStock,updateStock,deleteStock,getsingleName };