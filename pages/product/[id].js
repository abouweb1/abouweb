import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from "../../layout/Layout";
import SingleProductSection from '../../components/ProductsSection/SingleProductSection/SingleProductSection'
import ConatctUs from '../../components/ConatctUs/ConatctUs'
import Products from "../../DummyData/Products";



function product(props) {
  const router = useRouter()
  const { id } = router.query
  const productsList = useRouter().locale === "en" ? Products.en_products : Products.ar_products;
  const singleProduct = productsList[id]
  return (
    <>
      <Head>
        <title>Abou | {props.singleProduct.name}</title>
        <meta name="description" content={props.singleProduct.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https:/abouweb-abouweb1.vercel.app/product/${props.id}`} />
        <meta property="og:description" content={props.singleProduct.description} />
        <meta property="og:image" content={`/assets/products/${props.singleProduct.imgName}.jpg`} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https:/abouweb-abouweb1.vercel.app/product/${props.id}`} />
        <meta property="twitter:description" content={props.singleProduct.description} />
        <meta property="twitter:image" content={`/assets/products/${props.singleProduct.imgName}.jpg`} />
      </Head>
      <Layout>
        <SingleProductSection
          id={props.id}
          {...props.singleProduct}
        />
        <ConatctUs />
      </Layout>
    </>
  )
}

export async function getServerSideProps(context) {
  const id = context.params.id;
  // console.log(context);
  const productsList = context.locale === "en" ? Products.en_products : Products.ar_products;
  const singleProduct = productsList[id];

  if (singleProduct) {
    return {
      props: { singleProduct: singleProduct }, // will be passed to the page component as props
    }
  }
  else {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      }
    }
  }

}

export default product;