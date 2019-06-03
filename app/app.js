import React from 'react';
import ReactDOM from 'react-dom';
// const io = require('socket.io-client');

import 'antd/dist/antd.css';
import './app.scss';

/* Import Components */
import Whiteboard from './components/Whiteboard';
// const socket = io();

ReactDOM.render(<Whiteboard/>, document.getElementById('main'));