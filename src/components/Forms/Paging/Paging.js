import React from 'react';
import {IoIosArrowDropleftCircle} from "react-icons/io";
import {IoIosArrowDroprightCircle} from "react-icons/io";

import "./Paging.scss"
import {IconContext} from "react-icons";

function Paging(props) {
  return (
    <div className='paging-container'>
      <IconContext.Provider value={{size: '25px', className: "icon"}}>
        <IoIosArrowDropleftCircle/>
        <IoIosArrowDroprightCircle/>
      </IconContext.Provider>
    </div>
);
}

export default Paging;
