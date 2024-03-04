import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';

const container = document.createElement('div');

document.body.appendChild(container);

const appRoot = createRoot(container);

appRoot.render(<App />);
