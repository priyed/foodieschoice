import React from 'react';
import Product from '../Products/Product/Product';
import ShopNavigation from "../ShopNavigation/ShopNavigation"

const Lunch = ({ products, categories }) => {

     const filterProductsByCategory = (categoryName) => {
         const cat = categories.find(category => category.name === categoryName);
         console.log(cat)
         if(!cat) {
             return [];
         }
         return products.filter(product => product.categories.find(productCategory => productCategory.id === cat.id))
     }

    return (
        <>
        <ShopNavigation categories={categories}/>
        <div className="section-center">
            {filterProductsByCategory("Lunch").map((product) => (
                <Product product={product} />
            ))}
        </div>
        </>
    )
}

export default Lunch;