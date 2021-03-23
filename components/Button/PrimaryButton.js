import React from 'react';
import styles from "./PrimaryButton.module.scss"
const PrimaryButton = (props) => {
    return (
        <button {...props} className={styles.PrimaryButton}>{props.children}</button>
    );
};

export default PrimaryButton;