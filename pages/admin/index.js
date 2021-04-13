import Head from 'next/head'
import { useState } from "react";
import Layout from "../../layout/Layout";
import AdminForm from "../../components/Admin/AdminForm";
import AdminTables from "../../components/Admin/AdminTables";

const index = () => {
    const [isAdminFlag, setIsAdminFlag] = useState(false)
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    return (
        <>
            <Head>
                <title>Abou | Admin</title>
            </Head>
            <Layout >
                <div>
                    {isAdminFlag ?
                        <AdminTables />
                        :
                        <AdminForm formData={formData} setFormData={setFormData} setIsAdminFlag={setIsAdminFlag} />
                    }
                </div>
            </Layout>
        </>
    );
};

export default index;