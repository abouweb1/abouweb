import React, { useEffect, useState } from 'react';
import requester from "../../../utilities/requester";
import DataGrid, {
    Column,
    MasterDetail,
    Editing,
    Popup,
    Lookup,
    Position,
    Form,
    Pager,
    Paging,
    Grouping,
    GroupPanel,
    SearchPanel,
    HeaderFilter,
    RequiredRule,
    AsyncRule,
    Export
} from 'devextreme-react/data-grid';
import 'devextreme-react/text-area';


const ProductsTable = () => {
   
    useEffect(()=>{
        fetchProducts();
    }, [])

    const [active, setActive] = useState(true);
    const [activeProducts, setActiveProducts]= useState([]);
    const [inactiveProducts, setInactiveProducts]= useState([])

    const onToolbarPreparing=(e)=> {
        let toolbarItems = e.toolbarOptions.items;
        // Adds a new item
        toolbarItems.unshift({
            widget: 'dxButton',
            options: {
                icon: active? 'check' : 'check',
                text:`${active?'Show inactive Products ':'Show active products'}`,
                onClick: ()=>{setActive(!active)}
            },
            location: 'after'
        });
    }

    const DetailTemplate = (props)=>{
        return(
            <>
                <p><b>super title : </b>{props.data.data.superTitle}</p>
                <p><b>title : </b>{props.data.data.title}</p>
                <p><b>subtitle : </b> {props.data.data.subtitle}</p>
                <p><b>description : </b> {props.data.data.description}</p>
                <ul>
                    {props.data.data.bulletList.map((item, idx)=>{
                        return(
                            <ul key={idx}>{item}</ul>
                        )
                    })}
                </ul>
               
                {props.data.data.gallery.map((item, idx)=>{
                    return(
                        <p key={idx}>{item}</p>
                    )
                })}
                
                
            </>
        )
    }

    const fetchProducts = ()=>{
        requester.get("/products/allProducts").then((res)=>{
            console.table("All products", res.data);
            setActiveProducts(res.data.filter(record=>record.active));
            setInactiveProducts(res.data.filter(record=>!record.active));
        }).catch(errorHandler)
    }
   

   const errorHandler = (e)=>{
    window.alert("Error Occurred");
    console.log(e)   
   }

    return (
        <div>
            Products Table
            <DataGrid
                dataSource={active? activeProducts : inactiveProducts}
                allowColumnReordering={true}
                allowColumnResizing={true}
                showBorders={true}
                showRowLines={true}
                cellHintEnabled={true}
                wordWrapEnabled={true}
                rowAlternationEnabled={true}
                // onRowRemoved={deleteBrand}
                onToolbarPreparing={onToolbarPreparing}
            >
                <HeaderFilter visible={true}/>
                <GroupPanel visible={true} />
                <SearchPanel visible={true} all/>
                <Grouping autoExpandAll={true} />
                <Paging defaultPageSize={10} />
                <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[5, 10, 20]}
                    showInfo={true}
                    showNavigationButtons={true}
                />
                
                <Editing
                    mode="popup"
                    allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={true}
                    useIcons={true}
                >
                    <Popup onContentReady={()=>{}} onHidden={()=>{}} title="Products" showTitle={true} width={700} height={600} maxHeight={'80%'}>
                        <Position my="center" at="center" of={window} />
                    </Popup>

                    

                </Editing>

                <Column dataField="title" alignment={"center"}/>
                <Column visible={false} dataField="suberTitle" alignment={"center"}/>
                <Column visible={false} dataField="subtitle" alignment={"center"}/>
                
                <Column type="buttons" width={110} buttons={['edit', 'delete']}/>
                <MasterDetail
                    enabled={true}
                    component={DetailTemplate}
                />
                <Export enabled={true}  />
            </DataGrid>
        </div>
    );
};

export default ProductsTable;;