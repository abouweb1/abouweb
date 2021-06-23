import React from 'react';
import { useState} from "react";
import PrimaryButton from "../Button/PrimaryButton";
import styles from "./adminForm.module.scss";

const AdminForm = (props) => {
    const [errorMessageVisibility, setErrorMessageVisibility]=useState(false);

    const inputChangeHandler = (e) => {
        let newFormData = { ...props.formData };
        newFormData[e.target.name] = e.target.value;
        props.setFormData({ ...newFormData });
    }
    
    const onformSumbit =(e)=>{
        e.preventDefault();
        if(props.formData.username==="abou" && props.formData.password==="2021"){
            props.setIsAdminFlag(true);
        }
        else{
            setErrorMessageVisibility(true)
        }
    }
    return (
        <div className={`${styles.adminForm} container`}>
            <form onSubmit={onformSumbit} className={`${styles.admin}`}>
                    <input required name="username" value={props.formData.username} type="text" placeholder="username" onChange={inputChangeHandler}/>
                    <input required name="password" value={props.formData.password} type="password" placeholder="password" onChange={inputChangeHandler}/>
                    <PrimaryButton>Login</PrimaryButton>
                    <p>{errorMessageVisibility ? "Wrong username or password" : " "}</p>
            </form>
        </div>
    );
};

export default AdminForm;