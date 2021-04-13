import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './i18n';
import App from './App';
import { Provider } from 'react-redux';
import Loader from './components/loaderComponent';
import store from './app/store';

ReactDOM.render(
    <Suspense fallback={<Loader />}>
      <Provider store={store} >
        <App />
      </Provider>
    </Suspense>
,document.getElementById('root'));
