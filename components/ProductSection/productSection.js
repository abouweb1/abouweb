import React from 'react';
import PrimaryButton from '../Button/PrimaryButton';
import styles from "./ProductSection.module.scss";
import {IoCheckmark} from "react-icons/io5";
const ProductSection = (props) => {
    return (
        <section className={styles.productSection}>
            <div className={`${styles.productSectionContainer} container`}>
                <div className={styles.imgContainer}>
                    <img src={props.imgSrc}/>
                </div>
                <div className={styles.info}>
                    <p className={styles.superTitle}>{props.superTitle}</p>
                    <h1 className={styles.title}>{props.name}</h1>
                    <p className={styles.description}>{props.description}</p>
                    <ul>
                        {props.list.map((listItem, idx)=>{
                            return(
                                <li key={idx}><IoCheckmark/> {listItem}</li>
                            )
                        })}
                    </ul>
                    <PrimaryButton>Check Now</PrimaryButton>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;