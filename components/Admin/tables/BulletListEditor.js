import React, { useEffect, useState } from 'react';
import { Button, TextBox } from "devextreme-react/text-box";
import List from 'devextreme-react/list';

const BulletListEditor = (props) => {
    // console.log(props);
    useEffect(() => {
        setList(props?.data?.data[props?.data?.item?.dataField] || []);
    }, [])
    const [list, setList] = useState([]);
    const [input, setInput] = useState('');

    const addButton = {
        text: 'Add',
        onClick: () => {
            if (input.length) {
                setList([...list, input]);
                props.data.setValue([...list, input]);
                setInput('');
            }

        }
    }

    return (
        <>
            <TextBox onValueChanged={(e) => setInput(e.value)} value={input}>
                <Button
                    name="Add"
                    location="after"
                    options={addButton}
                />
            </TextBox>
            <List
                noDataText={'No Data'}
                className='mt-2'
                items={list}
                height={'auto'}
                allowItemDeleting
                itemDeleteMode='toggle'
                onItemDeleted={(e) => {
                    setList([...list])
                    props.data.setValue([...list]);
                }}
            />
        </>
    );
};

export default BulletListEditor;