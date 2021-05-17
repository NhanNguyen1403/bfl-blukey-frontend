import React from 'react';

import "./Table.scss"
import TableHeader from "./TableHeader/TableHeader";
import TableBody from "./TableBody/TableBody";
import Paging from "../Paging/Paging";

function Table(props) {
  let data = props.configs.fakeUsers
  let {pageConfigs} = props.configs

  return (
    <React.Fragment>
      <table className='table-container'>
        <TableHeader configs={data}/>
        <TableBody configs={data}/>
      </table>

      <div className="paging-area">
        <Paging configs={pageConfigs} clickHandler={props.clickHandler} />
      </div>
    </React.Fragment>
  );
}

export default Table;
