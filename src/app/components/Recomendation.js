import React from 'react';
import { useStore } from '../providers/ItemsContex';
import styles from './Recomendation.module.css';
import { renderLayout } from '../product-layouts/utils/renderLayout';

function Recomendation() {
    const {sections} = useStore();

    console.log('Render Recomendation')

    return (
        <div className={styles.recomendationContainer}>
            <h1>Our Products</h1>
        
                {sections.map((chunk, i) => renderLayout(chunk, i))}
            
        </div>
    );
}

export { Recomendation };
