import Head from 'next/head'
import { useRouter } from 'next/router'
import Layout from "../../layout/Layout";
import SingleProductSection from '../../components/ProductsSection/SingleProductSection/SingleProductSection'
import ConatctUs from '../../components/ConatctUs/ConatctUs'
import productsList from "../../data.json";

function product() {
  const router = useRouter()
  const { id } = router.query
  const product = productsList?.find(product=>product?.productId === id)
  return (
    <>
      <Head>
        <title>Abou | {router.locale === "ar" ? product.title_ar : product.title}</title>
        <meta name="description" content={product.description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content={`https://aboulazm.com/product/${id}`} />
        <meta property="og:description" content={router.locale === "ar" ? product.description_ar : product.description_ar} />
        <meta property="og:image" content={`${product.productImage}`} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={`https://aboulazm.com/product/${id}`} />
        <meta property="twitter:description" content={router.locale === "ar" ? product.description_ar : product.description} />
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

export default product;
