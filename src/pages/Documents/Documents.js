/****************************************************
 * 1. Setup configs for PageOptions
 *    Change pageOptions: Administrator, Create
 * 2. Setup configs for Table
 *    Load init data for Table
 *    Get new Data every time change currentPage
 * 3. Setup configs for CreatUser Modal
 *    Call Api to CreateUser
 *****************************************************/

import React, {useEffect, useState} from 'react';

import "./Documents.scss"

import {useDispatch, useSelector} from "react-redux";
import {changeTab as changeGlobalTab} from "../../redux";
import {completeReload} from "../../redux";

import {generatePageOption} from "../../services/Generators/generatePageOption"
import {generateButton} from "../../services/Generators/generateButton"
import getAll from "../../services/Api/GET/getAll.js"

import PageOption from "../../components/Inputs/pageOption/pageOption";
import Button from "../../components/Inputs/Button/Button";
import Table from "../../components/DataExhibitions/Table/Table";
import CreateUserForm from "../../components/Forms/CreateUserForm/CreateUserForm";
import {Route, Switch, useHistory, useRouteMatch} from "react-router-dom";

function Documents() {
  let dispatch = useDispatch(),
    closeButton = generateButton('close', 'icon', 'solid', 'lg', 'close-icon'),
    [currentPage, setCurrentPage] = useState(1),
    [optionList, setOptionList] = useState([
      generatePageOption('','Documents', 'lg', true),
      generatePageOption('/create','Create', 'lg', false),
    ]),
    [users, setUsers] = useState([]),
    [pageConfigs, setPagingConfigs] = useState({current: currentPage, itemPerPage: 25, totalItem: 1}),
    {needReload} = useSelector(state => {
      return state.reload
    }),
    {currentTab} = useSelector(state => {
      return state.tab
    }),
    {path} = useRouteMatch(),
    currentPath = window.location.pathname,
    history = useHistory()



  useEffect(async () => {
    await loadData()
    setPagingConfigs(prev => {return {...prev, current: currentPage}})
  }, [currentPage])

  useEffect(async () => {
    if (needReload) {
      await loadData()
      dispatch(completeReload())
    }
  }, [needReload])

  useEffect(() => {
    if (currentTab !== 'Users')
      dispatch(changeGlobalTab('Users'))

  }, [currentTab])

  useEffect(() => {
    if (currentPath === '/documents' || currentPath === '/documents/')
      return changePageOption('Documents')
    if (currentPath === '/documents/create' || currentPath === '/documents/create/')
      changePageOption('Create')
  }, [currentPath])


  let loadData = async () => {
    // Call getAll API to get data
    let {data, paging} = await getAll('users', {page: currentPage, fullName: ''})

    setUsers(data)
    setPagingConfigs(prev => {return {...prev, totalItem: paging.total}})
  }
  let redirectHome = () => {
    dispatch(changeGlobalTab('Home'))
    history.push("/home")
  }
  let changePageOption = (optionName) => {
    setOptionList(optionList.map(i => {
      return generatePageOption(i.path, i.name, i.size, i.name === optionName)
    }))
  }



  let changeDirectPage = (page) => {
    setCurrentPage(page)
  }
  let next = () => {
    if (currentPage < (pageConfigs.totalItem / pageConfigs.itemPerPage))
      setCurrentPage(prevState => prevState + 1)
  }
  let back = () => {
    if (currentPage > 1)
      setCurrentPage(prevState => prevState - 1)
  }



  return (
    <div className='documents-container'>
      <div className="options-area">
        {
          optionList.map(i => {
            return (<PageOption key={`option-${i.name}`} configs={i} clickHandler={changePageOption}/>)
          })
        }

        <div className="button-area">
          <Button configs={closeButton} clickHandler={redirectHome}/>
        </div>
      </div>

      <div className="content-area">
        <Switch>
          {
            <Route path={`${path}`} exact>
              <div className="table-area">
                <Table configs={{users, pageConfigs}} clickHandler={{next, back, changeDirectPage}}/>
              </div>
            </Route>
          }

          {
            <Route path={`${path}/create`}>
              <CreateUserForm
                clickHandler={{cancel: changePageOption}}
              />
            </Route>
          }
        </Switch>
      </div>
    </div>
  );
}

export default Documents;
