import React, {useEffect, useState} from 'react';

import "./Drawer.scss"
import logo from "../../../assets/desktop/logo.png"
import DrawerItem from "./DrawerItem/DrawerItem";
import {useDispatch, useSelector} from "react-redux";
import {changeTab as changeGlobalTab}  from "../../../redux";

function Drawer() {
	let [drawerList, setDrawerList] = useState([]),
			dispatch = useDispatch(),
			{currentTab} = useSelector(state => {
				return state.tab
			})


	useEffect(() => {
		setDrawerList(drawerList.map(i => {
			return {
				...i,
				isActive: i.name === currentTab
			}
		}))
	}, [currentTab])

	useEffect(() => {
		let {isAdmin} = JSON.parse(localStorage.getItem('user'))
		if (isAdmin) {
			setDrawerList([
				{name: "Home", icon: 'home', isActive: true},
				{name: "Administrator", icon: 'users', isActive: false},
				{name: "Transaction", icon: 'activity', isActive: false},
			])
		} else {
			setDrawerList([
				{name: "Home", icon: 'home', isActive: true},
				{name: "Transaction", icon: 'activity', isActive: false},
			])
		}
	}, [])

	const changeTab = (itemName) => {
		if (itemName === currentTab)
			return

		dispatch(changeGlobalTab(itemName))
		setDrawerList(drawerList.map(i => {
			return {
				...i,
				isActive: i.name === itemName
			}
		}))
	}

	return (
		<div className='drawer-container'>
			<div className="logo">
				<img src={logo} alt="BluKey Logo"/>
			</div>

			<div className="drawer-item-area">
				{
					drawerList.map(i => {
						return (<DrawerItem key={i.name} configs={i} clickHandler={changeTab}/>)
					})
				}
			</div>

		</div>
	);
}

export default Drawer;
