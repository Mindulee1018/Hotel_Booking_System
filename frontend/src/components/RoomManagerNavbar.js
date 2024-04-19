import React from 'react';

function ManagerPanel() {
    return (
        <div>
            <nav style={{ backgroundColor: "#1E3A8A" , overflow: 'hidden' }}>
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                    <li style={{ float: 'left' }}>
                        <a href="/Profile" style={{ display: 'block', color: 'white', textAlign: 'center', padding: '14px 20px', textDecoration: 'none' }}>Profile</a>
                    </li>
                    <li style={{ float: 'left' }}>
                        <a href="/Bookings" style={{ display: 'block', color: 'white', textAlign: 'center', padding: '14px 20px', textDecoration: 'none' }}>Bookings</a>
                    </li>
                    <li style={{ float: 'left' }}>
                        <a href="/AddRoom" style={{ display: 'block', color: 'white', textAlign: 'center', padding: '14px 20px', textDecoration: 'none' }}>Add Room</a>
                    </li>

                    <li style={{ float: 'left' }}>
                        <a href="/ManageRoom" style={{ display: 'block', color: 'white', textAlign: 'center', padding: '14px 20px', textDecoration: 'none' }}>Manage Room</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default ManagerPanel;
