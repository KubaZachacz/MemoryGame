import React from 'react';
import './Buttons.scss'

const actionBtn = (props) => {

    let outputText = () => {
        if (!props.locked) {
            return (
                <div className="ScrollableContent">
                    <span>{props.children}</span>
                    <span style={{ fontSize: "16px" }}>{props.description}</span>
                </div>
            )
        }
        else {
            return (
                <div className="Locked">
                    <i className="fas fa-lock"></i>
                </div>
            )
        }
    };

    let pressedClass = '';
    if (props.isGameVisible && props.gameLvl === props.level) {
        pressedClass = "buttonPressed";
    }

    return (
        <button className={"ActionButton " + pressedClass} disabled={props.locked} onClick={(e) => { props.click(props.level, e)}} title={props.title}>
            <a href={"#Game"}>{outputText()}</a>
        </button>
    )
}

export default actionBtn;
