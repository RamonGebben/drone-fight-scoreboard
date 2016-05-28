import React from 'react';

export default function(props) {
  return (
    <div className="fighter">
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
  );
}
