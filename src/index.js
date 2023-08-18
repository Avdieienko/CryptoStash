import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Visualiser } from './components/Visualiser';
import { NotFound } from './components/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route
        path="/cryptostash/"
        element={<App/>}
      />
      <Route
        path="/cryptostash/:symbol"
        element={<Visualiser/>}
      />
      <Route
        path="/cryptostash/*"
        elementh={<NotFound/>}
      />
    </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
