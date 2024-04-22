
const { v4: uuidv4 } = require('uuid'); 

//generate a unique promo code
const generatePromoCode = () => {
  return `PROMO-${uuidv4().split('-')[0].toUpperCase()}`; 
};

module.exports = { generatePromoCode };
