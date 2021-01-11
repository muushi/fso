import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Anecdote = (props) => (
  <>
    {props.anecdotes[props.id]}
    <br />
    has {props.votes[props.id]} votes
  </>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint16Array(anecdotes.length))
  const [highest, setHighest] = useState(0)

  const randomizeAnecdote = () => {
    const newAnecdote = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(newAnecdote)
  }

  const castVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    if (copy[selected] === Math.max.apply(Math, copy)) {
      setHighest(selected)
    }
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={props.anecdotes} votes={votes} id={selected} />
      <br />
      <Button handleClick={() => castVote()} text="vote" />
      <Button handleClick={() => randomizeAnecdote()} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdotes={props.anecdotes} votes={votes} id={highest} />

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)