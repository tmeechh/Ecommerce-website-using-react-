import React from 'react'
import './Breadcrum.css'
import { Link, useLocation } from 'react-router-dom';

import arrow from '../Assets/breadcrum_arrow.png'

const Breadcrum = ({product}) => {
   
  if (!product) {
    return null; // or return a loading indicator, or some fallback UI
  }

  const categoryToPath = {
    men: 'mens',
    women: 'womens',
    kids: 'kids',
  };


  const categoryPath = `/${categoryToPath[product.category.toLowerCase()]}`;

  
  return (
    <div className='breadcrum'>
      
       <Link to='/'>HOME</Link> <span><img src={arrow} alt="" /></span> <Link to='/'>SHOP</Link> <img src={arrow} alt="" />   <Link to={categoryPath}>{product.category.toUpperCase()}</Link> <img src={arrow} alt="" /> {product.name}
    </div>
  )
}

export default Breadcrum