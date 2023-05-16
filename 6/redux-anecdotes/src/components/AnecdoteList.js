import { useSelector, useDispatch } from 'react-redux'
import { updateAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <div>
      {anecdote.content}
      <br />
      has {anecdote.votes}
      <button onClick={handleClick}>vote</button>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })

  const vote = (anecdote) => {
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`you voted ${anecdote.content}`, 5))

  }

  return(
    <div>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote => 
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => vote(anecdote)}
        />
      )}
    </div>
  )
}

export default AnecdoteList