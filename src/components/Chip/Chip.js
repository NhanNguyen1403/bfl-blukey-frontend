import React from 'react';
import "./Chip.scss"
import {useSelector} from "react-redux";

function Chip(props) {
	let {name, type, isActive} = props.configs
  let [isDisplayed, setIsDisplayed ] = useSelector('inactive')

  const hideChip = (e) => {
    setTimeout(() => {
      props.configs.setIsActive = false
    }, 5000)
  }

  if (isActive) {
    toggleClass = 'active'
    hideChip()
  }

	return (
		<div className={`chip-container ${type} ${toggleClass}`}>
			{name}
			<span onClick={e => hideChip(e)} > X </span>
		</div>
	);
}

export default Chip;
