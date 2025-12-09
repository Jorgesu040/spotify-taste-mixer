import { useState } from 'react'

export function useFilter() {
  const [popularityRange, setPopularityRange] = useState([20, 80])

  const statesArray = [popularityRange]
  const settersArray = [setPopularityRange]

  return [statesArray, settersArray]
}

export default useFilter
