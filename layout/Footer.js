import styles from "./layout.module.scss";
import {useRouter} from "next/router";
import {FiPhone, FiMail} from "react-icons/fi";
import {IoLogoWhatsapp} from "react-icons/io5"
import {FaFacebookSquare} from "react-icons/fa";
import {GoLocation} from "react-icons/go";
const Footer = () => {
    const router = useRouter();
    return (
        <footer className={styles.footer}>
            <div className={styles.mainFooter}>
                <div className={`container`}>
                    <div className={styles.mainFooterWrapper}   dir="auto">
                        <div className={styles.address}>
                            <h4>{router.locale === "ar" ? "العنوان" : "Adress"}</h4>
                            <a className={styles.contactLink} target="_blank" href="https://www.google.com/maps/place/%D8%A7%D9%84%D8%AC%D9%87%D8%A7%D8%B2+%D8%A7%D9%84%D9%82%D9%88%D9%85%D9%8A+%D9%84%D8%AA%D9%86%D8%B8%D9%8A%D9%85+%D8%A7%D9%84%D8%A7%D8%AA%D8%B5%D8%A7%D9%84%D8%A7%D8%AA%E2%80%AD/@30.054989,31.311421,15z/data=!4m5!3m4!1s0x0:0xf5369d57ffd43405!8m2!3d30.0549891!4d31.3114214" rel="noreferrer">
                                <GoLocation/>
                                &nbsp;
                                <span>{router.locale === "ar" ? "القاهرة -  مصر" : "Cairo, Egypt"}</span>
                            </a>
                            <iframe 
                              title={"location map"}
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.289588661708!2d31.307914738265907!3d30.057232609885872!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840c63ce95b0d%3A0xf5369d57ffd43405!2z2KfZhNis2YfYp9iyINin2YTZgtmI2YXZiiDZhNiq2YbYuNmK2YUg2KfZhNin2KrYtdin2YTYp9iq!5e0!3m2!1sar!2seg!4v1616359780866!5m2!1sar!2seg" 
                              loading="lazy"
                            >
                            </iframe>
                        </div>
                        <div  className={styles.contacts}>
                            <h4>{router.locale === "ar" ? "تواصل معنا" : "Contact Us"}</h4>
                            <a className={styles.whatsapp}  target="_blank" href="https://api.whatsapp.com/send?phone=201099995555" rel="noreferrer">
                                <IoLogoWhatsapp/>
                                &nbsp;
                                <span>{router.locale === "ar" ? "راسلنا على واتساب" : "Chat on WhatsApp"}</span>
                            </a>
                            <a className={styles.contactLink}  target="_blank" href="tel:+201099995555" rel="noreferrer">
                                <FiPhone/>
                                &nbsp;
                                <span>{router.locale === "ar" ? "۰۱۰۹۹۹۹٥٥٥٥" : "201099995555"}</span> 
                            </a>
                            <a className={styles.contactLink}  target="_blank" href="mailto:info@aboulazm.com" rel="noreferrer">
                                <FiMail/>
                                &nbsp;
                                <span>info@aboulazm.com</span> 
                            </a>
                        </div>
                        <div className={styles.social}>
                        <h4>{router.locale === "ar" ? "وسائل التواصل الاجتماعى" : "Social Media"}</h4>
                            <a className={styles.contactLink}  target="_blank" href="https://www.facebook.com/icoatgroupegypt" rel="noreferrer">
                                <FaFacebookSquare/>
                            </a>
                        </div>
                    </div>  
                </div>
            </div>    
            <div className={styles.miniFooter}>
                <div  className={`container`}>
                    <p>{`Abou © Copyrights ${new Date().getFullYear()}. All Rights Reserved.`}</p>
                </div> 
            </div>
        </footer>
    );
};

export default Footer;