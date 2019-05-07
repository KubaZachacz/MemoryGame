import React from 'react';
import './Header.scss';
import LinkBtn from '../Buttons/LinkBtn';

const header = () => {
    return (
        <div className="Header">
            <h1>Memory game</h1>
            <h2>with Font Awesome</h2>
            <LinkBtn address='#Menu'><i className="far fa-play-circle"></i> Start fun!</LinkBtn>
            <div className="scale"><a className="link" href="https://fontawesome.com">Learn more</a></div>
        </div>
    )
}

export default header