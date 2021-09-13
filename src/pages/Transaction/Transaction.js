import React, {useEffect, useState} from 'react';

import "./Transaction.scss"

import {useDispatch, useSelector} from "react-redux";
import {changeTab as changeGlobalTab} from "../../redux";
import {completeReload} from "../../redux";

import PageOption from "../../components/Inputs/pageOption/pageOption";
import Button from "../../components/Inputs/Button/Button";
import TransactionList from "../../components/DataExhibitions/TransactionList/TransactionList";
import TransactionFilter from "../../components/DataExhibitions/TransactionList/TransactionFilter/TransactionFilter";
import TransactionForm from "../../components/Forms/TransactionForm/TransactionForm";

import {gPageOption} from "../../services/Generators/gPageOption"
import {gButton} from "../../services/Generators/gButton"
import getAll from "../../services/Api/GET/getAll";
import {Route, Switch, useHistory, useRouteMatch} from "react-router-dom";


function Transaction() {
  let dispatch = useDispatch(),
      closeButton = gButton('close', 'icon', 'solid', 'lg', 'close-icon'),
      [currentPage, setCurrentPage] = useState(1),
      [optionList, setOptionList] = useState([
        gPageOption('','Transactions', 'lg', true),
        gPageOption('/create','Create', 'lg', false),
      ]),
      [params, setParams] = useState({
        transactionId: '',
        startDate: '',
        endDate: '',
        transactionStatusId: '',
        agentName: '',
        buyer: '',
        seller: '',
        isListing: true,
        address: '',
      }),
      [transactions, setTransactions] = useState([]),
      [pageConfigs, setPagingConfigs] = useState({current: currentPage, itemPerPage: 5, totalItem: 1}),
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
  }, [currentPage, params])

  useEffect(async () => {
    if (needReload){
      await loadData()
      dispatch(completeReload())
    }
  }, [needReload])

  useEffect(() => {
    if (currentTab !== 'Transactions')
      dispatch(changeGlobalTab('Transactions'))
  }, [currentTab])

  useEffect(() => {
    if (currentPath === '/transactions' || currentPath === '/transactions/')
      return changePageOption('Transactions')

    if (currentPath === '/transactions/create' || currentPath === '/transactions/create/')
      changePageOption('Create')
  }, [currentPath])



  let loadData = async () => {
    // Call getAll API to get data
    let {data, paging} = await getAll('transactions', {...params, page: currentPage, limit: 5})

    setTransactions(data)
    setPagingConfigs(prev => {return {...prev, totalItem: paging.total}})
  }
  let redirectHome = () => {
    dispatch(changeGlobalTab('Home'))
    history.push("/home")
  }
  let changePageOption = (optionName) => {
    setOptionList(optionList.map(i => {
      return gPageOption(i.path, i.name, i.size, i.name === optionName)
    }))
  }


  let filterHandler = async (params) => {
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
        <Switch>
          {
             <Route path={`${path}`} exact>
                <div className={'transaction-and-filter'}>
                  <div className="filter-area">
                    <TransactionFilter configs={params} clickHandler={{filterHandler}}/>
                  </div>

                  <TransactionList
                    configs={{transactions, pageConfigs}}
                    clickHandler={{next, back, changeDirectPage}}
                  />
                </div>
             </Route>
          }

          {
            <Route path={`${path}/create`}>
              <TransactionForm
                configs={{transaction: {}, mode: 'create'}}
                clickHandler={{cancel: changePageOption}}
              />
            </Route>
          }
        </Switch>
      </div>
    </div>
  );
}

export default Transaction;
