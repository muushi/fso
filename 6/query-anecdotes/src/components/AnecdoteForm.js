import { useMutation, useQueryClient } from "react-query"
import { addAnecdote } from "../requests"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const getId = () => (100000 * Math.random()).toFixed(0)
  const newAnecdoteMutation = useMutation(addAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, id: getId(), votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
