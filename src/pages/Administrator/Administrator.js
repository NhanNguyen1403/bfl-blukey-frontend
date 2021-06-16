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

import "./Administrator.scss"

import {useDispatch} from "react-redux";
import {changeTab as changeGlobalTab} from "../../redux";

import {generatePageOption} from "../../services/Generators/generatePageOption"
import {generateButton} from "../../services/Generators/generateButton"
import getAll from "../../services/Api/GET/getAll.js"

import PageOption from "../../components/Inputs/pageOption/pageOption";
import Button from "../../components/Inputs/Button/Button";
import Table from "../../components/DataExhibitions/Table/Table";
import CreateUserForm from "../../components/Forms/CreateUserForm/CreateUserForm";

function Administrator() {
  let dispatch = useDispatch()
  let closeButton = generateButton('close', 'icon', 'solid', 'lg', 'close-icon')
  let [currentPage, setCurrentPage] = useState(1)
  let [optionList, setOptionList] = useState([
    generatePageOption('Users', 'lg', true),
    generatePageOption('Create', 'lg', false),
  ])
  let [users, setUsers] = useState([])
  let [pageConfigs, setPagingConfigs] = useState({current: currentPage, totalItem: 1})

  useEffect(async () => {
    await loadData()
  }, [currentPage])



  let loadData = async () => {
    // Call getAll API to get data
    let {data, paging} = await getAll('users', currentPage)

    setUsers(data)
    setPagingConfigs({...pageConfigs, totalItem: paging.total})
  }
  let redirectHome = () => {
    dispatch(changeGlobalTab('Home'))
  }
  let changePageOption = (optionName, andReload = false) => {
    setOptionList(optionList.map(i => {
      return generatePageOption(i.name, i.size, i.name === optionName)
    }))

    if (andReload)
      return loadData()
  }



  let changeDirectPage = (page) => {
    setCurrentPage(page)
  }
  let next = () => {
    if (currentPage < (pageConfigs.totalItem / 25))
      setCurrentPage(prevState => prevState + 1)
  }
  let back = () => {
    if (currentPage > 1)
      setCurrentPage(prevState => prevState - 1)
  }



  return (
    <div className='administrator-container'>
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
        {
          optionList[0].isActive &&
          <div className="table-area">
            <Table configs={{users, pageConfigs}} clickHandler={{next, back, changeDirectPage}}/>
          </div>
        }

        {
          optionList[1].isActive &&
          <CreateUserForm
            clickHandler={{cancel: changePageOption}}
          />
        }

      </div>
    </div>
  );
}

export default Administrator;
