import { useRouter } from "next/router"
import SingleProductSection from './SingleProductSection/SingleProductSection';
import Products from "../../DummyData/Products";

const ProductsSection = () => {
  const productsList = useRouter().locale === "en" ? Products.en_products : Products.ar_products;
  return (
    <div id="#products">
      {productsList.map((product, idx) => {
        return (
          <SingleProductSection
            key={idx}
            id={idx}
            {...product}
            showProdcutLink
          />
        )
      })}
    </div>
  );
};

export default ProductsSection;