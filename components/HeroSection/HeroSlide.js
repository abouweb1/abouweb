import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";
import PrimaryButton from '../Button/PrimaryButton';
import styles from "./HeroSlide.module.scss";

const HeroSlide = (props) => {
    const router = useRouter();
    return (
        <div className={`${styles.slide} container`} >
            <div className={styles.imgContainer}>
                <img src={props.productImage} draggable="false" loading="lazey" alt={props.title}/>
            </div>
            <div
                className={styles.info}
                dir="auto"
            >
                <h1 draggable="false" >{props.title}</h1>
                <p draggable="false" >{props.description}</p>
                <Link href={`/product/${props.id}`} locale={router.locale === "ar" ? "ar" : "en"}>
                    <a draggable="false">
                        <PrimaryButton draggable="false" >{router.locale === "ar" ? "المزيد" : "Check Now"}</PrimaryButton>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default HeroSlide;