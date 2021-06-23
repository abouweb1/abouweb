import { useState, useContext } from "react"
import { useRouter } from "next/router";
import { DisplayLoadingOverlayHandler } from "../../utilities/Contexts";
import { toast } from 'react-toastify';
import requester from "../../utilities/requester";
import PrimaryButton from "../Button/PrimaryButton";
import styles from "./ContactUs.module.scss"
import Lottie from 'react-lottie';
import animationData from './support-team-animation.json';

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const initialFormValues = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
};

const ConatctUs = () => {
    const router = useRouter();
    const setDisplayLoadingOverlay = useContext(DisplayLoadingOverlayHandler);
    const [form, setForm] = useState(initialFormValues)
    const [error, setError] = useState(null)

    const inputChangeHandler = (e) => {
        // console.log(e.target.value)
        let newFormData = { ...form };
        newFormData[e.target.name] = e.target.value;
        setForm({ ...newFormData });
    }


    const validateEmailOrPhone =(email, phone)=> {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValidEmail = re.test(String(email).toLowerCase());
        const isValidPhone = phone.length >= 7;
        console.log(isValidEmail, isValidPhone)
        return (isValidEmail&&isValidPhone)
    }


    const handleSubmit =(e)=>{
        e.preventDefault();
        setError(null)
        if(validateEmailOrPhone(form.email, form.phone)){
            let payload = {...form, time : Date.now().toString()};
            // console.log(payload);
            setDisplayLoadingOverlay(true);
            requester.post("/messages/sendMessage", payload).then(()=>{
                setDisplayLoadingOverlay(false);
                toast.success(router.locale === "ar" ? "تم إرسال الرساللة بنجاح"  : "Message Sent Successfully")
            }).catch(()=>{
                setDisplayLoadingOverlay(false);
                toast.error("Error Occurred");
            })
            setForm(initialFormValues);
        }
        else {
            setError("invalid Email or Phone")
        }
    }

    return (
        <section id={"#contactUs"} className={styles.ConatctUs}>
            <div className="container" dir="auto">
                <h2 className={styles.title}>{router.locale === "ar" ? "تواصل معنا" : "Get In Touch With Us"}</h2>
                <p className={styles.subtitle}>{router.locale === "ar" ? "لديك أي أسئلة؟ نحب أن نسمع منك." : "Have any questions? We'd love to hear from you."}</p>
                <div className={styles.ContacUsContainer}>
                    <   div className={styles.vectorContainer}>
                        <Lottie
                            options={defaultOptions}
                            height={"auto"}
                            width={"100%"}
                        />
                    </div>
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <div className={styles.formSharedRow}>
                            <input type="text" name="name" required={true} placeholder={router.locale === "ar" ? "إسمك" : "Your Name"} value={form.name} onChange={inputChangeHandler} />
                            <input type="text" name="email" placeholder={router.locale === "ar" ? "بريدك الإلكترونى" : "Your Email"} value={form.email} onChange={inputChangeHandler} />
                        </div>
                        <div className={styles.formRow}>
                            <input type="number" name="phone" placeholder={router.locale === "ar" ? "رقم هاتفك" : "Your Phone Number"} value={form.phone} onChange={inputChangeHandler} />
                        </div>
                        <div className={styles.formRow}>
                            <input type="text" name="subject" placeholder={router.locale === "ar" ? "عنوان رسالتك" : "Your Subject"} value={form.subject} onChange={inputChangeHandler} />
                        </div>
                        <div className={styles.formRow}>
                            <textarea name="message" required={true} value={form.message} placeholder={router.locale === "ar" ? "رسالتك" : "Your Message"} onChange={inputChangeHandler} />
                        </div>
                        <PrimaryButton>{router.locale === "ar" ? "إرسال" : "Send"}</PrimaryButton>
                        <br/>
                        {error&&<span className={styles.error}> {error}</span>}
                    </form>

                </div>

            </div>
        </section>
    );
};

export default ConatctUs;