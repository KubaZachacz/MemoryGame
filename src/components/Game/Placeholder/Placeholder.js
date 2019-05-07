import React from 'react';
import './Placeholder.scss';


const gamePlaceholder = () => {

    return (
        <div id="Game" className="GamePlaceholder" >
            <p className="main">Choose level to start a game!</p>
            <p>Win a given level to unlock the next one.</p>
            <p>Pass three normal levels to get to <b>harder</b> ones, <br />where every mistake counts.</p>
            <p>Good luck, have fun! <i className="far fa-smile-wink"></i></p>
        </div>
    )
}

export default gamePlaceholder