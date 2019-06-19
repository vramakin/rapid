import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'

import {App, store} from './App'

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
