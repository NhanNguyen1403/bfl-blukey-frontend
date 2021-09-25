import React from 'react'

import "./SubTab.scss"

export default function SubTab(props) {
	let { tabs, currentTab, styles } = props.configs,
			{ changeSubTab } = props.handlers
	
	return (
		<div className={`sub-tab ${styles}`}>
			{
				tabs.map(tab => {
					return (
						<div
							key={tab}
							className={`sub-tab__item ${tab === currentTab ? 'active' : ''}`}
							onClick={() => changeSubTab(tab)}>
							{tab}
						</div>
					)
				})
			}
		</div>
	)
}
