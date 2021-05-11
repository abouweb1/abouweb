import Head from 'next/head'
import { useRouter } from 'next/router'
import requester from "../../utilities/requester";
import Layout from "../../layout/Layout";
import SingleProductSection from '../../components/ProductsSection/SingleProductSection/SingleProductSection'
import ConatctUs from '../../components/ConatctUs/ConatctUs'


function product(props) {
  const router = useRouter()
  const { id } = router.query
  const product = useRouter().locale === "en" ? props.product.en : props.product.ar;
  return (
    <>
      <Head>
        <title>Abou | {product.title}</title>
        <meta name="description" content={product.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://aboulazm.com/product/${id}`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={`${product.productImage}`} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://aboulazm.com/product/${id}`} />
        <meta property="twitter:description" content={product.description} />
        <meta property="twitter:image" content={`${product.productImage}`} />
      </Head>
      <Layout>
        <SingleProductSection
          id={product.productId}
          {...product}
        />
        <ConatctUs />
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  
  const product_en = await requester.get(`/products/productById/en/${id}`).catch(()=>{});
  const product_ar = await requester.get(`/products/productById/ar/${id}`).catch(()=>{});

  const product = {
    en : product_en.data[0],
    ar : product_ar.data[0]
  }; 
  
  if(product.en && product.ar){
    return {
      props: {product : product}, // will be passed to the page component as props
    }
  }
  else{
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      }
    }
  }
}

export default product;
