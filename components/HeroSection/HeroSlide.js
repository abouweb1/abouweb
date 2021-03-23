import React from 'react';
import PrimaryButton from '../Button/PrimaryButton';
import styles from "./HeroSlide.module.scss";

const HeroSlide = (props) => {
    return (
        <div className={`${styles.slide} container`}>
            <div className={styles.imgContainer}>
                <img src={props.imgSrc}/>
            </div>
            <div className={styles.info}>
                <h1>{props.name}</h1>
                <p>{props.description}</p>
                <PrimaryButton>Check Now</PrimaryButton>
            </div>
        </div>
    );
};

export default HeroSlide;