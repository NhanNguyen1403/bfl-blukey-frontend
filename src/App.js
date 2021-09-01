import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import './App.scss';
import checkSession from "./services/Session/checkSession"

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Transaction from "./pages/Transaction/Transaction";
import Administrator from "./pages/Administrator/Administrator";
import Documents from "./pages/Documents/Documents";

import Drawer from "./components/Inputs/Drawer/Drawer";
import Menu from "./components/Inputs/Menu/Menu";
import SnackBar from "./components/SnackBar/SnackBar";
import ProfileModal from "./components/Modals/ProfileModal/ProfileModal";
import Loader from "./components/Modals/Loader/Loader";
import {changeTab as changeGlobalTab} from "./redux";
import {
	BrowserRouter,
	Switch,
	Route, Redirect,
} from "react-router-dom";

function App() {
	checkSession().catch(err => console.log(new Error(err)))
	let dispatch = useDispatch(),
			{isAdmin} = JSON.parse(localStorage.getItem('user')) || false,
			{isDisplay: isLoaderDisplay} = useSelector(state => {
				return state.loader
			})
	const {isLogged} = useSelector(state => {
					return state.session
				}),
				{currentTab} = useSelector(state => {
					return state.tab
				})


	useEffect(() => {
		checkSession().catch(err => console.log(new Error(err)))
	}, [isLogged])

	let redirectHome = () => {
		dispatch(changeGlobalTab('Home'))
		return <Redirect to="/home" />
	}

	if (!isLogged)
		return (
			<div className="App">
				<Login/>
				<SnackBar isLogging={true}/>
				{isLoaderDisplay && <Loader isLogging={true}/>}
			</div>
		)

	return (
		<BrowserRouter>
			<div className="App">
				<Drawer/>
				<div className="top-cover"/>
				<Switch>
					<Route path="/" component={Home} exact/>
					<Route path="/home" component={Home}/>
					<Route path="/transactions" component={Transaction}/>
					<Route path="/users">
						{isAdmin ? <Administrator /> : redirectHome}
					</Route>
					<Route path="/documents">
						{isAdmin ? <Documents /> : redirectHome}
					</Route>
					<Route path="/login" component={Home}/>
					<Route path="/" component={Home}/>
				</Switch>
				<Menu/>
				<SnackBar/>
				<ProfileModal />
				{isLoaderDisplay && <Loader/>}
			</div>
		</BrowserRouter>
	)
}

export default App;
