import React from 'react';
import { useNavigate } from 'react-router-dom';

import OuterLayout from '../Layouts/OuterLayout.js';
import pages from './Constants.js';


const containerStyles = {
    'display': 'flex',
    'flexDirection': 'column',
    'justifyContent': 'center',
    'alignItems': 'center',
    'margin': "50% auto"
}


const Home = () => {
    const navigate = useNavigate();
    
    const navigateToProductsPage = () => {
        navigate(pages?.products);
    }

    return (
        <OuterLayout>
            <div style={containerStyles}>
                <h3>Welcome To the Food-Truck-POS</h3>
                <button className='button-primary' onClick={navigateToProductsPage}>Start Here</button>
            </div>
        </OuterLayout>
    );
}

export default Home;