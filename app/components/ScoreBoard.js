import React, { Component } from 'react';
import Fighter from './Fighter';
import Faker from 'Faker';

const defaultStartingScore = 3;
const colorPallet = ['2176ae', '57b8ff', 'b66d0d', 'fbb13c', 'fe6847'];

const startColors = getRandomColors(2);
const startState = {
  fighters: [
    {
      score: defaultStartingScore,
      inTheGame: true,
      color: startColors[0],
    },
    {
      score: defaultStartingScore,
      inTheGame: true,
      color: startColors[1],
    }
  ],
  gameOver: false,
  winner: null,
  showRules: false,
};


function getRandomColor() {
  return colorPallet[Math.floor(Math.random()*colorPallet.length)];
}

function getRandomColors(amount) {
  const chosenColors = [];
  for (let i = 0; i < amount; i++) {
    let color = getRandomColor();
    if (chosenColors.includes(color)) {
      color = getRandomColor();
    }
    chosenColors.push(color);
  }
  return chosenColors;
}

class ScoreBoard extends Component {
  constructor(props) {
    super(props);
    this.state = Object.assign({}, startState);
  }

  onScoreClick(fighterIndex) {
    const fighters = [].concat(this.state.fighters);
    const fighter = fighters[fighterIndex];
    fighter.score = fighter.score - 1;

    if (fighter.score === 0) {
      fighter.inTheGame = false;

      const fightersStillInTheGame = fighters.filter(f => f.inTheGame === true);
      if (fightersStillInTheGame.length === 1) {
        return this.setState({ gameOver: true, winner: fightersStillInTheGame[0] });
      }
    }

    return this.setState({ fighters });
  }

  onAddFighter() {
    const newFighter = {
      score: defaultStartingScore,
      inTheGame: true,
      color: getRandomColor(),
    };

    const colorAlreadyTakes = this.state.fighters
      .map(f => f.color)
      .includes(newFighter.color);

    if (colorAlreadyTakes) {
      newFighter.color = getRandomColor();
    }

    const fighters = this.state.fighters.concat(newFighter);
    this.setState({ fighters });
  }

  resetPlayingField() {
    this.setState({
      fighters: [
        {
          score: defaultStartingScore,
          inTheGame: true,
          color: this.state.fighters[0].color,
        },
        {
          score: defaultStartingScore,
          inTheGame: true,
          color: this.state.fighters[1].color,
        }
      ],
      gameOver: false,
      winner: null,
    });
  }

  toggleRules() {
    this.setState({ showRules: !this.state.showRules });
  }

  render() {
    return (
      <div className="score-board-container">
        <header />
        {!this.state.gameOver ? <div className="playing-field">
          {this.state.fighters.map((fighter, i) => (
            <Fighter
              {...fighter}
              key={i}
              onScoreClick={this.onScoreClick.bind(this, i)}
            />
          ))}
          <div className="button" onClick={this.toggleRules.bind(this)}>Show rules</div>
        </div> :
        <div className="game-over">
          <h1>Game Over</h1>
          <h2>Winner:</h2>
          <Fighter {...this.state.winner} />
          <div className="button" onClick={this.resetPlayingField.bind(this)}>Rematch</div>
        </div>
        }

        {this.state.showRules &&
        <div className="rules">
          <h3>Rules of Drone Combat</h3>
          <p>Standard drone combat consists of two drones fighting head to head in a pre-defined arena.  The objective is to knock the opponent’s drone to the floor while avoiding your own drone hitting the floor.</p>
          <p>Combat starts with each drone ready-to-fly and idling in a designated landing zone or ring.  At the sound of the buzzer, each drone lifts into the air.</p>
          <p>Each player begins with 3 points.  One point is deducted each time a player’s drone touches the floor. The first player to reach 0 points is declared the loser.</p>
          <p>If combat results in both drones hitting the floor at the same time or within 3 seconds of each other, then both players loses a point.  However, a game-winning point or “kill” point can NOT be obtained if both drones hit the floor at the same time or within 3 seconds of each other (ie.  The winning drone must NOT hit the floor with 3 seconds of the losing drone hitting the floor for final kill point).</p>
          <p>Each time a drone crashes, Pilots have 90 seconds to lift off again.  During this time they are permitted to enter the arena to make emergency repairs, replace batteries & parts or make adjustments to their drone.  Pilots have 90 seconds to get their drone flying or they are eliminated from the match.  During this time the healthy drone is allowed to land and rest. If for any reason a drone hits the floor outside of the ring upon landing or otherwise crashes or can’t lift-off again, it will lose a point as if it had crashed in combat.</p>
          <p>Matches end at 5 minutes.  The drone with the highest score will be declared the winner.  If there is a tie, the winner will be determined by tennis ball firing squad or sudden death.</p>
          <div className="button" onClick={this.toggleRules.bind(this)}>Close</div>
        </div>}
      </div>
    );
  }
}


export default ScoreBoard;
