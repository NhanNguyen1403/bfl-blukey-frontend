import React, {useEffect, useState} from 'react';

import "./Transaction.scss"

import {useDispatch} from "react-redux";
import {changeTab as changeGlobalTab} from "../../redux";

import {generatePageOption} from "../../services/Generators/generatePageOption"
import {generateButton} from "../../services/Generators/generateButton"
import PageOption from "../../components/Inputs/pageOption/pageOption";
import Button from "../../components/Inputs/Button/Button";
import TransactionList from "../../components/DataExhibitions/TransactionList/TransactionList";
import TransactionForm from "../../components/Forms/TransactionForm/TransactionForm";
import getAll from "../../services/Api/GET/getAll";


function Transaction(props) {
  let dispatch = useDispatch()
  let closeButton = generateButton('close', 'icon', 'solid', 'lg', 'close-icon')
  let [currentPage, setCurrentPage] = useState(1)
  let [optionList, setOptionList] = useState([
    generatePageOption('Transactions', 'lg', true),
    generatePageOption('Create', 'lg', false),
  ])
  let [users, setUsers] = useState([])
  let [pageConfigs, setPagingConfigs] = useState({current: currentPage, totalItem: 1})



  useEffect(async () => {
    await loadData()
  }, [currentPage])



  let loadData = async () => {
    // Call getAll API to get data
    let {data, paging} = await getAll('transactions', currentPage)

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
    <div className='transaction-container'>
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
          <TransactionList
            configs={{users, pageConfigs}}
            clickHandler={{next, back, changeDirectPage}}
          />
        }

        {
          optionList[1].isActive &&
          <TransactionForm
            clickHandler={{cancel: changePageOption}}
          />
        }
      </div>
    </div>
  );
}

export default Transaction;
