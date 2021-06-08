import React from 'react';

import {IconContext} from "react-icons";
import {FaUsers} from "react-icons/fa";
import {FiActivity} from "react-icons/fi";
import {TiHome} from "react-icons/ti";

import "./DrawerItem.scss"

function DrawerItem(props) {
	let {name, icon, isActive} = props.configs

	return (
		<div
			onClick={() => props.clickHandler(name)}
			className={`drawer-item-container ${isActive ? 'active' : ''}`}>

			<IconContext.Provider value={{size: '20px', className: "icon"}}>
				<div className="icon-area">
					{icon === 'home' && <TiHome/>}
					{icon === 'users' && <FaUsers/>}
					{icon === 'activity' && <FiActivity/>}
				</div>
			</IconContext.Provider>

			{name}
		</div>
	);
}

export default DrawerItem;