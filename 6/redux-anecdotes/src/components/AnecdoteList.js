import { useSelector, useDispatch } from 'react-redux'

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
    dispatch({ type: 'anecdotes/voteAnecdote', payload: anecdote.id})
    dispatch({ type: 'notification/addNotificationVote', payload: anecdote.content })
    setTimeout(() =>  {dispatch({ type: 'notification/removeNotification'})}, 5000)

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