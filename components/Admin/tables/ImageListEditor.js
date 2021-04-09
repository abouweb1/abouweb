import react from 'react';
import React, { useEffect, useState } from 'react';
import Base64Image from "../../ImageComponent/Base64Image";
import styles from "./dashboard.module.scss";
const ImageListEditor = (props) => {
    const [productImage, setProductImage] = useState("");
    const [gallery, setGallery] = useState([]);
    const [isGallery, setIsGallery] = useState(false);
    const productImageRef = react.createRef();
    console.log("image list editor", props);

    useEffect(() => {
        // in case of product gallery
        if (props.data.item.dataField === "gallery") {
            setGallery(props.data.data[props.data.item.dataField] || []);
            setIsGallery(true);
        }
        // in case of product image
        else {
            setProductImage(props.data.data[props.data.item.dataField] || "");
        }
    }, [])


    const deleteByIndex = (idx) => {
        let newList = gallery.slice(0, idx).concat(gallery.slice(idx + 1));
        setGallery(newList);
        props.data.setValue(newList);

    }



    const uploadHandler = (e) => {
        const files = e.target.files;
        // console.log(files);
        const srcList = [];
        for (const file in files) {
            // only prints the files (which is originally objects)
            if (typeof (files[file]) === "object") {
                // console.log(files[file])
                const reader = new FileReader();
                reader.onloadend = () => {
                    // use a regex to remove data url part
                    const base64String = reader.result;
                    // console.log(base64String);
                    srcList.push(base64String);
                };
                reader.readAsDataURL(files[file]);
            }

        }
        if (isGallery) {
            setTimeout(() => {
                setGallery(srcList);
                props.data.setValue(srcList);
            }, 1000);
        }
        else {
            setTimeout(() => {
                setProductImage(srcList[0]);
                props.data.setValue(srcList[0]);
            }, 1000);
        }



    };

    return (<>
        {isGallery && <>
            {gallery.map((item, index) => {
                return (<>
                    <div key={index} className={styles.imageContainer} >
                        <Base64Image src={item} />
                        <div className={styles.overLay}>
                            <span onClick={() => { deleteByIndex(index) }}>Delete</span>
                        </div>
                    </div>
                </>)
            })}

            <input type="file" multiple onChange={uploadHandler} />
        </>
        }


        {!isGallery && <>
            <div className={styles.imageContainer} >
                <input type="file" ref={productImageRef} onChange={uploadHandler} />
                <Base64Image src={productImage} />
                <div className={styles.overLay}>
                    <span onClick={() => { productImageRef.current.click() }}>Update</span>
                </div>
            </div>
        </>
        }

    </>);
};

export default ImageListEditor;