import React from 'react';
import './Buttons.scss'

const linkBtn = (props) => {
    return (
        <div className="Button"><a href={props.address}><div className="header-btn">{props.children}</div></a></div>
    )
}

export default linkBtn