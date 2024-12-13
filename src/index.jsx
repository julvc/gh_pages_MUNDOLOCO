import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; // Asegúrate de tener los estilos globales si es necesario.

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
    <BrowserRouter basename="/gh_pages_MUNDOLOCO">
        <App />
    </BrowserRouter>
);