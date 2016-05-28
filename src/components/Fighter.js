import React from 'react';

export default function(props) {
  return (
    <div className="fighter">
      <h2>{props.name}</h2>
      <div
        className="score"
        style={{ backgroundColor: `#${props.color}` }}
        onClick={props.onScoreClick}
      >
        <div className="number">
          {props.score}
        </div>
      </div>
    </div>
  )
}
