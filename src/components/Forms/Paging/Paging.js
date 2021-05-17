import React, {useEffect} from 'react';

import {IconContext} from "react-icons";
import {IoIosArrowDropleftCircle} from "react-icons/io";
import {IoIosArrowDroprightCircle} from "react-icons/io";

import "./Paging.scss"

function Paging(props) {
  let {current, total} = props.configs
  let {next, back} = props.clickHandler
  let pageItems = []

  useEffect(() => {
    for (let i = 1; i <= total; i++) {
      pageItems.push(i)
    }

  }, [current])

  return (
    <div className='paging-container'>
      <IconContext.Provider value={{size: '25px', className: "icon"}}>
        <IoIosArrowDropleftCircle onClick={back}/>
        {
          pageItems.map(i => {
            return <span className='page-item' key={`page-item-${i}`}>{i}</span>
          })
        }
        <IoIosArrowDroprightCircle onClick={next}/>
      </IconContext.Provider>
    </div>
);
}

export default Paging;
