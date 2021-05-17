import React from 'react';

import {IconContext} from "react-icons";
import {IoIosArrowDropleftCircle} from "react-icons/io";
import {IoIosArrowDroprightCircle} from "react-icons/io";

import "./Paging.scss"

function Paging(props) {
  let {next, back} = props.clickHandler

  return (
    <div className='paging-container'>
      <IconContext.Provider value={{size: '25px', className: "icon"}}>
        <IoIosArrowDropleftCircle onClick={back}/>
        <IoIosArrowDroprightCircle onClick={next}/>
      </IconContext.Provider>
    </div>
);
}

export default Paging;
