// import React, { uselocation, useState } from "react";
// import useMenuByCategory from "../../../hooks/Client/restaurant/useDisplayMenu";
// import { useNavigate } from 'react-router-dom';

// const bufferToBase64 = (buf) => {
//   var binstr = Array.prototype.map
//     .call(buf, (ch) => {
//       return String.fromCharCode(ch);
//     })
//     .join("");
//   return btoa(binstr);
// };

// const MenuDisplay = () => {
//   const [category, setCategory] = useState("");
//   //const { menuList, isLoading, error } = useMenuList(category);
//   const { menuItems, isLoading, error } = useMenuByCategory(category);
//   const navigate = useNavigate();
//   const [productname, setProduct] = useState('');
//   const [price, setprice] = useState('');

//   const handleCategoryChange = (selectedCategory) => {
//     setCategory(selectedCategory);
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }


//  // MenuDisplay.js
// const handleSelect = (name, price) => {
//   // Call the token check function before navigating
//   CheckAndNavigate(name, price);
// };

// const CheckAndNavigate = (name, price) => {
//   // If token is present
//   navigate('/AddOrder', {
//     state: {
//       productname: name,
//       price: price
//     }
//   });
// };


//   return (
//     <div>
//       <div className="mt-3 mb-2">
//         <h3>Select Category</h3>
//         <select
//           value={category}
//           onChange={(e) => handleCategoryChange(e.target.value)}
//         >
//           <option value="all">All Categories</option>
//           <option value="srilankan">Sri Lankan</option>
//           <option value="Burgers & Sandwiches">Burgers and Sandwiches</option>
//           <option value="Chinese">Chinese</option>
//           <option value="Pizzas and Pasta">Pizzas and Pasta</option>
//           <option value="Cakes">Cakes</option>
//           <option value="Desserts">Desserts</option>
//         </select>
//       </div>

//       <div className="row d-flex align-items-center justify-content-around mb-3">
//         {menuItems &&
//           menuItems.map((menu) => (
//             <div key={menu._id} className="col-lg-3">
//               <div className="card mb-4">
//                 <div className="card-body">
//                   {menu.Image && menu.Image.data && (
//                     <img
//                       style={{ width: "10rem" }}
//                       src={`data:${
//                         menu.Image.contentType
//                       };base64,${bufferToBase64(menu.Image.data.data)}`}
//                       className="card-img-top mb-1"
//                       alt={menu.productName}
//                     />
//                   )}
//                   <h5 className="card-title" onChange={(e) => setProduct(e.target.value)} >{menu.productName}</h5>
//                   <p className="card-text fw-medium" onChange={(e) => setprice(e.target.value)} >Rs.{menu.Price}.00</p>
//                   <p className="card-text fw-medium">{menu.category}</p>
//                   <a href="/AddOrder" className="btn btn-info mb-5" onClick={() => handleSelect(menu.productName, menu.Price)}>
//                     Order Now
//                   </a>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default MenuDisplay;



import React, { useState } from "react";
import useMenuByCategory from "../../../hooks/Client/restaurant/useDisplayMenu";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const bufferToBase64 = (buf) => {
  const binstr = Array.from(buf, (ch) => String.fromCharCode(ch)).join("");
  return btoa(binstr);
};



const categories = [
  { name: "srilankan", image: "/path/to/srilankan.jpg" },
  { name: "Burgers & Sandwiches", image: "/path/to/burgers.jpg" },
  { name: "Chinese", image: "/path/to/chinese.jpg" },
  { name: "Pizzas and Pasta", image: "/path/to/pizzas.jpg" },
  { name: "Cakes", image: "/path/to/cakes.jpg" },
  { name: "Desserts", image: "/path/to/desserts.jpg" },
];

const MenuDisplay = () => {
  const location = useLocation();
  const { category } = location.state || {};
  
  const [selectedCategory, setSelectedCategory] = useState(category); 
  const navigate = useNavigate();

  const { menuItems, isLoading, error } = useMenuByCategory(selectedCategory);



  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleSelect = (productName, price) => {
    navigate("/AddOrder", {
      state: {
        productname:productName,
        price,
      },
    });
  };

  return (
    <div>
      <div className="row d-flex align-items-center justify-content-around mb-3">
        {categories.map((category) => (
          <div
            key={category.name}
            className="col-lg-2"
            onClick={() => handleCategoryClick(category.name)}
          >
            <div className={`card mb-4 ${selectedCategory === category.name ? 'bg-info' : ''}`}>
              <div className="card-body text-center">
              
                <h6 className="card-title">{category.name}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row d-flex align-items-center justify-content-around mb-3">
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          menuItems.map((menu) => (
            <div key={menu._id} className="col-lg-3"> 
              <div className="card mb-4">
                <div className="card-body">
                  {menu.Image && menu.Image.data && (
                    <img
                      style={{ width: "10rem" }}
                      src={`data:${menu.Image.contentType};base64,${bufferToBase64(
                        menu.Image.data.data
                      )}`}
                      className="card-img-top"
                      alt={menu.productName}
                    />
                  )}
                  <h5 className="card-title">{menu.productName}</h5>
                  <p className="card-text fw-medium">Rs. {menu.Price}.00</p>
                  <button
                    className="btn btn-info"
                    onClick={() => handleSelect(menu.productName, menu.Price)}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MenuDisplay;


