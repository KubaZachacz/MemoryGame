import React from 'react';
import './GameLives.scss';

const GameLives = (props) => {

  const MAXCHANCES = 3;

  const liveStyle = {
    height: 0.75 * props.size,
    top: -((props.size-0.75 * props.size)/2)-0.75 * props.size,
  }

  let iconStyle = {
    color: props.color,
    fontSize: 0.75 * props.size,
    opacity: '0'
  }

  let chances = [];
  for (let i=0; i < MAXCHANCES; i++ ) {
    (MAXCHANCES-i <= props.chances) ?  iconStyle.opacity = '1' : iconStyle.opacity = '0';
    chances.push(<i key={i} className="fas fa-heart" style={{...iconStyle}}></i>)
  }
  
  return (
    <div className={"GameLives"} style={liveStyle}>
      {chances}
    </div>
  )
}

export default GameLives
