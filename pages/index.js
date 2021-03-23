import Head from 'next/head'
import HeroSection from '../components/HeroSection/HeroSection'
import ConatctUs from '../components/ConatctUs/ConatctUs'
import ProductSection from '../components/ProductSection/productSection'

function Home(props) {

  const langHandler = () =>{
    props.setLang( props.lang === "en" ? "fr" : "en") 
  }

  const products = [
    {
      imgName:"yg2",
      name:"Product 1 Name",
      superTitle:"",
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      list:[
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet"
      ]
    },
    {
      imgName:"wg1",
      name:"Product 2 Name",
      superTitle:"SuperTitle",
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      list:[
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet"
      ]
    },
    {
      imgName:"tl4",
      name:"Product 3 Name",
      superTitle:"SuperTitle",
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      list:[
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet"
      ]
    },
    {
      imgName:"tm8",
      name:"Product 4 Name",
      superTitle:"SuperTitle",
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      list:[
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet"
      ]
    },
    {
      imgName:"ts3",
      name:"Product 5 Name",
      superTitle:"SuperTitle",
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      list:[
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet"
      ]
    },
    {
      imgName:"cc1",
      name:"Product 6 Name",
      superTitle:"SuperTitle",
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      list:[
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet"
      ]
    },
    {
      imgName:"pc1",
      name:"Product 7 Name",
      superTitle:"SuperTitle",
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      list:[
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet"
      ]
    },
    {
      imgName:"ic1",
      name:"Product 8 Name",
      superTitle:"SuperTitle",
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      list:[
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet"
      ]
    },
    {
      imgName:"mu1",
      name:"Product 9 Name",
      superTitle:"SuperTitle",
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      list:[
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet",
        "Lorem ipsum dolor sit amet"
      ]
    }
  ];

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
        {products.map((product, idx)=>{
          return(
            <ProductSection
              key={idx}
              imgSrc={`/assets/products/${product.imgName}.jpg`}
              superTitle={product.superTitle}
              name={product.name}
              description={product.description}
              list={product.list}
            
            />
          )
        })}
    
        <ConatctUs/>
    </>
  )
}



export default Home;
