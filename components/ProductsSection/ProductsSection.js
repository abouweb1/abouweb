import React from 'react';
import { useRouter } from "next/router";
import SingleProductSection from './SingleProductSection/SingleProductSection';
import productsList from "../../data.json";

const ProductsSection = (props) => {

  return (
    <div id="#products" style={{minHeight:"100vh"}}>

      {productsList.map((product) => {
        return (
          <SingleProductSection
            key={product.productId}
            id={product.productId}
            {...product}
            showProdcutLink
          />
        )
      })}

    </div>
  );
};

export default ProductsSection;