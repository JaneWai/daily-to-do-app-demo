import React from 'react'
import { List, CheckCircle, Circle, Filter } from 'lucide-react'

interface TodoFiltersProps {
  filter: 'all' | 'active' | 'completed'
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void
  sortBy: 'created' | 'priority' | 'alphabetical'
  onSortChange: (sort: 'created' | 'priority' | 'alphabetical') => void
}

export const TodoFilters: React.FC<TodoFiltersProps> = ({
  filter,
  onFilterChange,
  sortBy,
  onSortChange
}) => {
  return (
    <div className="bg-gradient-to-br from-white to-amber-50 rounded-2xl border-2 border-amber-100 p-6 shadow-lg shadow-amber-100/50">
      <div className="flex items-center gap-2 mb-6">
        <Filter size={18} className="text-amber-600" />
        <h3 className="text-lg font-semibold text-amber-900">Filters & Sort</h3>
      </div>

      <div className="space-y-6">
        {/* Filter buttons */}
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-3">
            Show
          </label>
          <div className="grid grid-cols-1 gap-2">
            <button
              onClick={() => onFilterChange('all')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 shadow-sm w-full ${
                filter === 'all'
                  ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white border-orange-500 shadow-lg'
                  : 'bg-white/80 border-amber-200 text-amber-700 hover:border-amber-300 hover:bg-amber-50'
              }`}
            >
              <List size={16} />
              <span className="font-medium">All</span>
            </button>
            <button
              onClick={() => onFilterChange('active')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 shadow-sm w-full ${
                filter === 'active'
                  ? 'bg-gradient-to-br from-amber-500 to-yellow-500 text-white border-amber-500 shadow-lg'
                  : 'bg-white/80 border-amber-200 text-amber-700 hover:border-amber-300 hover:bg-amber-50'
              }`}
            >
              <Circle size={16} />
              <span className="font-medium">Active</span>
            </button>
            <button
              onClick={() => onFilterChange('completed')}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-all duration-200 shadow-sm w-full ${
                filter === 'completed'
                  ? 'bg-gradient-to-br from-emerald-500 to-green-500 text-white border-emerald-500 shadow-lg'
                  : 'bg-white/80 border-amber-200 text-amber-700 hover:border-amber-300 hover:bg-amber-50'
              }`}
            >
              <CheckCircle size={16} />
              <span className="font-medium">Completed</span>
            </button>
          </div>
        </div>

        {/* Sort options */}
        <div>
          <label className="block text-sm font-medium text-amber-800 mb-3">
            Sort by
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as any)}
            className="w-full px-4 py-3 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/80 text-amber-800 shadow-sm font-medium"
          >
            <option value="created">Date Created</option>
            <option value="priority">Priority</option>
            <option value="alphabetical">Alphabetical</option>
          </select>
        </div>
      </div>
    </div>
  )
}
