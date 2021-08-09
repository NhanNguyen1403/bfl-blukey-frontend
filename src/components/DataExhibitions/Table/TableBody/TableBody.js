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
  let dispatch = useDispatch()

  let viewUserDetail = (userInfo) => {
    // check User's role
    let {isAdmin} = JSON.parse(localStorage.getItem('user'))

    isAdmin
      ? dispatch(showProfileModal('edit', userInfo))
      : dispatch(showProfileModal('view', userInfo))
  }

  return (
    <tbody className='table-body-container'>
    <IconContext.Provider value={{size: '20px', className: "icon"}}>
      {
        props.configs.map(item => {
          return (
            <tr onClick={() => viewUserDetail(item)} key={`table-row-${item.id}`}>
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
