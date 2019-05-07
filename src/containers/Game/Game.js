import React, { Component } from 'react';
import './Game.scss'
import Card from "../../components/Game/Card/Card";
import GameLives from '../../components/Game/GameLives/GameLives';
import config from '../../config/config.json';

class Game extends Component {
    state = {
        cardsObj: [],
        reversedCards: [],
        matchedCouples: 0,
        clickCounter: 0,
        isStarted: false
    }

    buttonLocker = false;
    actualChances = -1;
    chanceSize = 0;
    cardColor = config.cardColors[0];
    cardSize = 200; //random value

    randomIcons = ({ cardsIds, newCardsObj }) => {

        let index;
        let iconsList = [...config.icons]; //Copy of default icons set
        while (cardsIds.length > 0) {
            console.log('randomize')
            const iconId = Math.floor(Math.random() * iconsList.length);
            const icon = iconsList.splice(iconId, 1)[0];

            index = cardsIds.splice(Math.floor(Math.random() * cardsIds.length), 1)[0];
            // select index for 1st card of couple with same icon and removes it from list
            newCardsObj[index] = {
                icon: icon,
                isReversed: false,
            };
            index = cardsIds.splice(Math.floor(Math.random() * cardsIds.length), 1);
            // select index for 2nd card of couple with same icon and removes it from list
            newCardsObj[index] = {
                icon: icon,
                isReversed: false,
            };
        }
        return newCardsObj;
    }

    cardClickHandler = (index) => {
        if (!this.buttonLocker && this.state.cardsObj[index].isReversed) {
            this.buttonLocker = true;

            let reversedCards = [...this.state.reversedCards];
            let modifiedCardObj = [...this.state.cardsObj];
            let matchedCouples = this.state.matchedCouples;
            let clickCounter = this.state.clickCounter;
            let isFailure = false;
            modifiedCardObj[index].isReversed = false;
            clickCounter++;

            if (reversedCards.length === 0) {
                reversedCards[0] = index;
            }
            else {
                reversedCards[1] = index;
                // checks if there is a match
                if (modifiedCardObj[index].icon === modifiedCardObj[reversedCards[0]].icon) {
                    console.log("paired")
                    reversedCards = [];
                    matchedCouples++;
                    // Checks if we won the game!
                    if (matchedCouples === config.lvlRange[this.props.lvl].size / 2) {
                        if (this.props.lvl < 3) {
                            this.props.endGame(clickCounter);
                        }
                        else {
                            this.props.endGame(matchedCouples);
                        }
                    }
                }
                // in case of fail
                else {
                    this.actualChances--;
                    // if not hard modes or still chance 
                    if (this.props.lvl < 3 || this.actualChances > 0) {
                        setTimeout(() => {
                            modifiedCardObj[reversedCards[0]].isReversed = true;
                            modifiedCardObj[reversedCards[1]].isReversed = true;
                            reversedCards = [];
                            this.setState({ cardsObj: modifiedCardObj, reversedCards: reversedCards })
                            this.buttonLocker = false;
                        }, 600);
                    }
                    else {
                        this.props.endGame(matchedCouples);
                        isFailure = true;
                    }
                }
            }

            this.setState({ cardsObj: modifiedCardObj, reversedCards: reversedCards, matchedCouples: matchedCouples, clickCounter: clickCounter }, () => {
                // when failed in hard modes
                if (isFailure) {
                    setTimeout(() => {
                        this.reverseAllCards();
                        setTimeout(() => {
                            this.startNewGame(this.props.lvl, false);
                            this.buttonLocker = false;
                        }, 600);
                    }, 600);
                }
                else if (reversedCards.length < 2) {
                    this.buttonLocker = false;
                }
            });
        }
    }

    prepareNewGame = (lvl) => {
        const lvlSize = config.lvlRange[lvl].size;
        const lvlCols = config.lvlRange[lvl].cols;
        const lvlRows = lvlSize / lvlCols;

        this.cardColor = config.cardColors[Math.floor(Math.random() * config.cardColors.length)];
        this.cardSize = (this.props.gameAreaSize.width - 10 * (parseInt(lvlCols) - 1)) / parseInt(lvlCols);
        this.chanceSize = (this.props.gameAreaSize.height - (lvlRows * this.cardSize + 10 * (lvlRows - 1))) / 2
        console.log(this.chanceSize);

        let newCardsObj = []; //Object with whole lvl cards data
        let cardsIds = []; //Array of indexes for cards in game

        this.actualChances = config.lvlChances[lvl];
        for (let i = 0; i < (lvlSize); i++) {
            cardsIds.push(i); // creates array of indexes for set game range
            newCardsObj.push({
                icon: "",
                isReversed: true,
            }); // creates a placeholder of cards data
        }
        this.setState({
            cardsObj: newCardsObj,
            clickCounter: 0,
            matchedCouples: 0,
            reversedCards: []
        });
        return ({ cardsIds: cardsIds, newCardsObj: newCardsObj })
    }

    startNewGame = (lvl) => {
        this.props.startGame();
        const newCardsObj = this.randomIcons(this.prepareNewGame(lvl));
        this.setState({
            cardsObj: newCardsObj,
            clickCounter: 0,
            matchedCouples: 0,
            reversedCards: []
        }, () => {
            setTimeout(() => {
                this.reverseAllCards();
            }, config.reverseTime[lvl])
        });
    }

    reverseAllCards = () => {
        let modifiedCardObj = [...this.state.cardsObj];
        for (const cardObj of modifiedCardObj) {
            cardObj.isReversed = true;
        }
        this.setState({ cardsObj: modifiedCardObj });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLvlSelected) {
            this.prepareNewGame(nextProps.lvl);
        }
        else if (nextProps.isNewGame) {
            this.startNewGame(nextProps.lvl);
        }

    }

    componentWillMount() {
        if (this.props.isLvlSelected) {
            this.prepareNewGame(this.props.lvl);
        }
        else if (this.props.isNewGame) {
            this.startNewGame(this.props.lvl);
        }
    }

    render() {


        const gridStyle = {
            gridTemplateColumns: 'auto '.repeat(config.lvlRange[this.props.lvl].cols),
        }

        const cardsGird = this.state.cardsObj.map((cardData, index) => {
            return <Card size={this.cardSize} isReversed={cardData.isReversed} cardIcon={cardData.icon} cardColor={this.cardColor} key={`${this.props.lvl}-${index}`} id={index} cardClick={(key, e) => this.cardClickHandler(key, e)} />
        });

        return (
            <div className="Game">
                <GameLives chances={this.actualChances} color={this.cardColor} size={this.chanceSize} />
                <div id="gameWrapper" className="wrapper" style={gridStyle}>
                    {cardsGird}
                </div>
            </div>
        );
    }

}

export default Game