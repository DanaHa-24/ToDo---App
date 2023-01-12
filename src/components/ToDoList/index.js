import './style.css'
import React from 'react';
import Todo from '../ToDo';


export default function TodoList({ todos, toggleTodo, deleteTodo, classNames }) {

  return (
      <div>
        {todos.map(todo => {
            return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} classNames={classNames} />
        })}
      </div>
        
  )
}
