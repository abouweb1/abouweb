import React, { useEffect, useState, useContext } from 'react';
import { DisplayLoadingOverlayHandler } from "../../../utilities/Contexts";
import { toast } from 'react-toastify';
import styles from "./dashboard.module.scss";
import requester from "../../../utilities/requester";
import BulletListEditor from "./BulletListEditor";
import ProductImageEditor from "./ProductImageEditor";
import ProductGalleryEditor from "./ProductGalleryEditor";
import DataGrid, {
    Column,
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



const ProductsTable = () => {

    useEffect(() => {
        setDisplayLoadingOverlay(true);
        fetchProducts();
    }, [])

    const [active, setActive] = useState(true);
    const [activeProducts, setActiveProducts] = useState([]);
    const [inactiveProducts, setInactiveProducts] = useState([])
    const setDisplayLoadingOverlay = useContext(DisplayLoadingOverlayHandler);

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

    const fetchProducts = () => {
        requester.get("/products/allProducts").then((res) => {
            setDisplayLoadingOverlay(false);
            console.table("All products", res.data);
            setActiveProducts(res.data.filter(record => record.active));
            setInactiveProducts(res.data.filter(record => !record.active));
        }).catch(errorHandler)
    }

    const errorHandler = (e, str = "Error Occurred") => {
        setDisplayLoadingOverlay(false);
        toast.error(str);
        console.log(e)
    }

    const onRowRemoved = (e) => {
        setDisplayLoadingOverlay(true);
        console.log(e);
        let { productId } = e.data;
        requester.delete(`/products/deleteProduct/${productId}`).then((res) => {
            setDisplayLoadingOverlay(false);
            toast.success('Deleted successfully')
        }).catch((e) => {
            fetchProducts();
            errorHandler(e);
        })
    }

    const onRowInserted = (e) => {

        setDisplayLoadingOverlay(true);

        console.log('add product ', e.data);
        const productFormData = new FormData();

        Object.keys(e.data).forEach(key => {
            if (key !== "gallery") {
                if (Array.isArray(e.data[key])) {
                    e.data[key].forEach(item => {
                        productFormData.append(key, item)
                    })
                }
                else {
                    productFormData.append(key, e.data[key])
                }
            }
        });

        requester.post('/products/addProduct', productFormData).then((res) => {

            if (e.data["gallery"]) {
                const galleryFormData = new FormData();
                galleryFormData.append("productId", e.data.productId);

                Object.keys(e.data["gallery"]).forEach(key => {
                    galleryFormData.append("images", e.data["gallery"][key])
                });

                requester.post('/products/addImageProductGallery', galleryFormData).then(() => {
                    setDisplayLoadingOverlay(false);
                    toast.success('Added product info & images successfully');
                    fetchProducts();
                }).catch((e) => {
                    errorHandler(e, "Error Occurred in uploading images");
                    fetchProducts();
                })
            }
            else {
                setDisplayLoadingOverlay(false);
                toast.success('Added product info successfully');
                fetchProducts();
            }

        }).catch((e) => {
            fetchProducts();
            errorHandler(e);
        })
    }

    const onRowUpdated = (e) => {

        setDisplayLoadingOverlay(true);

        console.log('edit product', e);
        const productFormData = new FormData();

        Object.keys(e.data).forEach(key => {
            if (key !== "gallery") {
                if (Array.isArray(e.data[key])) {
                    e.data[key].forEach(item => {
                        productFormData.append(key, item)
                    })
                }
                else {
                    productFormData.append(key, e.data[key])
                }
            }
        });

        productFormData.append("id", e.data["_id"]);
        requester.patch('/products/updateProduct', productFormData).then(() => {

            if (e.data["gallery"]) {
                const galleryFormData = new FormData();
                galleryFormData.append("productId", e.data.productId);

                Object.keys(e.data["gallery"]).forEach(key => {
                    galleryFormData.append("images", e.data["gallery"][key])
                });

                requester.post('/products/addImageProductGallery', galleryFormData).then(() => {
                    setDisplayLoadingOverlay(false);
                    toast.success('updated product info & images successfully');
                    fetchProducts()
                }).catch((e) => {
                    errorHandler(e, "Error Occurred in uploading images");
                    fetchProducts();
                })
            }
            else {
                setDisplayLoadingOverlay(false);
                toast.success('updated product info successfully');
                fetchProducts();
            }

        }).catch((e) => {
            fetchProducts();
            errorHandler(e);
        })
    }

    const renderHeroProductColumn = (rowData) => {

        let clickHandler = () => {
            setDisplayLoadingOverlay(true);
            console.log("add to hero section data ", rowData.data.productId)
            requester.patch(`/products/addHeroSecProduct/${rowData.data.productId}`)
                .then((response) => {
                    setDisplayLoadingOverlay(false);
                    toast.success('Updated successfully');
                    fetchProducts();
                })
                .catch((e) => {
                    setDisplayLoadingOverlay(false);
                    errorHandler(e)
                    fetchProducts();
                })
        }

        return (
            <span className={styles.fakelink} onClick={clickHandler}>{rowData.data.heroSectionItem ? 'Remove' : 'Add'}</span>
        )
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

                <Editing mode="popup" allowUpdating={true} allowDeleting={true} allowAdding={true} useIcons={true}>
                    <Popup onContentReady={() => { }} onHidden={() => { }} title="Products" showTitle={true} width={700} height={600} maxHeight={'80%'}>
                        <Position my="center" at="center" of={window} />
                    </Popup>
                    <Form>
                        <Item colSpan="2" dataField="title" alignment={"center"} />
                        <Item colSpan="2" dataField="title_ar" />
                        <Item colSpan="2" dataField="superTitle" />
                        <Item colSpan="2" dataField="superTitle_ar" />
                        {/* // <Item colSpan="2" dataField="subtitle" /> */}
                        {/* <Item colSpan="2" dataField="subtitle_ar" /> */}
                        <Item colSpan="2" dataField="description" />
                        <Item colSpan="2" dataField="description_ar" />
                        <Item colSpan="2" dataField="bulletList" />
                        <Item colSpan="2" dataField="bulletList_ar" />
                        <Item colSpan="2" dataField="active" dataType='boolean' />
                        <Item colSpan="2" dataField="productId" />
                        <Item colSpan="2" dataField="productImage" />
                        <Item colSpan="2" dataField="gallery" />
                    </Form>
                </Editing>

                <Column dataField="title"           alignment={"center"} />
                <Column dataField="title_ar"        alignment={"center"} />
                <Column dataField="active"          alignment={"center"} dataType='boolean' />
                <Column dataField="productId"       alignment={"center"} />
                <Column dataField="heroSectionItem" alignment={"center"} caption="Hero Product" cellRender={renderHeroProductColumn}/>
                <Column dataField="superTitle"      alignment={"center"} visible={false} />
                <Column dataField="superTitle_ar"   alignment={"center"} visible={false} />
                {/* <Column dataField="subtitle"        alignment={"center"} visible={false} /> */}
                {/* <Column dataField="subtitle_ar"     alignment={"center"} visible={false} /> */}
                <Column dataField="description"     alignment={"center"} visible={false} />
                <Column dataField="description_ar"  alignment={"center"} visible={false} />
                <Column dataField="_id"             alignment={"center"} visible={false} />
                <Column dataField="bulletList"      alignment={"center"} visible={false} editCellComponent={BulletListEditor} />
                <Column dataField="bulletList_ar"   alignment={"center"} visible={false} editCellComponent={BulletListEditor} />
                <Column dataField="productImage"    alignment={"center"} visible={false} editCellComponent={ProductImageEditor} />
                <Column dataField="gallery"         alignment={"center"} visible={false} editCellComponent={ProductGalleryEditor} />
                <Column type="buttons" width={110} buttons={['edit', 'delete']} />

                <Export enabled={true} />

            </DataGrid>
        </div>
    );
};

export default ProductsTable;
