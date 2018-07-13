// react && router
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import AppRouter from './router/AppRouter'
import store from './store/store.js';
import './firebase/firebase';
import {Provider} from 'react-redux';


// styles
import '../src/styles/style.scss'; // custom
import 'semantic-ui-css/semantic.min.css'; // semantic UI

const mystore = store();
console.log(mystore.getState());

// store Provider
const jsx = (
      <Provider store={mystore}>
          <AppRouter />
      </Provider>
);


ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();
