import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RoomItemRestock = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('/api/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const restockRoomItems = async (Rid) => {
    try {
      const response = await axios.put(`/api/restock/${Rid}`, {
        itemName: 'Your Item Name',
        quantity: 1 // You can adjust the quantity as needed
      });
      console.log(response.data.message);
      fetchRooms(); // Fetch updated rooms data after restocking
    } catch (error) {
      console.error('Error restocking room items:', error);
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
            <ul>
              {room.items.map(item => (
                <li key={item.itemName}>
                  {item.itemName}: {item.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomItemRestock;