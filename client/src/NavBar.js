import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
      <Link to='/'>Home</Link>
      <Link to='/otherpage'>Other Page</Link>
    </>
  )
}

export default NavBar
