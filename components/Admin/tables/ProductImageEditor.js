import React, { useEffect, useState } from 'react'
import styles from "./ProductImageEditor.module.scss";

export default function ProductImageEditor(props) {

    const [imgSrc, setImgSrc] = useState(props.data.value);

    useEffect(()=>{
        console.log("ProductImageEditor", props);
    }, [])

    const uploadHandler = (e) => {
        setImgSrc(URL.createObjectURL(e.target.files[0]))
        props.data.setValue(e.target.files[0]);
    }

    const inputRef = React.createRef();
    
    return (

        <div className={styles.imageContainer}>
            <input type="file" ref={inputRef} onChange={uploadHandler}/>
            <div className={styles.overLay}>
                <span onClick={()=>{inputRef.current.click()}}>Upload</span>
            </div>
            <img src={imgSrc || "/assets/placeholder-image.png"} alt={props.data.row.data.title || "place holder"} />
        </div>
    )
}
