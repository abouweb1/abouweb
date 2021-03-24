import { useRouter } from "next/router";
import Link from 'next/link';
import styles from "./layout.module.scss"
import { GrLanguage } from "react-icons/gr";

const Header = () => {
  const router = useRouter();

  const windowScroll = (e) => {
    if (document.getElementById(`#${e.target.id}`)) {
      window.scrollBy({
        top: document.getElementById(`#${e.target.id}`).getBoundingClientRect().top,
        left: 0,
        behavior: 'smooth'
      });
    }
  }

  return (
    <header className={styles.header}>
      <div
        className={`container ${styles.header_wrapper}`}
        style={{
          direction: useRouter().locale === "ar" && "rtl",
          textAlign: useRouter().locale === "ar" && "right",
        }}
      >
        <div>
          <Link href="/">
            <a><img src="/assets/logo-en.png" alt="abou" /></a>
          </Link>
        </div>

        <div className={styles.navLinks}>

          {router.pathname === "/" ?
            <>
              <a id="homeHeroSection" onClick={windowScroll}>Home</a>
              <a id="products" onClick={windowScroll}>Products</a>
            </>
            :
            <Link href="/"><a>Home</a></Link>
          }

          <a id="contactUs" onClick={windowScroll}>Contact</a>

          <Link href={router.asPath} locale={router.locale === "ar" ? "en" : "ar"}>
            <a>
              <span>{router.locale === "ar" ? "English" : "العربية"}</span>
                  &nbsp;
                  <GrLanguage />
            </a>
          </Link>


        </div>

      </div>
    </header>
  );
};

export default Header;

{/* <button onClick={() => {
              router.push(`${window.location.pathname}`, `${window.location.pathname}`, { locale: 'ar' })
            }}>change</button> */}