import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';  // Asegúrate de que la ruta sea la correcta

ReactDOM.render(
  <Router basename="/gh_pages_MUNDOLOCO">  {/* Configura el basename para las rutas */}
    <App />
  </Router>,
  document.getElementById('root')
);