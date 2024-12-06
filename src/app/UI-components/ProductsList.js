import React from 'react';
import './ProductsList.css'
import { Link } from 'react-router-dom';

function ProductsList({items}) {
  return (
    <ul className='productslist-container'>
      {items.map((item) => (<Link key={item.id} to={`/${item.id}`}>
        <li >{item.product}</li>
      </Link>
      ))}
    </ul>
  );
}

export {ProductsList};
