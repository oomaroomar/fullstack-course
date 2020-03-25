import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { filterChangeAction } from '../actions/filterAction'

const Filter = () => {
  const filterString = useSelector(state => state.filter)
  const dispatch = useDispatch()


  const handleChange = e => {
    // input-kentän arvo muuttujassa event.target.value
    e.preventDefault()
    dispatch(filterChangeAction(e.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input value={filterString} onChange={handleChange} />
    </div>
  )
}

export default Filter