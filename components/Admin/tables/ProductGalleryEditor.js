import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import requester from "../../../utilities/requester";
import styles from "./ProductGalleryEditor.module.scss";

export default function ProductGalleryEditor(props) {
    
    const [imgSrcList, setImgSrcList] = useState(props.data.value || []);
    const [localImgSrcList, setLocalImgSrcList] = useState([]);
    const inputRef = React.createRef();

    useEffect(() => {
        console.log("ProductGalleryEditor", props);
        props.data.setValue(null);
    }, [])

    const errorHandler = (e, str="Error Occurred") => {
        toast.error(str);
        console.log(e)
    }

    const uploadHandler = (e) => {
        let filesArray = [];
        let urlsArray = [];

        Object.keys(e.target.files).forEach(key => {
            filesArray.push(e.target.files[key])
        });

        console.log(filesArray);
        console.log(e.target.files);
        props.data.setValue(e.target.files);

        Object.keys(e.target.files).forEach(key => {
            urlsArray.push({
                imageId: e.target.files[key].name,
                imageUrl: URL.createObjectURL(e.target.files[key])
            })
        });

        console.log(urlsArray);
        setLocalImgSrcList(urlsArray);

    }

    const galleryImageDeleteHandler = (imageId) => {
        console.log("delete gallery image from database, image Id : ", imageId, "and productId : ", props.data.data.productId);
        requester.delete(`/products/deleteImageProductGallery/${imageId}/${props.data.data.productId}`).then(()=>{
            setImgSrcList(imgSrcList.filter(item=>item.imageId!==imageId))
            toast.success("Image Deleted Successfully")
        }).catch((e)=>{
            errorHandler(e, "Error Occurred, deleting failed")
        })
    }

    return (
        <>
            <input type="file" multiple ref={inputRef} className={styles.hiddenInput} onChange={uploadHandler} />
            
            {!!imgSrcList.length &&
                <>
                    {imgSrcList.map((item) => {
                        if (item.imageId && item.imageUrl) {
                            return (
                                <div key={item.imageId} className={styles.imageContainer}>
                                    <div className={styles.overLay}>
                                        <span onClick={() => { galleryImageDeleteHandler(item.imageId) }}>Delete</span>
                                    </div>
                                    <img src={item.imageUrl || "/assets/placeholder-image.png"} />
                                </div>
                            )
                        }
                    })}
                </>
            }
            
            {!!localImgSrcList.length &&
                <>
                    {localImgSrcList.map((item) => {
                        if (item.imageId && item.imageUrl) {
                            return (
                                <div key={item.imageId} className={styles.imageContainer}>
                                    <img src={item.imageUrl || "/assets/placeholder-image.png"}/>
                                </div>
                            )
                        }
                    })}
                </>
            }

            <div className={styles.imageContainer}>
                <div className={styles.overLay}>
                    <span onClick={() => { inputRef.current.click() }}>Upload</span>
                </div>
                <img src={"/assets/placeholder-image.png"} alt={"place holder"} />
            </div>
        </>
    )
}