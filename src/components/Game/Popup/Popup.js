import React from 'react';
import './Popup.scss'


const winPopup = (props) => {

    return (
        <div className="Popup">
            {props.children}
        </div>
    )
}

export default winPopup