import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import InventorySideBar from '../../../components/InventoryManagerSideBar';

const RoomItemRestock = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const [state, setState] = useState({
    Rid: '',
    items: [{
      itemName: '',
      quantity: 0
    }]
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:4000/roominventory');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const restockRoomItems = async (Rid) => {
    try {
      const response = await axios.put(`http://localhost:4000/api/restock/${Rid}`, { // Enclosed in backticks
        itemName: 'Your Item Name',
        quantity: 1 // You can adjust the quantity as needed
      });
      console.log(response.data.message);
      fetchRooms(); // Fetch updated rooms data after restocking
    } catch (error) {
      console.error('Error restocking room items:', error);
    }
  };
  

  const onSubmit = async (e) => {
    e.preventDefault();

    const { itemID, itemName, description, unit_price, stockCount } = state;

    const data = {
      itemID,
      itemName,
      description,
      unit_price,
      stockCount,
      // reorderPoint
    };

    try {
      const response = await fetch(`http://localhost:4000/RoomRestock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Items restocked successfully');
        navigate(-1);
      } else {
        throw new Error('Failed to restock the items');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <div>
      <h2>Room Item Restocking</h2>
      <ul>
        {rooms.map(room => (
          <li key={room.Rid}>
            Room Number: {room.Rid}
            <button onClick={() => restockRoomItems(room.Rid)}>Restock Items</button>
            {room.items && (
            <ul>
              {room.items.map(item => (
                <li key={item.itemName}>
                  {item.itemName}: {item.quantity}
                </li>
              ))}
            </ul>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
};

export default RoomItemRestock;