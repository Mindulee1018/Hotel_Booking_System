import React from 'react';
//import ManagerPanel from '../../components/RoomManagerNavbar';
import RoomSideBar from '../../../components/RoomSideBar';
function Profile() {
    return (
        <div>
            <RoomSideBar/>
            <h2>Profile</h2>
            <p>Name: Your Name</p>
            <p>Email: your.email@example.com</p>
        </div>
    );
}

export default Profile;
