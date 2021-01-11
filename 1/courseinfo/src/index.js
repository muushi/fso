import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
    {props.content.map(part => {
      return <p>{part.part} {part.exercises}</p>
    })}
    </>
  )
}

const Total = (props) => {
  const sum = props.content.reduce((acc, cur) => {
    return acc + cur.exercises
  }, 0)
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14
  const parts = [{"part": part1, "exercises": exercises1},{"part": part2, "exercises": exercises2},{"part": part3, "exercises": exercises3}]

  return (
    <div>
      <Header course={course} />
      <Content content={parts} />
      <Total content={parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))