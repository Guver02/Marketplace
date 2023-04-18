import styles from './page.module.css';
import {Information} from "./Information";
import {Recomendation} from "./Recomendation";
import React, { useContext } from 'react';

import { ItemsContext } from '../providers/ItemsContex';
import { Navbar } from '../UI-components/Navbar';
import { SliderCategories } from './SliderCategories';




  
function Home () {  
  const {products} = useContext(ItemsContext)
  const data = products[0]

    return (<>
      <div className={styles.container}>

        <Navbar/>

        <div className={styles.spaceBetween}>

          <div className={styles.productDescription}>
          <span  className={styles.title}>TOP SALE</span>
          <span className={styles.description}>{data.product}</span>
          <button className={styles.shopButton}>SHOP NOW</button>
          </div>

          <div className={styles.productImage}>
          <img className={styles.principalImg} alt={data.product} src='/assets/oneitem.png'></img>
          </div>
        
        </div>
        <SliderCategories/>
        <Information/>
        <Recomendation/>
      </div>
      </>);
  }

  export {Home}