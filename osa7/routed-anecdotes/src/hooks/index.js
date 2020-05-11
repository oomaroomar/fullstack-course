import { useState } from 'react'

const useField = (initVar) => {
  const [value, setValue] = useState(initVar)

  const onChange = (newValue) => {
    setValue(newValue)
  }

  const reset = () => {
    setValue('')
  }

  return {
    value,
    onChange,
    reset
  }
}

export { useField }