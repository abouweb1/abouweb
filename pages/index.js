import Head from 'next/head'
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
        <meta property="og:type" content="website"/>
        <meta property="og:url" content="https://abou.vercel.app/"/>
        <meta property="og:description" content="ثقة عملاءنا سر نجاحنا على مدار ٥٠ عام منتجات أبو العزم محمد محمد أبو العزم جودة عالمية بأيادي مصرية"/>
        <meta property="og:image" content="/assets/logo-seo.png"/>

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image"/>
        <meta property="twitter:url" content="https://abou.vercel.app"/>
        <meta property="twitter:description" content="ثقة عملاءنا سر نجاحنا على مدار ٥٠ عام منتجات أبو العزم محمد محمد أبو العزم جودة عالمية بأيادي مصرية"/>
        <meta property="twitter:image" content="/assets/logo-seo.png"/>

      </Head>
        <HeroSection/>
        <ProductsSection/>
        <ConatctUs/>
    </>
  )
}



export default Home;
