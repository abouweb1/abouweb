import Head from 'next/head';
import Layout from "../layout/Layout";
import HeroSection from '../components/HeroSection/HeroSection'
import ConatctUs from '../components/ConatctUs/ConatctUs'
import ProductsSection from '../components/ProductsSection/ProductsSection'

function Home() {

  return (
    <>
      <Head>
        <title>Abou | Home</title>
        <meta name="description" content="ثقة عملاءنا سر نجاحنا على مدار ٥٠ عام منتجات أبو العزم محمد محمد أبو العزم جودة عالمية بأيادي مصرية" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aboulazm.com" />
        <meta property="og:description" content="ثقة عملاءنا سر نجاحنا على مدار ٥٠ عام منتجات أبو العزم محمد محمد أبو العزم جودة عالمية بأيادي مصرية" />
        <meta property="og:image" content="/assets/logo-seo.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://aboulazm.com" />
        <meta property="twitter:description" content="ثقة عملاءنا سر نجاحنا على مدار ٥٠ عام منتجات أبو العزم محمد محمد أبو العزم جودة عالمية بأيادي مصرية" />
        <meta property="twitter:image" content="/assets/logo-seo.png" />

      </Head>
      <Layout>
        <HeroSection/>
        <ProductsSection />
        <ConatctUs />
      </Layout>
    </>
  )
}

export default Home;
