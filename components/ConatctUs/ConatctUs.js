import { useState } from "react"
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

const ConatctUs = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    })

    const inputChangeHandler = (e) => {
        console.log(e.target.value)
        let newFormData = { ...form };
        newFormData[e.target.name] = e.target.value;
        setForm({ ...newFormData });
    }
    return (
        <section id={"#contactUs"} className={styles.ConatctUs}>
            <div className="container">
                <h2 className={styles.title}>Get In Touch With Us</h2>
                <p className={styles.subtitle}>Have any questions? We'd love to hear from you.</p>
                <div className={styles.ContacUsContainer}>
                    <   div className={styles.vectorContainer}>
                        <Lottie
                            options={defaultOptions}
                            height={"auto"}
                            width={"100%"}
                        />
                    </div>
                    <form className={styles.form}>
                        <div className={styles.formSharedRow}>
                            <input type="text" name="name" required placeholder="Your Name" value={form.name} onChange={inputChangeHandler} />
                            <input type="text" name="email" placeholder="Your Email" value={form.email} onChange={inputChangeHandler} />
                        </div>
                        <div className={styles.formRow}>
                            <input type="text" name="phone" placeholder="Your Phone" value={form.phone} onChange={inputChangeHandler} />
                        </div>
                        <div className={styles.formRow}>
                            <input type="text" name="subject" placeholder="Your Subject" value={form.subject} onChange={inputChangeHandler} />
                        </div>
                        <div className={styles.formRow}>
                            <textarea name="message" required value={form.message} placeholder="Your Message" onChange={inputChangeHandler} />
                        </div>
                        <PrimaryButton>Send Message</PrimaryButton>
                    </form>

                </div>

            </div>
        </section>
    );
};

export default ConatctUs;