import React, {useEffect} from "react";
import {useSelector} from "react-redux";

import './App.scss';
import checkSession from "./services/Session/checkSession"

import Login from "./pages/Login/Login";
import Drawer from "./components/Inputs/Drawer/Drawer";
import Home from "./pages/Home/Home";
import Administrator from "./pages/Administrator/Administrator";
import Transaction from "./pages/Transaction/Transaction";
import Menu from "./components/Inputs/Menu/Menu";
import SnackBar from "./components/SnackBar/SnackBar";
import ProfileModal from "./components/Modals/ProfileModal/ProfileModal";
import Loader from "./components/Modals/Loader/Loader";

function App() {
	const {isLogged} = useSelector(state => {
		return state.session
	})
	const {currentTab} = useSelector(state => {
		return state.tab
	})
	let {isDisplay: isLoaderDisplay} = useSelector(state => {
		return state.loader
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
			<div className="top-cover"/>
			{currentTab === 'Home' && <Home/>}
			{currentTab === 'Administrator' && <Administrator/>}
			{currentTab === 'Transaction' && <Transaction/>}
			<Menu/>
			<SnackBar/>
			<ProfileModal/>
			{isLoaderDisplay && <Loader/>}
		</div>
	);
}

export default App;
