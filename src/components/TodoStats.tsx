import React from 'react'
import { CheckCircle, Circle, Trash2, BarChart3 } from 'lucide-react'
import { Todo } from '../types/todo'

interface TodoStatsProps {
  todos: Todo[]
  onClearCompleted: () => void
}

export const TodoStats: React.FC<TodoStatsProps> = ({ todos, onClearCompleted }) => {
  const totalTodos = todos.length
  const completedTodos = todos.filter(todo => todo.completed).length
  const pendingTodos = totalTodos - completedTodos
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0

  const priorityStats = {
    high: todos.filter(todo => !todo.completed && todo.priority === 'high').length,
    medium: todos.filter(todo => !todo.completed && todo.priority === 'medium').length,
    low: todos.filter(todo => !todo.completed && todo.priority === 'low').length
  }

  return (
    <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl border-2 border-amber-100 p-6 shadow-lg shadow-amber-100/50">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 size={20} className="text-amber-600" />
        <h3 className="text-lg font-semibold text-amber-900">Your Progress</h3>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="text-center p-4 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl border border-orange-200 shadow-sm">
          <div className="text-2xl font-bold text-orange-700 mb-1">{totalTodos}</div>
          <div className="text-sm text-orange-600 font-medium">Total</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl border border-emerald-200 shadow-sm">
          <div className="text-2xl font-bold text-emerald-700 mb-1">{completedTodos}</div>
          <div className="text-sm text-emerald-600 font-medium">Completed</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-xl border border-amber-200 shadow-sm">
          <div className="text-2xl font-bold text-amber-700 mb-1">{pendingTodos}</div>
          <div className="text-sm text-amber-600 font-medium">Pending</div>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl border border-purple-200 shadow-sm">
          <div className="text-2xl font-bold text-purple-700 mb-1">{completionRate}%</div>
          <div className="text-sm text-purple-600 font-medium">Complete</div>
        </div>
      </div>

      {/* Priority breakdown */}
      {pendingTodos > 0 && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-amber-800 mb-3">Pending by Priority</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-red-500 to-pink-500 rounded-full shadow-sm"></div>
                <span className="text-amber-700">High Priority</span>
              </div>
              <span className="font-medium text-amber-800">{priorityStats.high}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-full shadow-sm"></div>
                <span className="text-amber-700">Medium Priority</span>
              </div>
              <span className="font-medium text-amber-800">{priorityStats.medium}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gradient-to-br from-emerald-500 to-green-500 rounded-full shadow-sm"></div>
                <span className="text-amber-700">Low Priority</span>
              </div>
              <span className="font-medium text-amber-800">{priorityStats.low}</span>
            </div>
          </div>
        </div>
      )}

      {/* Progress bar */}
      {totalTodos > 0 && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-amber-700 mb-2">
            <span className="font-medium">Overall Progress</span>
            <span className="font-bold">{completionRate}%</span>
          </div>
          <div className="w-full bg-amber-200 rounded-full h-3 shadow-inner">
            <div 
              className="bg-gradient-to-r from-emerald-500 via-green-500 to-amber-500 h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Actions */}
      {completedTodos > 0 && (
        <div className="flex justify-center">
          <button
            onClick={onClearCompleted}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-pink-100 text-red-700 rounded-lg hover:from-red-200 hover:to-pink-200 transition-all duration-200 text-sm font-medium border border-red-200 shadow-sm"
          >
            <Trash2 size={14} />
            Clear Completed ({completedTodos})
          </button>
        </div>
      )}
    </div>
  )
}
