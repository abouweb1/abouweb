import React, { useState } from 'react';

import PrimaryButton from '../Button/PrimaryButton';
import ClientMessagesTable from "./tables/ClientMessagesTable";
import ProductsTable from "./tables/ProductsTable";

import styles from "./adminTables.module.scss";

const AdminTables = () => {
    const [currentTable, setCurrentTable] = useState("")
    
    const tableRenderer =()=>{
        switch (currentTable) {
        case 'ClientMessagesTable':
            return <ClientMessagesTable/>
            break;
        case 'ProductsTable' :
            return <ProductsTable/>
            break;   
        default:
             return <>Choose Table</>
        }
    }
    
    const tableSelector=(e)=>{
        setCurrentTable(e.target.id)
    }

    return (
        <div className={`${styles.adminTables} container`}>
            <div className={styles.tableButtons}>
                <PrimaryButton id="ClientMessagesTable" onClick={tableSelector} >Client Messages Table</PrimaryButton>
                <PrimaryButton id="ProductsTable" onClick={tableSelector} >Products Table</PrimaryButton>
            </div>
           <div className={styles.tableWrapper}>
                {tableRenderer()}
            </div>
        </div>
    );
};

export default AdminTables;