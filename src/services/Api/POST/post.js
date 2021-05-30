import axios from 'axios'
import checkSession from '../../Session/checkSession'
import store from "../../../redux/store";
import {showSnack} from "../../../redux";

async function Post (endPoint = '', payload = {}, isLogin = false) {
  try {
    if (!checkSession() && !isLogin) return

    let {data} = await axios({
      method: 'POST',
      url: `${process.env.SERVER_URL}${endPoint}`,
      headers: {
        'Authorization': isLogin ? null : `Bearer ${localStorage.getItem('token')}`
      },
      data: payload,
    })

    if (!isLogin)
      store.dispatch(showSnack("Success", 'success'))

    return data
  } catch (err) {
    console.log(err)
    store.dispatch(showSnack(err?.response?.data?.message || 'Error','danger'))
  }
}

export default Post
