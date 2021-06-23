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
  let [transactions, setTransactions] = useState([])
  let [pageConfigs, setPagingConfigs] = useState({current: currentPage, totalItem: 1})


  useEffect(async () => {
    // await loadData()
    setTransactions([
        {
          transaction_id: '12345561',
          agentName: 'Nhan Nguyen',
          mls_id: '1234asdcf',
          address: '123 vo van kiet',
          city: 'Ho Chi Minh',
          state: 'district 88888888',
          zip_code: '700000',
          transaction_required_count: 4,
          seller: 'Seller name',
          buyer: 'Buyer name',
          price: '123',
          commission_rate: 2,
          start_date: '21-05-2021',
          end_date: '22-05-2021',
          status: 'new',
          comments: [
            {
              author_name: 'Nhan Nguyen',
              author_id: 3,
              created_date: '21-05-2021',
              message: 'Today, I finish this transaction today. Admin please review',
              is_deleted: true,
              comment_id: 1
            },
            {
              author_name: 'Nhan Nguyen',
              author_id: 3,
              created_date: '21-05-2021',
              message: 'Today, I finish this transaction today. Admin please review',
              is_deleted: false,
              comment_id: 2
            },
            {
              author_name: 'Nhan Nguyen',
              author_id: 3,
              created_date: '21-05-2021',
              message: 'Today, I finishToday, I finishToday, I finishToday, I finishToday, I finishToday, I finishToday, I finishToday, I finish ',
              is_deleted: false,
              comment_id: 3
            },
            {
              author_name: 'Admin',
              author_id: 2,
              created_date: '22-05-2021',
              message: 'Hey Agent, RPA Document is missing a signature from buyer. Please correct',
              is_deleted: false,
              comment_id: 4
            }
          ]
        },
        {
          transaction_id: '12345562',
          agentName: 'Nhan Nguyen',
          mls_id: '1234asdcf',
          address: '123 vo van kiet',
          city: 'Ho Chi Minh',
          state: 'district 8',
          zip_code: '700000',
          transaction_required_count: 4,
          seller: 'Seller name',
          buyer: 'Buyer name',
          price: '123',
          commission_rate: 2,
          start_date: '21-05-2021',
          end_date: '22-05-2021',
          status: 'in progress',
          comments: [
            {
              author_name: 'Nhan Nguyen',
              author_id: 3,
              created_date: '21-05-2021',
              message: 'Today, I finish this transaction today. Admin please review',
              is_deleted: true,
              comment_id: 5
            },
            {
              author_name: 'Nhan Nguyen',
              author_id: 3,
              created_date: '21-05-2021',
              message: 'Today, I finish this transaction today. Admin please review',
              is_deleted: false,
              comment_id: 6
            },
            {
              author_name: 'Admin',
              author_id: 2,
              created_date: '22-05-2021',
              message: 'Hey Agent, RPA Document is missing a signature from buyer. Please correct',
              is_deleted: false,
              comment_id: 7
            }
          ]
        },
        {
          transaction_id: '12345563',
          agentName: 'Nhan Nguyen',
          mls_id: '1234asdcf',
          address: '123 vo van kiet',
          city: 'Ho Chi Minh',
          state: 'district 8',
          zip_code: '700000',
          transaction_required_count: 4,
          seller: 'Seller name',
          buyer: 'Buyer name',
          price: '123',
          commission_rate: 2,
          start_date: '21-05-2021',
          end_date: '22-05-2021',
          status: 'review',
          comments: [
            {
              author_name: 'Nhan Nguyen',
              author_id: 3,
              created_date: '21-05-2021',
              message: 'Today, I finish this transaction today. Admin please review',
              is_deleted: true,
              comment_id: 8
            },
            {
              author_name: 'Nhan Nguyen',
              author_id: 3,
              created_date: '21-05-2021',
              message: 'Today, I finish this transaction today. Admin please review',
              is_deleted: false,
              comment_id: 9
            },
            {
              author_name: 'Admin',
              author_id: 2,
              created_date: '22-05-2021',
              message: 'Hey Agent, RPA Document is missing a signature from buyer. Please correct',
              is_deleted: false,
              comment_id: 10
            }
          ]
        },
        {
          transaction_id: '12345564',
          agentName: 'Nhan Nguyen',
          mls_id: '1234asdcf',
          address: '123 vo van kiet',
          city: 'Ho Chi Minh',
          state: 'district 8',
          zip_code: '700000',
          transaction_required_count: 4,
          seller: 'Seller name',
          buyer: 'Buyer name',
          price: '123',
          commission_rate: 2,
          start_date: '21-05-2021',
          end_date: '22-05-2021',
          status: 'complete',
          comments: [
            {
              author_name: 'Nhan Nguyen',
              author_id: 3,
              created_date: '21-05-2021',
              message: 'Today, I finish this transaction today. Admin please review',
              is_deleted: true,
              comment_id: 11
            },
            {
              author_name: 'Nhan Nguyen',
              author_id: 3,
              created_date: '21-05-2021',
              message: 'Today, I finish this transaction today. Admin please review',
              is_deleted: false,
              comment_id: 12
            },
            {
              author_name: 'Admin',
              author_id: 2,
              created_date: '22-05-2021',
              message: 'Hey Agent, RPA Document is missing a signature from buyer. Please correct',
              is_deleted: false,
              comment_id: 13
            }
          ]
        },
        {
          transaction_id: '12345565',
          agentName: 'Nhan Nguyen',
          mls_id: '1234asdcf',
          address: '123 vo van kiet',
          city: 'Ho Chi Minh',
          state: 'district 8',
          zip_code: '700000',
          transaction_required_count: 4,
          seller: 'Seller name',
          buyer: 'Buyer name',
          price: '123',
          commission_rate: 2,
          start_date: '21-05-2021',
          end_date: '22-05-2021',
          status: 'error',
          comments: [

          ]
        }
      ]
    )
  }, [currentPage])


  let loadData = async () => {
    // Call getAll API to get data
    let {data, paging} = await getAll('transactions', currentPage)

    setTransactions(data)
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
            configs={{transactions, pageConfigs}}
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
