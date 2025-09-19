import React from 'react';
import './Layout.css';
 
const OuterLayout = (props) => {
    return (
        <div className='layout'>
            <nav>
                <h3>Food-Truck-Pos</h3>
            </nav>
            <main>
                {props.children}
            </main>
        </div>
    );
}
  
export default OuterLayout;