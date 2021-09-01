import React from 'react';

import {IconContext} from "react-icons";
import {FaUsers} from "react-icons/fa";
import {FiActivity} from "react-icons/fi";
import {TiHome} from "react-icons/ti";
import {IoDocuments} from "react-icons/io5";

import "./DrawerItem.scss"
import {Link} from "react-router-dom";

function DrawerItem({path, name, icon, currentTab, clickHandler}) {
	return (
		<Link to={path}>
			<div
				onClick={() => clickHandler(name)}
				className={`drawer-item-container ${currentTab === name ? 'active' : ''}`}
				>
					<IconContext.Provider value={{size: '20px', className: "icon"}}>
						<div className="icon-area">
							{icon === 'home' && <TiHome/>}
							{icon === 'users' && <FaUsers/>}
							{icon === 'activity' && <FiActivity/>}
							{icon === 'documents' && <IoDocuments/>}
						</div>
					</IconContext.Provider>

					{name}
			</div>
		</Link>
	);
}

export default DrawerItem;
