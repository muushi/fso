import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    voteAnecdote(state, action) {
      const votedAnecdote = {
        ...action.payload,
        votes: action.payload.votes + 1
      }
      return state.map(a => a.id !== action.payload.id ? a : votedAnecdote)
    },
  }
})


export const {anecdoteReducer, setAnecdotes, appendAnecdote, voteAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.saveAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    await anecdoteService.updateAnecdote(votedAnecdote)
    dispatch(voteAnecdote(anecdote))
  }
}

export default anecdoteSlice.reducer