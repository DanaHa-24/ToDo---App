import './style.css'
import React from 'react'

export default function TodoInput({ newTodoInput, handleAddTodo }) {
  return (
    <div class="todo-container">
        <input className="todo-input" ref={newTodoInput} type="text" placeholder="Create a new todo..." />
        <button className="todo-submit" onClick={handleAddTodo}>+</button>
    </div>
  )
}
