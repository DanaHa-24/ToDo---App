import React from 'react'

export default function TodoInput({ newTodoInput, handleAddTodo }) {
  return (
    <div>
        <input className="todo-input" ref={newTodoInput} type="text" placeholder="Create a new todo..." />
        <button className="todo-submit" onClick={handleAddTodo}>+</button>
    </div>
  )
}
