// import { useState, useEffect } from 'react'
// import axios from 'axios'
// const Fib = () => {
//   const [isState, setIsState] = useState({
//     seenIndexes: [],
//     values: {},
//     index: '',
//   })

//   const fetchValue = async () => {
//     const { data } = await axios.get('/api/value/current')

//     setIsState({ values: data })
//   }

//   const fetchIndexes = async () => {
//     const { data } = await axios.get('/api/value/all')
//     setIsState({ seenIndexes: data })
//   }

//   useEffect(() => {
//     fetchValue()
//     fetchIndexes()
//   }, [])

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     await axios.post('/api/value', {
//       index: isState.index,
//     })
//     setIsState({ index: '' })
//   }

//   const renderValue = () => {
//     let entries = []

//     for (let key in isState.values) {
//       entries.push(
//         <div key={key}>
//           For index {key} I calculated {isState.values[key]}
//         </div>
//       )
//     }
//     console.log({ entries, a: isState.values })
//     return entries
//   }

//   const renderSeenIndexes = () => {
//     // const int = isState.seenIndexes.map((item) => {
//     //   const { number } = item
//     //   return <p>{number}</p>
//     // })
//     // return int
//   }

//   console.log(isState)

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor='input-label'>Enter your index</label>
//         <input
//           id='input-label'
//           value={isState.index}
//           onChange={(e) => setIsState({ index: e.target.value })}
//         />
//         <button type='submit'> Submit</button>
//       </form>
//       <h3>Indexes I have seen </h3>
//       {renderSeenIndexes()}
//       <h3>Calculated Value: </h3>
//       {renderValue()}
//     </>
//   )
// }

// export default Fib

import React, { Component } from 'react'
import axios from 'axios'

class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
  }

  componentDidMount() {
    this.fetchValues()
    this.fetchIndexes()
  }

  async fetchValues() {
    const values = await axios.get('/api/value/current')
    this.setState({ values: values.data })
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/value/all')
    this.setState({
      seenIndexes: seenIndexes.data,
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    await axios.post('/api/value', {
      index: this.state.index,
    })
    this.setState({ index: '' })
  }

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number).join(', ')
  }

  renderValues() {
    const entries = []

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      )
    }

    return entries
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={(event) => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen:</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    )
  }
}

export default Fib
