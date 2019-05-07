import React from 'react';
import './Menu.scss'
import ButtonGroup from './ButtonGroup/ButtonGroup';
import LvlScore from './LvlScore/LvlScore';
import ActionButton from '../Buttons/ActionBtn';
import ArrowBtn from '../Buttons/ArrowBtn';

const menu = ({ lvlButtonClick, gameScore, gameProgress, gameLvl, lvlGroup, isGameVisible, arrowClick }) => {
    const easyLvlBtns = [{ des: "Easy", lvl: 0, text: "1" }, { des: "Medium", lvl: 1, text: "2" }, { des: "Hard", lvl: 2, text: "3" }];
    const hardLvlBtns = [{ des: "Brutal", lvl: 3, text: "4" }, { des: "Nightmare", lvl: 4, text: "5" }, { des: "Hell", lvl: 5, text: "6" }];
    let buttonsData = lvlGroup===0 ? easyLvlBtns : hardLvlBtns;
    const buttonsArray = buttonsData.map((button, index) => {
        return (
            <ActionButton
                key={index}
                description={button.des}
                click={lvlButtonClick}
                gameLvl={gameLvl}
                isGameVisible={isGameVisible}
                level={button.lvl}
                locked={button.lvl <= gameProgress ? false : true}>
                {button.text}
            </ActionButton>
        )
    })
    let headerText = <>Your score (clicks)</>
    if (gameLvl >= 3) {
        headerText = <>Your score (matches)</>
    }

    return (
        <div id="Menu" className="Menu">
            <div className="wrapper">
                <ButtonGroup header="Choose level">
                    <ArrowBtn direction="left" lvlGroup={lvlGroup} arrowClick={arrowClick}/>
                    {buttonsArray}
                    <ArrowBtn direction="right" lvlGroup={lvlGroup} arrowClick={arrowClick} />
                </ButtonGroup >
                <ButtonGroup header={headerText} scoreList={true} played={gameScore.played}>
                    <LvlScore gameLvl={gameLvl} gameScore={gameScore} />
                </ButtonGroup>
            </div>
        </div>
    )
}

export default menu