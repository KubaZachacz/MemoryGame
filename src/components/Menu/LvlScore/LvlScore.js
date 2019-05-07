import React from 'react';
import './LvlScore.scss'

const lvlScroe = ({ gameScore }) => {

    return (
        <div className="LvlScore">
            <p>Last: </p><p><b>{gameScore.last}</b></p>
            <p>Top: </p><p><b>{gameScore.top}</b></p>
        </div>
    )
}

export default lvlScroe;