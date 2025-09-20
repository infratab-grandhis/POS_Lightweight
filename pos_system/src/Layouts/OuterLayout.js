import React, { useState } from 'react';
import './Layout.css';
import Sidebar from '../Components/Sidebar';
 
const OuterLayout = (props) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div className='layout'>
            <nav>
                <button className="hamburger-menu" onClick={toggleSidebar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <h3>Food-Truck-Pos</h3>
            </nav>
            <main>
                {props.children}
            </main>
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        </div>
    );
}
  
export default OuterLayout;