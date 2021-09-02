/****************************************************
 * 1. Received configs: data to render the table
 * 2. Using switch-case for special columns
 *****************************************************/

import React from 'react';
import {useDispatch} from "react-redux";
import {showProfileModal} from "../../../../redux";

import {IconContext} from "react-icons";
import {FaCheckCircle} from "react-icons/fa";
import moment from 'moment'

import "./TableBody.scss"

function TableBody(props) {
  let {data} = props.configs,
      {rowAction} = props.clickHandler

  return (
    <tbody className='table-body-container'>
    <IconContext.Provider value={{size: '20px', className: "icon"}}>
      {
        data.map(item => {
          return (
            <tr onClick={() => rowAction(item)} key={`table-row-${item.id}`}>
              {
                Object.keys(item).map(key => {
                  switch (key) {
                    case 'isAdmin': {
                      return (
                        <td key={`row-item-${item.id}-${key}`} className={item[key] ? 'icon' : ''}>
                          {item[key] ? <FaCheckCircle/> : ''}
                        </td>
                      )
                    }

                    case 'lastLoginDate': {
                      return (
                        <td key={`row-item-${item.id}-${key}`} title={moment(item[key]).endOf('day').fromNow()}>
                          {moment(item[key]).format('L')}
                        </td>
                      )
                    }

                    case 'updatedAt': {
                      return
                    }

                    case 'createAt':
                      return

                    case 'isRequired':
                      return (
                        <td key={`row-item-${item.id}-${key}`} className={item[key] ? 'icon' : ''}>
                          {item[key] ? <FaCheckCircle/> : ''}
                        </td>
                      )

                    case 'isBoth':
                      return (
                        <td key={`row-item-${item.id}-${key}`} className={item[key] ? 'icon' : ''}>
                          {item[key] ? <FaCheckCircle/> : ''}
                        </td>
                      )

                    case 'isListing':
                      return (
                        <td key={`row-item-${item.id}-${key}`} className={item[key] ? 'icon' : ''}>
                          {item[key] ? <FaCheckCircle/> : ''}
                        </td>
                      )

                    default: {
                      return (
                        <td key={`row-item-${item.id}-${key}`}>
                          {item[key]}
                        </td>
                      )
                    }
                  }
                })
              }
            </tr>
          )
        })
      }
    </IconContext.Provider>
    </tbody>
  )

}

export default TableBody;
