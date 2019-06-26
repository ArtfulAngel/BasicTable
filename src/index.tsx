import React from 'react';
import ReactDOM from 'react-dom';

// import * as serviceWorker from './serviceWorker';

import './index.css';
import { ExamplePage } from './components/BasicTable/ExamplePage';

ReactDOM.render(
    <div style={{ margin: '1rem' }}>
        <ExamplePage />
    </div>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
