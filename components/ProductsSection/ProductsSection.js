import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import requester from "../../utilities/requester";
import Base64Image from "../ImageComponent/Base64Image";
import SingleProductSection from './SingleProductSection/SingleProductSection';
import Products from "../../DummyData/Products";

const ProductsSection = (props) => {

  const productsList = useRouter().locale === "en" ? props.products.en : props.products.ar;

  return (
    <div id="#products">

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