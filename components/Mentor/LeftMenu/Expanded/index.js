import React from 'react'
import Author from './Author'
import Navigation from './Navigation'
import Title from './Title'

const Expanded = ({ onCollapse }) => {
  return (
    <main>
      <Title onCollapse={onCollapse} />
      <Author />
      <Navigation />
    </main>
  )
}

export default Expanded
