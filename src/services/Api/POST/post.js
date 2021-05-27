import axios from 'axios'
import checkSession from '../../Session/checkSession'

async function Post (endPoint, payload, isLogin = false) {
  try {
    if (checkSession() && !isLogin) return

    let {data} = await axios({
      method: 'POST',
      url: `${process.env.SERVER_URL}/${endPoint}`,
      headers: {
        'Authorization': isLogin ? null :localStorage.getItem('token')
      },
      data: payload,
    })

    return data
  } catch (err) {
    console.log(err)
  }
}

export default Post
