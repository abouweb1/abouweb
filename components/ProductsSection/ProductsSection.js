import React from 'react';
import { useRouter } from "next/router";
import SingleProductSection from './SingleProductSection/SingleProductSection';

const ProductsSection = (props) => {

  const productsList = useRouter().locale === "en" ? props?.products?.en || [] : props?.products?.ar || [];

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