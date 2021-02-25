import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { AlertBase, ModalBase } from './components/molecules';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { fas } from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false;

library.add(fas);

ReactDOM.render(
    <Provider store={store}>
        <App />
        <AlertBase />
        <ModalBase />
    </Provider>,
    document.getElementById('root'),
);
