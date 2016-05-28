import React, { Component } from 'react';
import Fighter from './Fighter';
import Faker from 'Faker';

const defaultStartingScore = 3;
const colorPallet = ['2176ae', '57b8ff', 'b66d0d', 'fbb13c', 'fe6847'];

const startColors = getRandomColors(2);
const startState = {
  fighters: [
    {
      name: Faker.Internet.userName(),
      score: defaultStartingScore,
      inTheGame: true,
      color: startColors[0],
    },
    {
      name: Faker.Internet.userName(),
      score: defaultStartingScore,
      inTheGame: true,
      color: startColors[1],
    }
  ],
  gameOver: false,
  winner: null,
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
      name: Faker.Internet.userName(),
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
          name: this.state.fighters[0].name,
          score: defaultStartingScore,
          inTheGame: true,
          color: this.state.fighters[0].color,
        },
        {
          name: this.state.fighters[1].name,
          score: defaultStartingScore,
          inTheGame: true,
          color: this.state.fighters[1].color,
        }
      ],
      gameOver: false,
      winner: null,
    });
  }

  render() {
    return (
      <div className="score-board-container">
        {!this.state.gameOver ? <div className="playing-field">
          {this.state.fighters.map((fighter, i) => (
            <Fighter
              {...fighter}
              key={i}
              onScoreClick={this.onScoreClick.bind(this, i)}
            />
          ))}
          <div className="button" onClick={this.onAddFighter.bind(this)}>Add fighter</div>
        </div> :
        <div className="game-over">
          <h1>Game Over</h1>
          <h2>Winner:</h2>
          <Fighter {...this.state.winner} />
          <div className="button" onClick={this.resetPlayingField.bind(this)}>Rematch</div>
        </div>
        }
      </div>
    );
  }
}


export default ScoreBoard;
