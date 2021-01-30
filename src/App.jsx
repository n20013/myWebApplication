import React from 'react'
import './App.css'

const TitleView = props => <h1>{props.children}</h1>
const LoadingView = props => <h1>{props.text}</h1>
const InitialView = props => props.state.loading
  ? <LoadingView text='Now Loading...' />
  : <MainView value={props.state.value} onChange={props.onChange} />

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      value: null
    }
    this.handleUpdate = this.handleUpdate.bind(this)
  }

  componentDidMount () {
    this.setState({ value: "Let's enter your words!", loading: false })
  }

  render () {
    console.log(this.state)
    return <InitialView state={this.state} onChange={this.handleUpdate} />
  }

  handleUpdate (event) {
    const value = event.target.value
    this.setState({ value: value })
  }
}

const MainView = props => {
  console.log('mainview', props)
  return (
    <>
      <TitleView>-TYPEWRITER-</TitleView>
      <TestForm onChange={props.onChange} />
      <TestView value={props.value} />
    </>
  )
}

const TestForm = props => {
  return <input type='text' onChange={props.onChange} />
}

const TestView = props => {
  return <div>{props.value}</div>
}

export default App
