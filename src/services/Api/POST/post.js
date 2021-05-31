import axios from 'axios'
import checkSession from '../../Session/checkSession'
import store from "../../../redux/store";
import {showSnack} from "../../../redux";
import {showLoader, hideLoader} from "../../../redux";

async function Post (endPoint = '', payload = {}, isLogin = false) {
  try {
    if (!checkSession() && !isLogin) return

    store.dispatch(showLoader())
    let {data} = await axios({
      method: 'POST',
      url: `${process.env.SERVER_URL}${endPoint}`,
      headers: {
        'Authorization': isLogin ? null : `Bearer ${localStorage.getItem('token')}`
      },
      data: payload,
    })

    store.dispatch(hideLoader())

    if (!isLogin)
      store.dispatch(showSnack("Success", 'success'))


    return data
  } catch (err) {
    store.dispatch(hideLoader())
    console.log(err)
    store.dispatch(showSnack(err?.response?.data?.message || 'Error','danger'))
  }
}

export default Post
