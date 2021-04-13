import Layout from "../layout/Layout";
import { useRouter } from "next/router";

export default function Custom404() {
    return <Layout>
        <div className="notFoundContainer">
            <p>{useRouter().locale === "en" ? "404 - Page Not Found" : " الصفحة غير موجودة - 404"}</p>
        </div>
    </Layout>
}