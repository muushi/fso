import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic type="good" value={props.good} />
        <Statistic type="neutral" value={props.neutral} />
        <Statistic type="bad" value={props.bad} />
        <Statistic type="all" value={props.all} />
        <Statistic type="average" value={props.avg} />
        <Statistic type="positive" value={`${props.pos} %`} />
      </tbody>
    </table>
  )
}

const Statistic = (props) => (
<tr>
  <td>{props.type}</td>
  <td>{props.value}</td>
</tr>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good+1)
  const addNeutral = () => setNeutral(neutral+1)
  const addBad = () => setBad(bad+1)

  const all = good + neutral + bad
  // avg = ( (1*good)+(0*neutral)+(-1*bad) / (good+neutral+bad) )
  const avg = (good - bad) / (good + neutral + bad)
  const pos = 100 * (good / (good + neutral + bad))

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => addGood()} text="good" />
      <Button handleClick={() => addNeutral()} text="neutral" />
      <Button handleClick={() => addBad()} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} pos={pos}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)