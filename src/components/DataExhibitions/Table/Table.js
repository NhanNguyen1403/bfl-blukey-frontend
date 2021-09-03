/*****************************************************************
 * 1. Received configs: "data", "pageConfigs" to render the table
 *    Pass "data" as configs to TableHeader and TableBody
 *    Pass "pageConfigs" as configs to Paging
 * 2. Received clickHandler and pass it to Paging
 *****************************************************************/

import React from 'react';

import "./Table.scss"
import TableHeader from "./TableHeader/TableHeader";
import TableBody from "./TableBody/TableBody";
import Paging from "../Paging/Paging";

function Table(props) {
  let {data, pageConfigs} = props.configs,
      {rowAction} = props.clickHandler
  return (
    <React.Fragment>
      <table className='table-container'>
        <TableHeader configs={data}/>
        <TableBody configs={{data}} clickHandler={{rowAction}}/>
      </table>

      <div className="paging-area">
        <Paging configs={pageConfigs} clickHandler={props.clickHandler} />
      </div>
    </React.Fragment>
  );
}

export default Table;
