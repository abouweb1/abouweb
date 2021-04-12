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


const ClientMessagesTable = () => {

    useEffect(() => {
        fetchMessages();
    }, [])

    const [replied, setReplied] = useState(false);
    const [newrRecords, setNewRecords] = useState([]);
    const [viewedRecords, setViewedRecords] = useState([])

    const onToolbarPreparing = (e) => {
        let toolbarItems = e.toolbarOptions.items;
        // Adds a new item
        toolbarItems.unshift({
            widget: 'dxButton',
            options: {
                icon: replied ? 'message' : 'check',
                text: `${replied ? 'Show unread Messages ' : 'Show read Messages'}`,
                onClick: () => { setReplied(!replied) }
            },
            location: 'after'
        });
    }

    const DetailTemplate = (props) => {
        return (
            <>
                <p><b>Message Subject : </b>{props.data.data.subject}</p>
                <p><b>Message : </b><br /> {props.data.data.message}</p>
            </>
        )
    }

    const fetchMessages = () => {
        requester.get("/messages/getAllMesages").then((res) => {
            console.table("All Messages", res.data);
            var newdata = res.data.map((item) => {
                return { ...item, time: parseInt(item.time) }
            })
            setNewRecords(newdata.filter(record => !record.replied));
            setViewedRecords(newdata.filter(record => record.replied));
        }).catch(errorHandler)
    }
    
    const UpdatedMessageState = (e) => {
        console.log(e.row.data);
        requester.patch(`/messages/replied/${e.row.data._id}`).then(() => {
            fetchMessages();
        }).catch(errorHandler)
    }

    const deleteMessage = (e) => {
        console.log("delete message ", e.row.data);
        requester.delete(`/messages/deleteMessage/${e.row.data._id}`).then(() => {
            fetchMessages();
        }).catch(errorHandler)
    }

    const errorHandler = (e) => {
        window.alert("Error Occurred");
        console.log(e)
    }

    return (
        <div>
            Client Messages Table
            <DataGrid
                dataSource={replied ? viewedRecords : newrRecords}
                allowColumnReordering={true}
                allowColumnResizing={true}
                showBorders={true}
                showRowLines={true}
                cellHintEnabled={true}
                wordWrapEnabled={true}
                rowAlternationEnabled={true}
                // onRowRemoved={deleteBrand}
                onToolbarPreparing={onToolbarPreparing}
                columnHidingEnabled
                
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

                <Column dataField="name" alignment={"center"} />
                <Column dataField="email" alignment={"center"} />
                <Column dataField="phone" alignment={"center"} />
                <Column dataField="subject" alignment={"center"} />
                <Column dataField="time" alignment={"center"} dataType='datetime' />
                <Column caption='Mark as read' type="buttons" width={110} buttons={[
                    {
                        hint: 'mark as read',
                        icon: "check",
                        visible: !replied,
                        onClick: UpdatedMessageState,
                    },
                    {
                        hint: 'Delete',
                        icon: "trash",
                        visible: true,
                        onClick: deleteMessage,
                    }
                ]} />
                <MasterDetail
                    enabled={true}
                    component={DetailTemplate}
                />
                <Export enabled={true} />
            </DataGrid>
        </div>
    );
};

export default ClientMessagesTable;