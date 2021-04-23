import React from 'react';
import Product from '../Products/Product/Product';
import ShopNavigation from "../ShopNavigation/ShopNavigation"

const Breakfast = ({ products, categories, onAddToCart }) => {

     const filterProductsByCategory = (categoryName) => {
         const cat = categories.find(category => category.name === categoryName);
         
         if(!cat) {
             return [];
         }
         return products.filter(product => product.categories.find(productCategory => productCategory.id === cat.id))
     }

    return (
        <>
        <ShopNavigation categories={categories}/>
        <div className="section-center">
            {filterProductsByCategory("Breakfast").map((product) => (
                <Product product={product} addToCart={onAddToCart}/>
            ))}
        </div>
        </>
    )
}


export default Breakfast
