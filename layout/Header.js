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
      <div className={`container ${styles.header_wrapper}`} dir="auto">
        <div>
          <Link href="/">
            <a><img src="/assets/logo-en.png" alt="abou" /></a>
          </Link>
        </div>

        <div className={styles.navLinks}>

          {router.pathname === "/" ?
            <>
              <a id="homeHeroSection" onClick={windowScroll}>{router.locale === "ar" ? "الرئيسية" : "home"}</a>
              <a id="products" className="hiddenInMobile" onClick={windowScroll}>{router.locale === "ar" ? "المنتجات" : "Products"}</a>
            </>
            :
            <Link href="/"><a>{router.locale === "ar" ? "الرئيسية" : "home"}</a></Link>
          }

          <a id="contactUs" onClick={windowScroll}>{router.locale === "ar" ? "تواصل" : "Contact"}</a>

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