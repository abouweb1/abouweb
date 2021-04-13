import React from 'react'
import styles from "./AnimationOverlay.module.scss"


export default function AnimationOverlay() {
    return (
        <div className={styles.bodyOverlay}>
          <div className={styles.loader}></div>
        </div>
    )
}
