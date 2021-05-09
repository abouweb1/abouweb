import { useState, useEffect, useContext } from "react";
import { DisplayLoadingOverlayHandler } from "../utilities/Contexts";
import Head from 'next/head';
import requester from "../utilities/requester";
import Layout from "../layout/Layout";
import HeroSection from '../components/HeroSection/HeroSection'
import ConatctUs from '../components/ConatctUs/ConatctUs'
import ProductsSection from '../components/ProductsSection/ProductsSection'

function Home(props) {
  const [productsData, setProductsData] = useState(null);
  const setDisplayLoadingOverlay = useContext(DisplayLoadingOverlayHandler);
  useEffect(() => {
    setDisplayLoadingOverlay(true);
    fetchProductsData()
  }, [])

  const fetchProductsData = async () => {
    console.log("initiate data requests");
    const product_en = await requester.get(`/products/activeProducts/en`).catch(() => { });
    const product_ar = await requester.get(`/products/activeProducts/ar`).catch(() => { });
    const hero_product_ar = await requester.get(`/products/getHeroSecProducts/ar`).catch(() => { });
    const hero_product_en = await requester.get(`/products/getHeroSecProducts/en`).catch(() => { });
    setDisplayLoadingOverlay(false);
    if (product_en && product_ar && hero_product_en && hero_product_ar) {
      console.log("all data fetched successfully");
      let productsData = {
        products: {
          en: product_en.data,
          ar: product_ar.data
        },
        heroProducts: {
          en: hero_product_en.data,
          ar: hero_product_ar.data
        }
      };

      setProductsData(productsData)
    }
  }
  return (
    <>
      <Head>
        <title>Abou | Home</title>
        <meta name="description" content="ثقة عملاءنا سر نجاحنا على مدار ٥٠ عام منتجات أبو العزم محمد محمد أبو العزم جودة عالمية بأيادي مصرية" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://abou.vercel.app/" />
        <meta property="og:description" content="ثقة عملاءنا سر نجاحنا على مدار ٥٠ عام منتجات أبو العزم محمد محمد أبو العزم جودة عالمية بأيادي مصرية" />
        <meta property="og:image" content="/assets/logo-seo.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://abou.vercel.app" />
        <meta property="twitter:description" content="ثقة عملاءنا سر نجاحنا على مدار ٥٠ عام منتجات أبو العزم محمد محمد أبو العزم جودة عالمية بأيادي مصرية" />
        <meta property="twitter:image" content="/assets/logo-seo.png" />

      </Head>
      <Layout>
        <HeroSection products={productsData?.heroProducts} />
        <ProductsSection products={productsData?.products} />
        <ConatctUs />
      </Layout>
    </>
  )
}

export default Home;
