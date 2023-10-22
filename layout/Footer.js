import styles from "./layout.module.scss";
import { useRouter } from "next/router";
import { FiPhone, FiMail } from "react-icons/fi";
import { IoLogoWhatsapp } from "react-icons/io5"
import { FaFacebookSquare } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
const Footer = () => {
    const router = useRouter();
    return (
        <footer className={styles.footer}>
            <div className={styles.mainFooter}>
                <div className={`container`}>
                    <div className={styles.mainFooterWrapper} dir="auto">
                        <div className={styles.address}>
                            <h4>{router.locale === "ar" ? "العنوان" : "Address"}</h4>
                            <a className={styles.contactLink} target="_blank" href="https://goo.gl/maps/AMf13gdFxBR4Go5e6" rel="noreferrer">
                                <GoLocation />
                                &nbsp;
                                <span>{router.locale === "ar" ? <span>المقر الرئيسى : 2 ميدان عائشة التيمورية - قصر النيل - القاهرة</span> : "Headquarter : 2 Aesha Al Taymorya, Qasr El Nil, Cairo"}</span>

                            </a>
                            <a className={styles.contactLink} target="_blank" href="https://goo.gl/maps/J6CNxJuTy3pD3Lso7" rel="noreferrer">
                                <GoLocation />
                                &nbsp;
                                <span>{router.locale === "ar" ? <span>المخازن : 89 شارع محمد فريد - وسط البلد - القاهرة</span> : "Warehouse : 89 Mohammed Farid, Down Town, Cario"}</span>

                            </a>

                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.8249399295605!2d31.241771315115177!3d30.04187978188323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145840b9de709c55%3A0xd9d70ac025d0cbfd!2s89%20Mohammed%20Farid%2C%20As%20Sahah%2C%20Abdeen%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1624418573003!5m2!1sen!2seg"
                                loading="lazy"
                            >
                            </iframe>
                        </div>

                        <div id="#contactUs" className={styles.contacts}>
                            <div>
                                <h4>{router.locale === "ar" ? "تواصل معنا" : "Contact Us"}</h4>
                                <a className={styles.whatsapp} target="_blank" href="https://api.whatsapp.com/send?phone=201099995555" rel="noreferrer">
                                    <IoLogoWhatsapp />
                                    &nbsp;
                                    <span>{router.locale === "ar" ? "راسلنا على واتساب" : "Chat on WhatsApp"}</span>
                                </a>
                                <a className={styles.contactLink} target="_blank" href="tel:+201099995555" rel="noreferrer">
                                    <FiPhone />
                                    &nbsp;
                                    <span>{router.locale === "ar" ? "۰۱۰۹۹۹۹٥٥٥٥" : "201099995555"}</span>
                                </a>
                                <a className={styles.contactLink} target="_blank" href="mailto:info@aboulazm.com" rel="noreferrer">
                                    <FiMail />
                                    &nbsp;
                                    <span>info@aboulazm.com</span>
                                </a>
                            </div>
                        </div>

                        <div className={styles.social}>
                            <div>
                                <h4>{router.locale === "ar" ? "وسائل التواصل الاجتماعى" : "Social Media"}</h4>
                                <a className={styles.contactLink} target="_blank" href="https://www.facebook.com/icoatgroupegypt" rel="noreferrer">
                                    <FaFacebookSquare />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.miniFooter}>
                <div className={`container`}>
                    <p>{`Abou © Copyrights ${new Date().getFullYear()}. All Rights Reserved.`}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
