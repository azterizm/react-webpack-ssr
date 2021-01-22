import { FC, useEffect, useState } from "react";
import '../styles/Todos.css';
import MetaTags from "../utils/MetaTags";

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: false
}

export const Todos: FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null)

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
      <div className="todos">
        <MetaTags title='Todos' description='Todos' img='todos.png'/>
        {todos?.map(({ id, title, completed }) => (
          <div id="todo" key={id}>
            <h1>{title}</h1>
            <p>{completed ? 'Done' : 'Not Done'}</p>
          </div>
        ))}
      </div>
  )
}
