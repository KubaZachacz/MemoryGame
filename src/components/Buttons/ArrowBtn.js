import React from 'react'
import './Buttons.scss'
import config from '../../config/config.json';

const ArrowBtn = (props) => {
    let isLocked = false;
    
    if (props.direction === 'left' && props.lvlGroup === 0) {
        isLocked = true;
    }
    if (props.direction === 'right' && props.lvlGroup === config.lvlGroups-1) {
        isLocked = true;
    }

    return (
        <button className="ArrowBtn" disabled={isLocked} onClick={(e) => { props.arrowClick(props.direction, e) }} >
            <i className={"fas fa-caret-"+props.direction}></i>
        </button>
    )
}

export default ArrowBtn
