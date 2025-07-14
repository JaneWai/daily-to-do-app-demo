import React, { useState, useMemo } from 'react'
import { CheckSquare, Sparkles } from 'lucide-react'
import { useTodos } from './hooks/useTodos'
import { AddTodoForm } from './components/AddTodoForm'
import { TodoItem } from './components/TodoItem'
import { TodoStats } from './components/TodoStats'
import { TodoFilters } from './components/TodoFilters'
import { Todo } from './types/todo'

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo, updateTodo, clearCompleted } = useTodos()
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [sortBy, setSortBy] = useState<'created' | 'priority' | 'alphabetical'>('created')

  // Filter and sort todos
  const filteredAndSortedTodos = useMemo(() => {
    let filtered = todos

    // Apply filter
    switch (filter) {
      case 'active':
        filtered = todos.filter(todo => !todo.completed)
        break
      case 'completed':
        filtered = todos.filter(todo => todo.completed)
        break
      default:
        filtered = todos
    }

    // Apply sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 }
          return priorityOrder[b.priority] - priorityOrder[a.priority]
        case 'alphabetical':
          return a.text.localeCompare(b.text)
        default: // 'created'
          return b.createdAt.getTime() - a.createdAt.getTime()
      }
    })

    return sorted
  }, [todos, filter, sortBy])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-100/90 to-orange-100/90 backdrop-blur-sm border-b border-amber-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg">
              <CheckSquare size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-amber-900">My Cozy Tasks</h1>
              <p className="text-amber-700">Stay organized in comfort</p>
            </div>
            <div className="ml-auto flex items-center gap-2 text-sm text-amber-600">
              <Sparkles size={16} />
              <span>Built with ChatAndBuild</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add todo form */}
            <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl border-2 border-amber-100 p-6 shadow-lg shadow-amber-100/50">
              <AddTodoForm onAdd={addTodo} />
            </div>

            {/* Todo list */}
            <div className="space-y-4">
              {filteredAndSortedTodos.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckSquare size={24} className="text-amber-600" />
                  </div>
                  <h3 className="text-lg font-medium text-amber-900 mb-2">
                    {filter === 'completed' 
                      ? 'No completed tasks yet' 
                      : filter === 'active' 
                      ? 'No active tasks' 
                      : 'No tasks yet'}
                  </h3>
                  <p className="text-amber-700">
                    {filter === 'all' 
                      ? 'Add your first task to get started!' 
                      : `Switch to "All" to see your tasks`}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredAndSortedTodos.map(todo => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onDelete={deleteTodo}
                      onUpdate={updateTodo}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <TodoStats todos={todos} onClearCompleted={clearCompleted} />
            <TodoFilters
              filter={filter}
              onFilterChange={setFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
