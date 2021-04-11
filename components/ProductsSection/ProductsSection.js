import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import requester from "../../utilities/requester";
import Base64Image from "../ImageComponent/Base64Image";
import SingleProductSection from './SingleProductSection/SingleProductSection';
import Products from "../../DummyData/Products";

const ProductsSection = () => {
  const [base64ImgSrcList, setBase64ImgSrcList] = useState([]);
  const [APIimgSrcList, setAPIImgSrcList] = useState([]);

  useEffect(() => {
    requester.get("/products/allProducts").then((res) => {
      setAPIImgSrcList(res.data);
    }).catch((err) => {
      console.log(err)
    })
  }, [])


  const uploadHandler = (e) => {
    const files = e.target.files;
    // console.log(files);
    const srcList = [];
    for (const file in files) {
      // only prints the files (which is originally objects)
      if (typeof (files[file]) === "object") {
        // console.log(files[file])
        const reader = new FileReader();
        reader.onloadend = () => {
          // use a regex to remove data url part
          const base64String = reader.result;
          // console.log(base64String);
          srcList.push(base64String);
        };
        reader.readAsDataURL(files[file]);
      }

    }

    setTimeout(() => { setBase64ImgSrcList(srcList) }, 1000)



  };

  const productsList = useRouter().locale === "en" ? Products.en_products : Products.ar_products;

  return (
    <div id="#products">
  
      {/* {APIimgSrcList.map((el, index) => {
        if (el.productImage) {
          return (
            <Base64Image
              key={index}
              src={el.productImage}
              alt="Red dot"
              style={{ border: "red 1px solid", margin: "10px", width: "10rem" }}
            />
          )
        }
      }
      )}

      {base64ImgSrcList.map((el, index) => {
        return (
          <Base64Image
            key={index}
            src={el}
            alt="Red dot"
            style={{ border: "red 1px solid", margin: "10px", width: "10rem" }}
          />
        )
      })}

      <br />

      <input type="file" multiple onChange={uploadHandler} /> */}

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