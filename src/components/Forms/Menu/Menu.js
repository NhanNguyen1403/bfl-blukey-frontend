import React, {useEffect, useRef, useState} from 'react';

import "./Menu.scss"

import {showProfileModal}  from "../../../redux";

import {generateButton} from "../../../services/Generators/generateButton";
import LogOut from "../../../services/Session/LogOut";
import Button from "../../Inputs/Button/Button";
import {useDispatch} from "react-redux";

function Menu() {
	let [displayMenu, setDisplayMenu] = useState(false)
	let profileButton = generateButton('profile', 'icon', 'circle secondary', 'lg', 'user-icon')
	let dispatch = useDispatch()

	let menuListRef = useRef()
	useEffect(() => {
		displayMenu
			? document.addEventListener('mousedown', handleClickOutside)
			: document.removeEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [displayMenu]);

	let toggleMenu = () => {
		setDisplayMenu(prevState => !prevState)
	}
	let showModal = () => {
		setDisplayMenu(false)
		dispatch(showProfileModal())
	}

	let handleClickOutside = (e) => {
		if (!menuListRef.current || !menuListRef.current.contains(e.target)) {
			setDisplayMenu(false);
		}
	};

	return (
		<div className='menu-container'>
			<div className="menu-sub-container">
				<Button configs={profileButton} clickHandler={toggleMenu}/>

				{
					displayMenu && <div ref={menuListRef} className="menu-list">
						<div onClick={showModal} className="menu-item">Profile</div>
						<hr/>
						<div onClick={LogOut} className="menu-item">Log out</div>
					</div>
				}
			</div>
		</div>
	);
}

export default Menu;
