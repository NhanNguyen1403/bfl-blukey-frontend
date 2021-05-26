import axios from 'axios'
import checkSession from '../../Session/checkSession'

async function Delete (endPoint, id, payload) {
  try {
    if (checkSession()) return

    let {data} = await axios({
      method: 'DELETE',
      url: `${process.env.SERVER_URL}/${endPoint}/${id}`,
      headers: {
        'Authorization': localStorage.getItem('token')
      },
      data: payload,
    })

    return data
  } catch (err) {
    console.log(err)
  }
}

export default Delete