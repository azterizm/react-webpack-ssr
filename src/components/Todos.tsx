import { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import '../styles/Todos.css'

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: false
}

export const Todos: FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null)

  const name = useSelector((state: { name: string }) => state.name)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(data => setTodos(data))
  }, [])

  if (!todos) return (
    <div className="todos">
      <h1>Loading...</h1>
    </div>
  )

  return (
    <>
      {name && <h1>Redux Value: {name}</h1>}
      <div className="todos">
        {todos?.map(({ id, title, completed }) => (
          <div id="todo" key={id}>
            <h1>{title}</h1>
            <p>{completed ? 'Done' : 'Not Done'}</p>
          </div>
        ))}
      </div>
    </>
  )
}
