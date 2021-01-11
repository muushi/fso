import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course.name}</h1>
  )
}

const Part = (props) => {
return <p>{props.part.name} {props.part.exercises}</p>
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.content.parts[0]} />
      <Part part={props.content.parts[1]} />
      <Part part={props.content.parts[2]} />
    </div>
  )
}

const Total = (props) => {
  const sum = props.content.parts.reduce((acc, cur) => {
    return acc + cur.exercises
  }, 0)
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content content={course} />
      <Total content={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))