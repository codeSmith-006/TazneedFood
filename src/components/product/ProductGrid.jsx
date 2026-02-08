"use client";

import React from 'react';
import ProductCard from './ProductCard';
const ProductGrid = ({ products, columns = 4 }) => {
    const gridCols = {
        2: 'grid-cols-2 sm:grid-cols-2',
        3: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    };
    if (products.length === 0) {
        return (<div className="text-center py-16">
        <p className="text-muted-foreground text-lg">No products found</p>
      </div>);
    }
    return (<div className={`grid ${gridCols[columns]} gap-4 sm:gap-6`}>
      {products.map((product, index) => (<ProductCard key={product.id} product={product} index={index}/>))}
    </div>);
};
export default ProductGrid;
