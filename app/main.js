import React from 'react';
import {render} from 'react-dom';
import ScoreBoard from './components/ScoreBoard.js';

import './stylesheets/main.css';

function renderShell() {
  const shell = document.createElement('div');
  shell.id = 'app';
  document.body.appendChild(shell);

  render(<ScoreBoard />, document.querySelector('#app'));
}

renderShell();
