import React from 'react';
import { CustomerChoiceGrid } from '../CustomerChoiceGrid';
import { NewSeasonGrid } from '../NewSeasonGrid';
import { HeroProduct } from '../HeroProduct';
import { MonthlyDealCarousel } from '../MonthlyDealCarousel';
import { BestSellersGrid } from '../BestSellersGrid';
import { FullCatalogGrid } from '../FullCatalogGrid';
import { Dupla } from '../Dupla';

function renderLayout(productsChunk, index) {

    const layoutMap = {
        1: HeroProduct,
        2: Dupla,
        3: NewSeasonGrid,
        4: CustomerChoiceGrid,
        6: MonthlyDealCarousel,
        8: BestSellersGrid,
    };

    const LayoutComponent = layoutMap[productsChunk.length] || FullCatalogGrid;

    console.log(productsChunk.length)

    return <LayoutComponent key={index} products={productsChunk} />;
}

export { renderLayout };