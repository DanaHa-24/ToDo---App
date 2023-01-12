import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import TodoFilters from './components/TodoFilters';
import TodoInput from './components/TodoInput.js';
import TodoList from './components/TodoList.js';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [allFilterActive, setAllFilterActive] = useState(true);
  const [activeFilterActive, setActiveFilterActive] = useState(false);
  const [completedFilterActive, setCompletedFilterActive] = useState(false);

  const newTodoInput = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTodos) {
      setTodos(storedTodos);
      setFilter('all');
      setFilteredTodos(storedTodos);
    }
  }, [])

  useEffect(() => {
    if(todos.length !== 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }
  }, [todos])

  // Add todo
  function handleAddTodo() {
    const todoName = newTodoInput.current.value;
    if (todoName === "") {
      return;
    }
    setTodos([...todos, { id: uuidv4(), todoName: todoName, complete: false }]);
    newTodoInput.current.value = null;
  }

  // Mark / Unmark todo
  function toggleTodo(id) {
    const newTodos = [...todos];
    const selectedTask = todos.find(todo => todo.id === id);
    selectedTask.complete = !selectedTask.complete;
    setTodos(newTodos)
  }

  // Clear all completed todos
  function handleClear() {
    const remainingTodos = todos.filter(todo => !todo.complete);
    setTodos(remainingTodos);
  }

  // Remove todo after clicking X
  function deleteTodo(id) {
    const remainingTodos = todos.filter(todo => todo.id !== id);
    setTodos(remainingTodos);
  }

  // Count uncomlpeted todos
  function countRemaining() {
    const count = todos.filter(todo => !todo.complete);

    if (count.length === 1) {
      return `1 item left`;
    } else {
      return `${count.length} items left`;
    }
  }

  // CHANGE LIST DISPLAYED BASED ON FILTER
  useEffect(() => {
    filterList();
  }, [todos, filter])

  function filterList() {
    if (filter === 'all') {
      setFilteredTodos(todos);  
      setAllFilterActive(true);
      setActiveFilterActive(false);
      setCompletedFilterActive(false);
    } else if (filter === 'active') {
      const activeTodos = todos.filter(todo => !todo.complete);
      setFilteredTodos(activeTodos);
      setActiveFilterActive(true);
      setAllFilterActive(false);
      setCompletedFilterActive(false);
    } else if (filter === 'completed') {
      const completedTodos = todos.filter(todo => todo.complete);
      setFilteredTodos(completedTodos);
      setCompletedFilterActive(true);
      setAllFilterActive(false);
      setActiveFilterActive(false);
    }
  }


  return (
      <div>

      <TodoInput newTodoInput={newTodoInput} handleAddTodo={handleAddTodo} />

      <TodoList todos={filteredTodos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />

      <TodoFilters
        countRemaining={countRemaining} 
        setFilter={setFilter}
        handleClear={handleClear}
        allFilterActive={allFilterActive}
        activeFilterActive={activeFilterActive}
        completedFilterActive={completedFilterActive}
      />

    </div>
  );
}

export default App;
