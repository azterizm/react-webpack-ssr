import { useState } from "react"
import MetaTags from "../utils/MetaTags"

export const Counter = () => {
  const [count, setCount] = useState<number>(0)
  const [recurse, setRecurse] = useState<boolean>(false)

  const handleAdd = () => setCount(e => e + 1)

  let recurseInterval: NodeJS.Timer
  const handleRecurseStart = () => {
    console.log('DOWN')
    setTimeout(() => {
      if (recurse) return
      setRecurse(true)
      return recurseInterval = setInterval(() => setCount(e => e + 1), 500)
    }, 800);
  }

  const handleRecurseStop = () => {
    if (!recurse) return
    setRecurse(false)
    clearInterval(recurseInterval)
  }

  return (
    <div className="counter">
      <MetaTags title='Counter' description='counter' img='counter.png' />
      <h1>{count}</h1>
      <button onClick={handleAdd} onMouseDown={handleRecurseStart} onMouseUp={handleRecurseStop}>Add</button>
    </div>
  )
}
