import React, {useEffect, useRef, useState} from 'react';

import "./Menu.scss"

import {showProfileModal}  from "../../../redux";
import {useDispatch} from "react-redux";

import {gButton} from "../../../services/Generators/gButton";
import LogOut from "../../../services/Session/LogOut";
import Button from "../../Inputs/Button/Button";

function Menu() {
	let [displayMenu, setDisplayMenu] = useState(false),
			profileButton = gButton('profile', 'icon', 'circle secondary', 'lg', 'user-icon'),
			dispatch = useDispatch(),
			menuListRef = useRef()



	useEffect(() => {
		displayMenu
			? document.addEventListener('mousedown', clickOutsideHandler)
			: document.removeEventListener('mousedown', clickOutsideHandler)

		return () => {
			document.removeEventListener('mousedown', clickOutsideHandler);
		};
	}, [displayMenu]);



	let clickOutsideHandler = (e) => {
		if (!menuListRef.current || !menuListRef.current.contains(e.target)) {
			setDisplayMenu(false);
		}
	};
	let toggleMenu = () => {
		setDisplayMenu(prevState => !prevState)
	}
	let showModal = () => {
		setDisplayMenu(false)
		dispatch(showProfileModal('edit', JSON.parse(localStorage.getItem('user'))))
	}



	return (
		<div className='menu-container'>
			<div className="menu-sub-container">
				<Button configs={profileButton} clickHandler={toggleMenu}/>

				{
					displayMenu && <div ref={menuListRef} className="menu-list">
						<div onClick={showModal} className="menu-item">Profile</div>
						<hr/>
						<div onClick={() => LogOut(true)} className="menu-item">Log out</div>
					</div>
				}
			</div>
		</div>
	);
}

export default Menu;
