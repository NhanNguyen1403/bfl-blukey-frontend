import React from 'react';

import "./Menu.scss"
import {generateButton} from "../../../services/Generators/generateButton";
import Button from "../../Inputs/Button/Button";

function Menu() {
  let profileButton = generateButton('profile', 'icon', 'circle secondary', 'lg', 'user-icon')

  let clickHandler = () => {
    console.log('show modal')
  }
  return (
    <div className='menu-container'>
      <Button configs={profileButton} clickHandler={clickHandler}/>
    </div>
  );
}

export default Menu;
