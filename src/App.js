import React, {useEffect} from "react";
import {useSelector} from "react-redux";

import './App.scss';
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Drawer from "./components/Drawer/Drawer";
import checkSession from "./services/Session/checkSession"

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
		</div>
	);
}

export default App;
