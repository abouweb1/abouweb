import Head from 'next/head'
import { useState } from 'react'
import { DisplayLoadingOverlayHandler } from "../utilities/Contexts";
import AnimationOverlay from '../components/animationOverlay/AnimationOverlay';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.scss'

// styling for "react image gallery" package.
import "react-image-gallery/styles/scss/image-gallery.scss";

// styling for "devextreme" package.
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';

function MyApp({ Component, pageProps }) {
  
  const [displayLoadingOverlay, setDisplayLoadingOverlay] = useState(false)
  
  return (
    <DisplayLoadingOverlayHandler.Provider value={setDisplayLoadingOverlay}>
      <div className={"layout"}>
        <Head>
          <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"/>
          <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"/>
          <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"/>
          <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"/>
          <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"/>
          <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"/>
          <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"/>
          <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"/>
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"/>
          <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png"/>
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
          <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"/>
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
          <link rel="manifest" href="/manifest.json"/>
          <meta name="msapplication-TileColor" content="#ffffff"/>
          <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"/>
          <meta name="theme-color" content="#ffffff"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          {/* <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/> */}
          {/* <link href="https://fonts.googleapis.com/css2?family=Balsamiq+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet"/> */}
          <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@200;300;400;500;700;800;900&display=swap" rel="stylesheet"/>
        </Head>
          {displayLoadingOverlay && <AnimationOverlay/>}
          <ToastContainer />
          <Component {...pageProps}/>
      </div>
    </DisplayLoadingOverlayHandler.Provider>

  )
}

export default MyApp
