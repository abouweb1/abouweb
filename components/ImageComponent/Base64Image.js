import React from 'react';

const Base64Image = (props) => {
    return (
        <img
            {...props}
            src={props.src.slice(0, 10) === "data:image" ? props.src : `data:image/png;base64,${props.src}`}
        />
    );
};

export default Base64Image;
