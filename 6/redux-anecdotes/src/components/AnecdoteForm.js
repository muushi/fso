import { useDispatch } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.saveAnecdote(content)
    dispatch({ type: 'anecdotes/newAnecdote', payload: newAnecdote})
    dispatch({ type: 'notification/addNotificationNew', payload: content })
    setTimeout(() =>  {dispatch({ type: 'notification/removeNotification'})}, 5000)
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm