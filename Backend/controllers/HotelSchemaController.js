const Hotel = require("../Models/Hotelschema")

const getAllDetails = async (req, res) => {
    try {
      const hotels = await Hotel.find();
      res.status(200).json(hotels);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
    };

    const createDetails = async (req, res) => {
        try {
          const { name, address,Aboutus,email, phoneno, images } = req.body;
          const hotel = await Hotel.create({ name, address, Aboutus, email,phoneno,images });
          res.status(201).json(hotel);
        } catch (error) {
          res.status(400).json({ error: error.message });
        }
      };


      const getImageByName = async (req, res) => {
        const { imageName } = req.params;
      
        try {
          const hotel = await Hotel.findOne({ images: { $elemMatch: { $eq: imageName } } });
      
          if (!hotel) {
            return res.status(404).json({ error: 'Image not found' });
          }
          // Extract the specific image from the array
         const image = hotel.images.find(img => img === imageName);
     
         res.status(200).json({ image });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal server error' });
        }
      };
      
  
    module.exports = {getAllDetails,createDetails, getImageByName }