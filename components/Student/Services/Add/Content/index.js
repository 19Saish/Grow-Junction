import React from 'react'
import OneOnOne from './OneOnOne'
import TextQuery from './TextQuery'
import Workshop from './Workshop';
import Courses from './Courses';
import Packages from './Packages'

const Content = ({ currentService, setValues, state }) => {
  if (currentService === '1 on 1 Session') {
    return <OneOnOne setValues={setValues} state={state.oneOnOne} />
  }
  if (currentService === 'Text query') {
    return <TextQuery setValues={setValues} state={state.textQuery} />
  }
  if (currentService === 'Workshop') {
    return <Workshop setWorkshopValues={setValues} state={state.workshop} />
  }
  if (currentService === 'Courses') {
    return <Courses setValues={setValues} state={state.courses} />
  }
  if (currentService === 'Packages') {
    return <Packages setValues={setValues} state={state.packages} />
  }
  return <div>Content</div>
}

export default Content
