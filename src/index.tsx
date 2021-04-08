import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import App from './App';
import Loader from './components/loaderComponent';

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <App />
  </Suspense>
,document.getElementById('root'));
