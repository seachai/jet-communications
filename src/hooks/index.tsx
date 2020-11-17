import {useState} from 'react';

export const useInput = (initialValue = '') => {
  const [input, setInput] = useState(initialValue)
  const handleChange = event => setInput(event.target.value)
  return [input, setInput, handleChange]
}