import React, {useEffect} from "react";
import {useSelector} from "react-redux";

import './App.scss';
import checkSession from "./services/Session/checkSession"

import Login from "./pages/Login/Login";
import Drawer from "./components/Forms/Drawer/Drawer";
import Home from "./pages/Home/Home";
import Administrator from "./pages/Administrator/Administrator";
import Transaction from "./pages/Transaction/Transaction";

function App() {
	const {isLogged} = useSelector(state => {
		return state.session
	})
	const {currentTab} = useSelector(state => {
		return state.tab
	})

	useEffect(() => {
		checkSession().catch(err => console.log(new Error(err)))
	}, [isLogged])

	if (!isLogged)
		return (
			<div className="App">
				<Login/>
			</div>
		)

	return (
		<div className="App">
			<Drawer/>
			<div className="top-cover"></div>
			{ currentTab === 'Home' && <Home/>}
			{ currentTab === 'Administrator' && <Administrator/>}
			{ currentTab === 'Transaction' && <Transaction/>}
		</div>
	);
}

export default App;
