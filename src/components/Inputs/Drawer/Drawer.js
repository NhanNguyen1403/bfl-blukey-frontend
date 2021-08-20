import React, {useEffect, useState} from 'react';

import "./Drawer.scss"
import logo from "../../../assets/desktop/logo.png"
import DrawerItem from "./DrawerItem/DrawerItem";
import {useDispatch, useSelector} from "react-redux";
import {changeTab as changeGlobalTab}  from "../../../redux";


function Drawer() {
	let dispatch = useDispatch(),
			{isAdmin} = JSON.parse(localStorage.getItem('user')) || false,
			{currentTab} = useSelector(state => {
				return state.tab
			})


	const changeTab = (newTab) => {
		if (newTab === currentTab)
			return
		dispatch(changeGlobalTab(newTab))
	}


	return (
		<nav className={'drawer-container'}>
			<div className="logo">
				<img src={logo} alt="BluKey Logo"/>
			</div>

			<div className="drawer-item-area">
				<DrawerItem
					path={'/home'}
					name={'Home'}
					icon={'home'}
					currentTab={currentTab}
					clickHandler={changeTab}
				/>
				<DrawerItem
					path={'/transactions'}
					name={'Transactions'}
					icon={'activity'}
					currentTab={currentTab}
					clickHandler={changeTab}
				/>
				{
					isAdmin && <DrawerItem
						path={'/users'}
						name={'Users'}
						icon={'users'}
						currentTab={currentTab}
						clickHandler={changeTab}
					/>
				}
			</div>
		</nav>
	)
}

export default Drawer;
