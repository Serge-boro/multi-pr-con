import { useState, useEffect } from 'react'
import axios from 'axios'
const Fib = () => {
  const [isState, setIsState] = useState({
    values: {},
    index: '',
  })

  const [seenIndexes, setSeenIndexes] = useState([])
  const fetchValue = async () => {
    const { data } = await axios.get('/api/value/current')

    setIsState({ values: data })
  }

  const fetchIndexes = async () => {
    const { data } = await axios.get('/api/value/all')
    setSeenIndexes(data)
  }

  useEffect(() => {
    fetchValue()
    fetchIndexes()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    await axios.post('/api/value', {
      index: isState.index,
    })
    setIsState({ index: '' })
  }

  const renderValue = () => {
    let entries = []

    for (let key in isState.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {isState.values[key]}
        </div>
      )
    }
    console.log({ entries, a: isState.values })
    return entries
  }

  const renderSeenIndexes = () => {
    const int = seenIndexes.map((item) => {
      const { number } = item
      return <p>{number}</p>
    })
    return int
  }

  console.log(isState)

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='input-label'>Enter your index</label>
        <input
          id='input-label'
          value={isState.index}
          onChange={(e) => setIsState({ index: e.target.value })}
        />
        <button type='submit'> Submit</button>
      </form>
      <h3>Indexes I have seen </h3>
      {renderSeenIndexes()}
      <h3>Calculated Value: </h3>
      {renderValue()}
    </>
  )
}

export default Fib
