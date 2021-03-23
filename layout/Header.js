import Link from 'next/link';
import styles from "./layout.module.scss"

const Header = () => {
    return (
        <header className={styles.header}>
        <div className={`container ${styles.header_wrapper}`}>
          <div>
            <Link href="/">
            <a><img src="/assets/logo-en.png" alt="abou" /></a>
            </Link>
          </div>
          <div>
            <Link href="/">
                <a>Home</a>
            </Link>
            <Link href="/users">
                <a>Products</a>
            </Link>
            <Link href="/users">
                <a>Contact</a>
            </Link>

          </div>
        </div>
      </header>
    );
};

export default Header;