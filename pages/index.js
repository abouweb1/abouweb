import Head from 'next/head'
import requester from "../utilities/requester";
import Layout from "../layout/Layout";
import HeroSection from '../components/HeroSection/HeroSection'
import ConatctUs from '../components/ConatctUs/ConatctUs'
import ProductsSection from '../components/ProductsSection/ProductsSection'

function Home(props) {

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
        <HeroSection products={props.heroProducts} />
        <ProductsSection products={props.products} />
        <ConatctUs />
      </Layout>
    </>
  )
}


export async function getServerSideProps(context) {
  console.log("initiate data requests");
  const product_en = await requester.get(`/products/activeProducts/en`).catch(() => { });
  const product_ar = await requester.get(`/products/activeProducts/ar`).catch(() => { });
  const hero_product_ar = await requester.get(`/products/getHeroSecProducts/ar`).catch(() => { });
  const hero_product_en = await requester.get(`/products/getHeroSecProducts/en`).catch(() => { });

  if ( product_en && product_ar && hero_product_en && hero_product_ar ) {
    console.log("all data fetched successfully");
    let data = {
      products:{
        en: product_en.data,
        ar: product_ar.data
      },
      heroProducts:{
        en: hero_product_en.data,
        ar: hero_product_ar.data
      }
    };

    return {
      props: { ...data }, // will be passed to the page component as props
    }

  }
  else{
    console.log("failed to fetch data, redirect to '/404'");
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      }
    }
  }

}



export default Home;
