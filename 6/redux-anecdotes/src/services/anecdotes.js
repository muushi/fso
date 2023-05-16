import axios from 'axios'
import {getId} from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const resp = await axios.get(baseUrl)
  return resp.data
}

const saveAnecdote = async (content) => {
  const obj = { content, id: getId(), votes: 0}
  const resp = await axios.post(baseUrl, obj)
  return resp.data
}

export default { getAll, saveAnecdote }