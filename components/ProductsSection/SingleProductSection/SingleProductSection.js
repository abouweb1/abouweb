import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import ImageGallery from 'react-image-gallery';
import { IoCheckmark } from "react-icons/io5";
import PrimaryButton from '../../Button/PrimaryButton';
import styles from "./SingleProductSection.module.scss";

const SingleProductSection = (props) => {
    const router = useRouter();

    const images = props.gallery.map((img) => {
        return (
            {
                original: img.imageUrl,
                thumbnail: img.imageUrl,
                originalAlt: props.title
            }
        )
    })

    return (
        <section className={styles.productSection}>

            <div className={`${styles.productSectionContainer} container`}>
                <div className={styles.imgContainer}>
                    {/* in home page we show one image, but in product page we show all the product iamges in slider */}
                    {router.pathname === "/" ?
                        <img src={props.productImage} alt={props.title} loading="lazy" alt={props.title} />
                        :
                        <ImageGallery
                            items={images}
                            showThumbnails={false}
                            showPlayButton={false}
                            showNav={true}
                            showBullets={true}
                            showFullscreenButton={false}
                            useBrowserFullscreen={false}
                            lazyLoad={true}
                        />
                    }
                </div>
                <div
                    className={styles.info}
                    dir="auto"
                >

                    <p className={styles.superTitle}>{props.superTitle}</p>
                    <h1 className={styles.title}>{props.title}</h1>
                    <p className={styles.description}>{props.description}</p>

                    <ul>
                        {props.bulletList.map((listItem, idx) => {
                            if (!!listItem) {
                                return (
                                    <li key={idx}><IoCheckmark />&nbsp;{listItem}</li>
                                )
                            }
                        })}
                    </ul>

                    {props.showProdcutLink &&
                        <Link href={`/product/${props.id}`} locale={router.locale === "ar" ? "ar" : "en"}>
                            <a>
                                <PrimaryButton>{router.locale === "ar" ? "المزيد" : "Check Now"}</PrimaryButton>
                            </a>
                        </Link>
                    }

                </div>
            </div>
        </section>
    );
};

export default SingleProductSection;