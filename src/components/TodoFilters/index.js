import './style.css'
export default function TodoFilters({ countRemaining, setFilter, handleClear, allFilterActive, activeFilterActive, completedFilterActive }) {

    function handleFilterAll() {
      setFilter('all');
    }

    function handleFilterActive() {
      setFilter('active');
    }

    function handleFilterComplete() {
      setFilter('completed');
    }
    
  return (
    <div className="todo-filters">
        <button className="remaining">{countRemaining()}</button>
        <button className={allFilterActive ? "filter active-filter" : "filter"} onClick={handleFilterAll}>All</button>
        <button className={activeFilterActive ? "filter active-filter" : "filter"} onClick={handleFilterActive}>Active</button>
        <button className={completedFilterActive ? "filter active-filter" : "filter"} onClick={handleFilterComplete}>Completed</button>
        <button className="clear" onClick={handleClear}>Clear Completed</button>
    </div>
  )
}
