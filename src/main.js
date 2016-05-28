import React from 'react';
import {render} from 'react-dom';
import ScoreBoard from './components/ScoreBoard.js';

import './styles/index.less';

render(<ScoreBoard />, document.querySelector('#app'));
