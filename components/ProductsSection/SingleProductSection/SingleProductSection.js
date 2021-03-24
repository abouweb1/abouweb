import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import ImageGallery from 'react-image-gallery';
import { IoCheckmark } from "react-icons/io5";
import PrimaryButton from '../../Button/PrimaryButton';
import styles from "./SingleProductSection.module.scss";

const SingleProductSection = (props) => {
    const router = useRouter();

    const images = props.imgNames.map(imgName => {
        return(
            {
                original  : `/assets/products/${imgName}.jpg`,
                thumbnail : `/assets/products/${imgName}.jpg`
            }
        )
    })
    return (
        <section className={styles.productSection}>

            <div className={`${styles.productSectionContainer} container`}>
                <div className={styles.imgContainer}>
                    {router.pathname === "/" ?
                        <img src={`/assets/products/${props.imgName}.jpg`} />
                        :
                        <ImageGallery
                            items={images}
                            showThumbnails={false}
                            showPlayButton={false}
                            showNav={true}
                            showBullets={true}
                            showFullscreenButton={false}
                            useBrowserFullscreen={false}
                        />
                    }
                </div>
                <div
                    className={styles.info}
                    style={{
                        direction: router.locale === "ar" && "rtl",
                        textAlign: router.locale === "ar" && "right",
                    }}
                >

                    <p className={styles.superTitle}>{props.superTitle}</p>
                    <h1 className={styles.title}>{props.name}</h1>
                    <p className={styles.description}>{props.description}</p>

                    <ul>
                        {props.list.map((listItem, idx) => {
                            return (
                                <li key={idx}><IoCheckmark />&nbsp;{listItem}</li>
                            )
                        })}
                    </ul>

                    {props.showProdcutLink &&
                        <Link href={`/product/${props.id}`} locale={router.locale === "ar" ? "ar" : "en"}>
                            <a>
                                <PrimaryButton>Check Now</PrimaryButton>
                            </a>
                        </Link>
                    }

                </div>
            </div>
        </section>
    );
};

export default SingleProductSection;