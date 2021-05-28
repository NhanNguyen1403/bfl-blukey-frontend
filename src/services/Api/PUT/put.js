import axios from 'axios'
import checkSession from '../../Session/checkSession'
import store from "../../../redux/store";
import {showSnack} from "../../../redux";

async function Put (endPoint = '', id = '', payload = {}) {
  try {
    if (!checkSession()) return

    let {data} = await axios({
      method: 'PUT',
      url: `${process.env.SERVER_URL}/${endPoint}/${id}`,
      headers: {
        'Authorization': localStorage.getItem('token')
      },
      data: payload,
    })

    return data
  } catch (err) {
    console.log(err)
    store.dispatch(showSnack('Error','danger'))
  }
}

export default Put
