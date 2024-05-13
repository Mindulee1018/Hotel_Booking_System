

// import React, { useState } from "react";
// import useMenuList from "../../../hooks/Staff/restaurantManager/useMenu";
// import useDeleteMenu from "../../../hooks/Staff/restaurantManager/useDeleteMenuItem";
// import useUpdateMenu from "../../../hooks/Staff/restaurantManager/useUpdateMenuItem";
// import RestaurantNavbar from "../../../components/RestaurantManagerNavbar";


// function MenuItems() {
//   const { menuList, isLoading, error } = useMenuList();
//   const [ID, setIdToDelete] = useState("");
//   const { deleteMenuItem } = useDeleteMenu();
//   const { updateMenu } = useUpdateMenu();

//   const [IdToUpdate, setIdToUpdate] = useState("");
//   const [productName, setProductName] = useState("");
//   const [Price, setPrice] = useState("");
//   const [category, setCategory] = useState("");

//   if (isLoading) {
//     return (
//       <div className="alert alert-primary" role="alert">
//         Loading...
//       </div>
//     );
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const getUpdateMenu = (menu) => {
//     setIdToUpdate(menu._id);
//     setProductName(menu. productName);
//     setPrice(menu.Price);
//     setCategory(menu.category);


//   };

//   const updateDetails = async () => {
//     await updateMenu(
//       IdToUpdate,
//       productName,
//       Price,
//       category,


//     );
//   };

//   const bufferToBase64 = (buf) => {
//     var binstr = Array.prototype.map
//       .call(buf, function (ch) {
//         return String.fromCharCode(ch);
//       })
//       .join("");
//     return btoa(binstr);
//   };

//   const handleDelete = async () => {
//     await deleteMenuItem(ID);
//     //console.log(isLoading, "handleDelete loading");
//     setIdToDelete('');
//   };



//   // const handleupdate = async (ID) => {

//   //   setIdToDelete('');
//   //   await updateMenuItem(ID)

//   // }

//   return (
//     <div className="row p-0">
//       <RestaurantNavbar />
//       <div className="col">

//           <h1 className="mb-4 mt-5">Menu Management</h1>

//           <a href="/AddMenu" className="btn btn-info mb-5">
//             Add New Menu Item
//           </a>

//           <div className="row d-flex align-items-center justify-content-around mb-3">
//             {menuList.map((menu) => (
//               <div key={menu._id} className="col-lg-3">
//                 <div className="card mb-4">
//                   <div className="card-body">
//                     {menu.Image && menu.Image.data && (
//                       <img
//                       style={{ width: "10rem" }}
//                       src={`data:${
//                         menu.Image.contentType
//                       };base64,${bufferToBase64(menu.Image.data.data)}`}
//                       className="card-img-top mb-1"
//                       alt={menu.Image}
//                     />
//                     )}
//                     <h5 className="card-title">{menu.productName}
//                     </h5>
//                     <p className="card-text fw-medium">
//                       Rs.{menu.Price}.00

//                     </p>
//                     <p className="card-text fw-medium">{menu.category}
//                    </p>
//                     <a
//                       href="#"
//                       className="btn btn-danger "
//                       data-bs-toggle="modal"
//                       data-bs-target="#Modal"
//                       onClick={() => setIdToDelete(menu._id)}
//                     >
//                       Delete Item
//                     </a>
//                     <a className="btn btn-primary"
//                       onClick={() => getUpdateMenu(menu._id)}
//                       href="/updateMenu"
//                     >Update</a>
//                   </div>
//                 </div>
//               </div>
//             ))}


//             {/* </div> */}
//           </div>


//         {/* model  */}
//         <div
//           className="modal fade"
//           id="Modal"
//           tabindex="-1"
//           aria-labelledby="exampleModalLabel"
//           aria-hidden="true"
//         >
//           <div className="modal-dialog modal-dialog-centered">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="exampleModalLabel">
//                   CAUTION
//                 </h1>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 ></button>
//               </div>
//               <div className="modal-body">
//                 Are you sure you want to delete this Menu Item?
//               </div>
//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                 >
//                   Close
//                 </button>

//                 <form action="" method="delete">
//                   <button
//                     className="btn btn-outline-danger"
//                     onClick={handleDelete}
//                   >
//                     DELETE
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default MenuItems;


import React, { useState } from "react";
import useMenuByCategory from "../../../hooks/Client/restaurant/useDisplayMenu";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import RestaurantNavbar from "../../../components/RestaurantManagerNavbar";
import useDeleteMenu from "../../../hooks/Staff/restaurantManager/useDeleteMenuItem";
import useUpdateMenu from "../../../hooks/Staff/restaurantManager/useUpdateMenuItem";

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



const MenuItems = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(
    location.state?.category || defaultCategory
  );

  const { menuItems, isLoading, error } = useMenuByCategory(selectedCategory);
  const [ID, setIdToDelete] = useState("");
  const { deleteMenuItem } = useDeleteMenu();
  const { updateMenu } = useUpdateMenu();

  const [IdToUpdate, setIdToUpdate] = useState("");
  const [productName, setProductName] = useState("");
  const [Price, setPrice] = useState("");
  const [category, setCategory] = useState("");




  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  const token = localStorage.getItem('user');


  const getUpdateMenu = (menu) => {
    setIdToUpdate(menu._id);
    setProductName(menu. productName);
    setPrice(menu.Price);
    setCategory(menu.category);


  };


  const updateDetails = async () => {
    await updateMenu(
      IdToUpdate,
      productName,
      Price,
      category,


    );
  };


  const handleDelete = async () => {
    await deleteMenuItem(ID);
    //console.log(isLoading, "handleDelete loading");
    setIdToDelete('');
  };



  const handleupdate = async (ID) => {

    setIdToDelete('');
    // await updateMenuItem(ID)

  }

  const handleSelect = (productName, price,_id) => {
    if(!token){
      alert("you need to login first")
      navigate("/login")
      return
    }
    else {navigate("/updateMenu", {
      state: {
        productname:productName,
        price,
        _id
      },
    });
  };}

  return (
    <div className="row p-0">
      <RestaurantNavbar />
<div className="col">
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
                    <a
                      href="#"
                      className="btn btn-danger "
                      data-bs-toggle="modal"
                      data-bs-target="#Modal"
                      onClick={() => setIdToDelete(menu._id)}
                    >
                      Delete Item
                    </a>
                    <a className="btn btn-primary"
                      onClick={() => handleSelect(menu.productName, menu.Price,menu._id)}
                   >Update</a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div></div>
  );
};

export default MenuItems;


