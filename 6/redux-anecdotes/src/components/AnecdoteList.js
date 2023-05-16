import { voteAnecdote } from '../reducers/anecdoteReducer'
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
  const anecdoteSs = useSelector(state => state.anecdotes)
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
  })

  return(
    <div>
      {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote => 
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => dispatch(voteAnecdote(anecdote.id))}
        />
      )}
    </div>
  )
}

export default AnecdoteList