import React, { useEffect, useState } from 'react';
import requester from "../../../utilities/requester";
import DataGrid, {
    Column,
    MasterDetail,
    Editing,
    Popup,
    Position,
    Form,
    Pager,
    Paging,
    Grouping,
    GroupPanel,
    SearchPanel,
    HeaderFilter,
    Export,
} from 'devextreme-react/data-grid';
import { Item } from 'devextreme-react/form';
import 'devextreme-react/text-area';
import BulletListEditor from "./BulletListEditor";
import ProductImageEditor from "./ProductImageEditor";
import ProductGalleryEditor from "./ProductGalleryEditor";


const ProductsTable = () => {

    useEffect(() => {
        fetchProducts();
    }, [])

    const [active, setActive] = useState(true);
    const [activeProducts, setActiveProducts] = useState([]);
    const [inactiveProducts, setInactiveProducts] = useState([])

    const onToolbarPreparing = (e) => {
        let toolbarItems = e.toolbarOptions.items;
        // Adds a new item
        toolbarItems.unshift({
            widget: 'dxButton',
            options: {
                icon: active ? 'check' : 'check',
                text: `${active ? 'Show inactive Products ' : 'Show active products'}`,
                onClick: () => { setActive(!active) }
            },
            location: 'after'
        });
    }

    const DetailTemplate = (props) => {
        return (
            <>
                <p><b>title : </b>{props.data.data.title}</p>
            </>
        )
    }

    const fetchProducts = () => {
        requester.get("/products/allProducts").then((res) => {
            console.table("All products", res.data);
            setActiveProducts(res.data.filter(record => record.active));
            setInactiveProducts(res.data.filter(record => !record.active));
        }).catch(errorHandler)
    }


    const errorHandler = (e, str="Error Occurred") => {
        window.alert(str);
        console.log(e)
    }

    const onRowRemoved = (e) => {
        console.log(e);
        let { productId } = e.data;
        requester.delete(`/products/deleteProduct/${productId}`).then((res) => {
            window.alert('Deleted successfully')
        }).catch((e) => {
            fetchProducts();
            errorHandler(e);
        })
    }

    const onRowInserted = (e) => {

        console.log('add product ', e.data);
        const productFormData = new FormData();
        
        Object.keys(e.data).forEach(key => {
            if(key !== "gallery"){
                if(Array.isArray(e.data[key])){
                    e.data[key].forEach(item=>{
                        productFormData.append(key, item)
                    })
                }
                else{
                    productFormData.append(key, e.data[key])
                }
            }
        });
        
        requester.post('/products/addProduct', productFormData).then((res) => {
            console.log("added product info successfully");
            
            if(e.data["gallery"]){
                const galleryFormData = new FormData();
                galleryFormData.append("productId", e.data.productId);

                Object.keys(e.data["gallery"]).forEach(key => {
                    galleryFormData.append("images", e.data["gallery"][key])
                });
        
                requester.post('/products/addImageProductGallery', galleryFormData).then(()=>{
                    window.alert('Added product info & images successfully');
                    fetchProducts();
                }).catch((e)=>{
                    errorHandler(e, "Error Occurred in uploading images");
                    fetchProducts();
                })
            }
            else {
                fetchProducts();
                window.alert('Added product info successfully');
            }
            
        }).catch((e) => {
            fetchProducts();
            errorHandler(e);
        })
    }

    const onRowUpdated = (e) => {

        console.log('edit product', e);
        const productFormData = new FormData();
        
        Object.keys(e.data).forEach(key => {
            if(key !== "gallery"){
                if(Array.isArray(e.data[key])){
                    e.data[key].forEach(item=>{
                        productFormData.append(key, item)
                    })
                }
                else{
                    productFormData.append(key, e.data[key])
                }
            }
        });

        productFormData.append("id", e.data["_id"]);
        requester.patch('/products/updateProduct', productFormData).then(() => {

            if(e.data["gallery"]){
                const galleryFormData = new FormData();
                galleryFormData.append("productId", e.data.productId);

                Object.keys(e.data["gallery"]).forEach(key => {
                    galleryFormData.append("images", e.data["gallery"][key])
                });
        
                requester.post('/products/addImageProductGallery', galleryFormData).then(()=>{
                    window.alert('updated product info & images successfully');
                    fetchProducts()
                }).catch((e)=>{
                    errorHandler(e, "Error Occurred in uploading images");
                    fetchProducts();
                })
            }
            else {
                fetchProducts();
                window.alert('updated product info successfully');
            }

        }).catch((e) => {
            fetchProducts();
            errorHandler(e);
        })
    }

    return (
        <div>
            Products Table
            <DataGrid
                dataSource={active ? activeProducts : inactiveProducts}
                allowColumnReordering={true}
                allowColumnResizing={true}
                showBorders={true}
                showRowLines={true}
                cellHintEnabled={true}
                wordWrapEnabled={true}
                rowAlternationEnabled={true}
                onToolbarPreparing={onToolbarPreparing}
                onRowRemoved={onRowRemoved}
                onRowInserted={onRowInserted}
                onRowUpdated={onRowUpdated}
            >
                <HeaderFilter visible={true} />
                <GroupPanel visible={true} />
                <SearchPanel visible={true} all />
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
                    <Popup onContentReady={() => {}} onHidden={() => {}} title="Products" showTitle={true} width={700} height={600} maxHeight={'80%'}>
                        <Position my="center" at="center" of={window} />
                    </Popup>


                    <Form>
                        <Item colSpan="2" dataField="title" alignment={"center"} />

                        {/* ---------------------------------------------------------Hidden Items------------------------------------- */}

                        <Item colSpan="2" dataField="title_ar" />
                        <Item colSpan="2" dataField="superTitle" />
                        <Item colSpan="2" dataField="superTitle_ar" />
                        <Item colSpan="2" dataField="subtitle" />
                        <Item colSpan="2" dataField="subtitle_ar" />
                        <Item colSpan="2" dataField="description" />
                        <Item colSpan="2" dataField="description_ar" />
                        <Item colSpan="2" dataField="bulletList" />
                        <Item colSpan="2" dataField="bulletList_ar" />
                        <Item colSpan="2" dataField="active" dataType='boolean'/>
                        <Item colSpan="2" dataField="productId" />
                        <Item colSpan="2" dataField="productImage" />
                        <Item colSpan="2" dataField="gallery" />


                    </Form>

                </Editing>

                <Column dataField="title" alignment={"center"} />
                <Column dataField="title_ar" alignment={"center"} />
                <Column dataField="superTitle" alignment={"center"} />
                <Column dataField="superTitle_ar" alignment={"center"} />
                <Column dataField="subtitle" alignment={"center"} />
                <Column dataField="subtitle_ar" alignment={"center"} />

                {/* ---------------------------------------------------------Hidden Columns------------------------------------- */}

                <Column visible={false} dataField="description" alignment={"center"} />
                <Column visible={false} dataField="description_ar" alignment={"center"} />
                <Column visible={false} dataField="bulletList" alignment={"center"} editCellComponent={BulletListEditor} />
                <Column visible={false} dataField="bulletList_ar" alignment={"center"} editCellComponent={BulletListEditor} />
                <Column visible={false} dataField="productImage" alignment={"center"} editCellComponent={ProductImageEditor}  />
                <Column visible={false} dataField="gallery" alignment={"center"} editCellComponent={ProductGalleryEditor} />

                <Column visible={false} dataField="_id" alignment={"center"} />
                <Column visible={false} dataField="productId" alignment={"center"} />
                <Column visible={false} dataField="active" alignment={"center"} dataType='boolean' />


                <Column dataField="heroSectionItem" caption="Hero Product" alignment={"center"} cellRender={(rowData) => {
                    return (
                        <button
                            onClick={() => {
                                console.log("add to hero section data ", rowData.data.productId)
                                requester.patch(`/products/addHeroSecProduct/${rowData.data.productId}`)
                                    .then((response) => {
                                        fetchProducts();
                                        window.alert('Updated successfully');
                                    })
                            }
                            }
                        >
                            {rowData.data.heroSectionItem ? 'Remove' : 'Add'}
                        </button>
                    )
                }}
                />
                <Column type="buttons" width={110} buttons={['edit', 'delete']} />
                <MasterDetail
                    enabled={true}
                    component={DetailTemplate}
                />
                <Export enabled={true} />
            </DataGrid>
        </div>
    );
};

export default ProductsTable;
