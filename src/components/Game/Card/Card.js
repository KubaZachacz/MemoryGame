import React from 'react';
import './Card.scss'
import config from '../../../config/config.json'

const card = ({ size, isReversed, cardIcon, cardColor, id, cardClick }) => {

    const containerStyle = {
        width: size,
        height: size,
    };
    const cardStyle = {
        backgroundColor: cardColor
    };

    const iconStyle = {
        fontSize: 0.55 * size
    };

    let cardClasses = "Card";
    if (isReversed) {
        cardClasses += " flipped";
    }

    return (
        <div className="cardContainer" style={containerStyle} onClick={(e) => cardClick(id, e)}>
            <div className={cardClasses}>
                <div className="front" style={cardStyle}><i className={"fas fa-" + cardIcon} style={iconStyle}></i></div>
                <div className="back" style={cardStyle}><i className={"fas fa-" + config.reverseIcon} style={iconStyle}></i></div>
            </div>
        </div>

    )
}

export default card