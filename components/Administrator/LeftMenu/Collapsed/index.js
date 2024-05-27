import React from 'react'
import Title from '../Collapsed/Title'
import Author from './Author'
import Navigation from './Navigation'

const Collapsed = ({ onExpanded }) => {
  const dummy = () => {}
  return (
    <main className="flex flex-col items-center ">
      <Title onExpanded={onExpanded ? onExpanded : dummy} />
      <Author />
      <Navigation />
    </main>
  )
}

export default Collapsed
