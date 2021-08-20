/*******************************************************
 * Using this service to handle Session jobs
 * 1. Call Session Api
 * 2. Store credentials into localStorage
 * 3. Update isLogged as a global (redux)
 ********************************************************/

import store from "../../redux/store"
import {logIn, showSnack} from "../../redux";
import Post from "../Api/POST/post"

const Login = async function (userName, password) {
  try {
    // 1.Call Session Api
    let {data: loginResult} = await Post('login', {userName, password}, true)

    // 2. Store credentials into localStorage
    localStorage.setItem('token', loginResult.accessToken)
    localStorage.setItem('user', JSON.stringify(loginResult.user))

    // 3.Update isLogged as a global (redux)
    store.dispatch(logIn())
  } catch (err) {
    console.log(err)
  }
}

export default Login
