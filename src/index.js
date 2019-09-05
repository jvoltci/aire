import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import {LightTheme, BaseProvider} from 'baseui';
import { Client as Styletron } from "styletron-engine-atomic";


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import {Provider} from 'react-redux'
import {store, persistor} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

// 1. Create a client engine instance
const engine = new Styletron();

// 2. Provide the engine to the app
ReactDOM.render(
  <Provider store={store}>
  	<PersistGate loading={null} persistor={persistor}>
  		<StyletronProvider value={engine} debug={debug} debugAfterHydration>
	      <BaseProvider theme={LightTheme}>
	         <App />
	      </BaseProvider>
	  	</StyletronProvider>
  	</PersistGate>
  </Provider>, document.getElementById('root')
  );

/// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


