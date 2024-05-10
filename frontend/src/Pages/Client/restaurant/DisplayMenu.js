
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

const defaultCategory = "srilankan";

const MenuDisplay = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.category || defaultCategory
  );

  const { menuItems, isLoading, error } = useMenuByCategory(selectedCategory);



  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const token = localStorage.getItem('user');
  const handleSelect = (productName, price) => {
    if(!token){
      alert("you need to login first")
      navigate("/login")
      return
    }
    else {navigate("/AddOrder", {
      state: {
        productname:productName,
        price,
      },
    });
  };}

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


