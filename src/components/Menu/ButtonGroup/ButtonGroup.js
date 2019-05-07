import React from 'react';
import './ButtonGroup.scss'

const buttonGroup = (props) => {
    let classText = "ButtonGroup";
    let extraText = null;
    if (props.scoreList) {
        classText+=" scoreList";
        extraText = <h3>{`Games played: ${props.played}`}</h3>
    }

    return (
        <div className={classText}>
            <h3>{props.header}</h3>
            <div className="Buttons-row">{props.children}</div>
            {extraText}
        </div>
    )
}

export default buttonGroup