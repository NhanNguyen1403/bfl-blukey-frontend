import 'regenerator-runtime/runtime'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./redux/store"
import {Provider} from "react-redux";

// Init App --Test github's Action
ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<App/>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);
reportWebVitals();
