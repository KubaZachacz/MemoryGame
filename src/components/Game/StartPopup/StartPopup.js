import React from 'react'
import ActionButton from '../../Buttons/ActionBtn';
import './StartPopup.scss'

const StartPopup = (props) => {

   const TEXTS = [
        <>Even baby <i className="fas fa-baby"></i> can make it<br/>Find all pairs quickly and move forward!</>,
        <>Strain your brain <i className="fas fa-brain"></i><br/>It's more difficult, but won't hurt you!</>,
        <>It's pretty hard level<br/>Need someone to help you search <i className="fas fa-search"></i>?</>,
        <>This is where the fun beggins!<br/>No mistakes allowed <i className="fas fa-heart-broken"></i></>,
        <>It might be nightmare <i className="fas fa-sad-cry"></i><br/>But I'm not evil: 1 mistake allowed <i className="fas fa-heart"></i></>,
        <>Are you a cheater or a mastermind?<br/>Good luck anyway: 2 mistakes allowed <i className="fas fa-heart"></i><i className="fas fa-heart"></i>.</>
    ]
    const lvlText = <p className='lvlText'>{TEXTS[props.lvl]}</p>
    return (
        <>
            <div className="StartPopup">
                <p className='startText'>START GAME</p>
                {lvlText}
            </div>
            <div className="winButtons">
                <ActionButton
                    description="Play"
                    click={props.playClick}
                    level="0">
                    <i className="far fa-play-circle"></i>
                </ActionButton>
                <ActionButton
                    description="Cancel"
                    click={props.cancelClick}
                    level="0">
                    <i className="fas fa-times"></i>
                </ActionButton>
            </div>
        </>
    )
}

export default StartPopup
