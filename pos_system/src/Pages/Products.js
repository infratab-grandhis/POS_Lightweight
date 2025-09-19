import React, { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux'

import OuterLayout from '../Layouts/OuterLayout.js';
import Product from '../Components/Product.js';
 
const Products = () => {
    const productsList = useSelector(state => state.productReducer.productsList);
    return (
        <OuterLayout>
            <div className='productslist-container'>   
                {
                    productsList.map(item => <Product key={item?.id} product={item} />)
                }
            </div>
        </OuterLayout>
    );
}
  
export default Products;