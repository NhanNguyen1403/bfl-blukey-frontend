import React, {useEffect, useState} from 'react';

import "./Transaction.scss"

import {useDispatch, useSelector} from "react-redux";
import {changeTab as changeGlobalTab} from "../../redux";
import {completeReload} from "../../redux";

import {generatePageOption} from "../../services/Generators/generatePageOption"
import {generateButton} from "../../services/Generators/generateButton"
import PageOption from "../../components/Inputs/pageOption/pageOption";
import Button from "../../components/Inputs/Button/Button";
import TransactionList from "../../components/DataExhibitions/TransactionList/TransactionList";
import TransactionForm from "../../components/Forms/TransactionForm/TransactionForm";
import getAll from "../../services/Api/GET/getAll";
import TransactionFilter from "../../components/DataExhibitions/TransactionList/TransactionFilter/TransactionFilter";


function Transaction() {
  let dispatch = useDispatch(),
      closeButton = generateButton('close', 'icon', 'solid', 'lg', 'close-icon'),
      [currentPage, setCurrentPage] = useState(1),
      [optionList, setOptionList] = useState([
        generatePageOption('Transactions', 'lg', true),
        generatePageOption('Create', 'lg', false),
      ]),
      [params, setParams] = useState({
        transactionId: '',
        startDate: '',
        endDate: '',
        agentName: '',
        transactionStatusId: ''
      }),
      [transactions, setTransactions] = useState([]),
      [pageConfigs, setPagingConfigs] = useState({current: currentPage, itemPerPage: 5, totalItem: 1}),
      {needReload} = useSelector(state => {
        return state.reload
      })




  useEffect(async () => {
    await loadData()
    setPagingConfigs(prev => {return {...prev, current: currentPage}})
  }, [currentPage, params])

  useEffect(async () => {
    if (needReload){
      await loadData()
      dispatch(completeReload())
    }
  }, [needReload])


  let loadData = async () => {
    // Call getAll API to get data
    let {data, paging} = await getAll('transactions', {...params, page: currentPage, limit: 5})

    setTransactions(data)
    setPagingConfigs(prev => {return {...prev, totalItem: paging.total}})
  }
  let redirectHome = () => {
    dispatch(changeGlobalTab('Home'))
  }
  let changePageOption = (optionName) => {
    setOptionList(optionList.map(i => {
      return generatePageOption(i.name, i.size, i.name === optionName)
    }))
  }


  let filterHandler = async (params) => {
    console.log(1, params)
    setParams({...params})
    setCurrentPage(1)
    setPagingConfigs(prev => {return {...prev, current: currentPage}})
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
          optionList[0].isActive && (
            <div className={'transaction-and-filter'}>
              <div className="filter-area">
                <TransactionFilter configs={params} clickHandler={{filterHandler}}/>
              </div>

              <TransactionList
                configs={{transactions, pageConfigs}}
                clickHandler={{next, back, changeDirectPage}}
              />
            </div>
          )
        }

        {
          optionList[1].isActive &&
          <TransactionForm
            configs={{transaction: {}, mode: 'create'}}
            clickHandler={{cancel: changePageOption}}
          />
        }
      </div>
    </div>
  );
}

export default Transaction;
