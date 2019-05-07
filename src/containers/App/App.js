import React, { Component } from 'react';
import './App.scss';
import Header from '../../components/Header/Header';
import Menu from '../../components/Menu/Menu';
import Game from '../Game/Game';
import GamePlaceholder from '../../components/Game/Placeholder/Placeholder';
import Popup from "../../components/Game/Popup/Popup";
import WinPopup from "../../components/Game/WinPopup/WinPopup";
import StartPopup from "../../components/Game/StartPopup/StartPopup";
import Footer from '../../components/Footer/Footer';

import config from '../../config/config.json';

class App extends Component {
  VERSION = '1.1';
  state = {
    gameState: false,
    lvl: 0,
    lvlGroup: 0,
    isNewRecord: false,
    isWin: false,
    gameScore: [{ last: 0, top: 0, played: 0 }, { last: 0, top: 0, played: 0 }, { last: 0, top: 0, played: 0 }, { last: 0, top: 0, played: 0 }, { last: 0, top: 0, played: 0 }, { last: 0, top: 0, played: 0 },],
    gameProgress: 0,
    gameAreaSize: { width: 0, height: 0 },
    gameAreaStyle: {}
  }

  isGameVisible = false;
  gameStarted = false;
  isNewGame = false;
  isLvlSelected = false;
  lastScore = 0;

  startedGameHandler = () => {
    this.isNewGame = false;
  }

  endGameHandler = (score) => {
    this.lastScore = score;
    let gameScore = [...this.state.gameScore];
    let gameProgress = this.state.gameProgress;
    let isNewRecord = false;
    let isWin = false
    gameScore[this.state.lvl].played++;
    gameScore[this.state.lvl].last = score
    // new Record
    if (this.state.lvl < 3 && gameScore[this.state.lvl].top > 0 && score < gameScore[this.state.lvl].top) {
      gameScore[this.state.lvl].top = score;
      isNewRecord = true;
    }
    else if (gameScore[this.state.lvl].top === 0) {
      gameScore[this.state.lvl].top = score;
      isNewRecord = true;
    }
    else if (this.state.lvl >= 3 && gameScore[this.state.lvl].top > 0 && score > gameScore[this.state.lvl].top) {
      gameScore[this.state.lvl].top = score;
      isNewRecord = true;
    }
    if (this.state.lvl < 3) {
      isWin = true;
    }
    else if (score === config.lvlRange[this.state.lvl].size/2) {
      isWin = true;
    }
    // progress made
    if (isWin && gameProgress < 6 && this.state.lvl === gameProgress) {
      gameProgress++;
    }
    // save progress
    this.setState({ gameScore: gameScore, gameProgress: gameProgress, isNewRecord: isNewRecord, isWin: isWin })
    if (typeof (Storage) !== "undefined") {
      localStorage.setItem('gameScore', JSON.stringify(this.state.gameScore));
      localStorage.setItem('gameProgress', gameProgress);
    }
  }

  arrowButtonClickHanlder = (direction) => {
    let lvlGroup = this.state.lvlGroup;
    if (direction === 'left' && lvlGroup > 0) {
      lvlGroup--;
    }
    else if (direction === 'right' && lvlGroup < 1) {
      lvlGroup++;
    }
    this.setState({ lvlGroup: lvlGroup });
  }

  replyClickHandler = () => {
    const gameState = this.state.gameState;
    this.setState({ gameState: !gameState, isWin: false });
    this.isNewGame = true;
  }

  cancelClickHandler = () => {
    const gameState = this.state.gameState;
    this.setState({ gameState: !gameState });
    this.isGameVisible = false;
    this.isLvlSelected = false;
  }

  lvlButtonClickHanlder = (lvl) => {

    if (!this.isGameVisible || lvl !== this.state.lvl) {
      let lvlGroup = this.state.lvlGroup;
      if (lvl > 2 && lvlGroup === 0) {
        lvlGroup++;
      }
      this.isGameVisible = true;
      this.isLvlSelected = true;
      this.setState({ lvl: lvl, lvlGroup:lvlGroup });
    }
  }

  playButtonClickHandler = () => {
    this.isLvlSelected = false;
    this.isNewGame = true;
    this.setState({ isWin: false })
  }

  componentDidMount() {

    let height = window.innerHeight - 150 - 32;
    let width = height * 1.66;

    if (window.innerWidth < 768) {
      width = window.innerWidth * 0.96;
      height = width / 1.66;
    }

    this.setState({
      gameAreaSize: { width: width, height: height },
      gameAreaStyle: {
        height: height + 'px',
      }
    });
    if (typeof (Storage) !== "undefined") {
      console.log(localStorage.getItem('version') === this.VERSION);
      if (localStorage.getItem('version') === this.VERSION) {
        const savedProgress = parseInt(localStorage.getItem('gameProgress'));
        const savedGameScore = JSON.parse(localStorage.getItem('gameScore'));
        if (savedProgress && savedGameScore) {
          this.setState({
            gameScore: savedGameScore,
            gameProgress: savedProgress
          })
        }
      }
      else {
        localStorage.clear();
      }
      localStorage.setItem('version', this.VERSION);
    }
  }

  render() {

    let gameContent = null;
    let gameInfo = null;

    if (this.isGameVisible) {
      gameContent =
        <Game isNewGame={this.isNewGame} isLvlSelected={this.isLvlSelected} lvl={this.state.lvl} gameAreaSize={this.state.gameAreaSize} startGame={this.startedGameHandler} endGame={score => this.endGameHandler(score)} />
    }

    if (this.state.isWin) {
      gameInfo = <Popup>
        <WinPopup isNewRecord={this.state.isNewRecord} clickCounter={this.lastScore} replayClick={this.replyClickHandler} cancelClick={this.cancelClickHandler} lvl={this.state.lvl} nextLvlClick={(lvl, e) => this.lvlButtonClickHanlder(lvl, e)} />
      </Popup>
    }

    if (!this.isGameVisible) {
      gameInfo = <GamePlaceholder />;
    }

    if (this.isLvlSelected) {
      gameInfo = <Popup>
        <StartPopup lvl={this.state.lvl} playClick={this.playButtonClickHandler} cancelClick={this.cancelClickHandler} />
      </Popup>
    }

    return (
      <div className="App">
        <Header />
        <Menu gameLvl={this.state.lvl} lvlGroup={this.state.lvlGroup} isGameVisible={this.isGameVisible} gameProgress={this.state.gameProgress} lvlButtonClick={(lvl, e) => this.lvlButtonClickHanlder(lvl, e)} gameScore={this.state.gameScore[this.state.lvl]} arrowClick={(dir, e) => this.arrowButtonClickHanlder(dir, e)} />
        <div id="Game" className="gameArea" style={this.state.gameAreaStyle}>
          {gameContent}
          {gameInfo}
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;

// {
//   "size": 8,
//   "cols": 4
// },
// {
//   "size": 18,
//   "cols": 6
// },
// {
//   "size": 32,
//   "cols": 8
// },
// {
//   "size": 8,
//   "cols": 4
// },
// {
//   "size": 18,
//   "cols": 6
// },
// {
//   "size": 32,
//   "cols": 8
// }