import React, { useState } from 'react'
import { Check, X, Edit3, Flag, Calendar } from 'lucide-react'
import { Todo } from '../types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Todo>) => void
}

const priorityColors = {
  low: 'text-emerald-600',
  medium: 'text-amber-600',
  high: 'text-red-600'
}

const priorityBgColors = {
  low: 'bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200',
  medium: 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200',
  high: 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200'
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(todo.id, { text: editText.trim() })
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditText(todo.text)
    setIsEditing(false)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className={`group p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg hover:shadow-amber-100/50 ${
      todo.completed 
        ? 'bg-gradient-to-br from-stone-50 to-gray-50 border-stone-200 opacity-75' 
        : `${priorityBgColors[todo.priority]} hover:scale-[1.02] shadow-md`
    }`}>
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
            todo.completed
              ? 'bg-gradient-to-br from-emerald-500 to-green-500 border-emerald-500 text-white shadow-lg'
              : 'border-amber-300 hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-md'
          }`}
        >
          {todo.completed && <Check size={14} />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave()
                  if (e.key === 'Escape') handleCancel()
                }}
                className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white rounded-md hover:from-emerald-600 hover:to-green-600 transition-all duration-200 text-sm shadow-md"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-3 py-1 bg-gradient-to-r from-stone-500 to-gray-500 text-white rounded-md hover:from-stone-600 hover:to-gray-600 transition-all duration-200 text-sm shadow-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-2">
                <p className={`text-amber-900 leading-relaxed font-medium ${
                  todo.completed ? 'line-through text-stone-500' : ''
                }`}>
                  {todo.text}
                </p>
                
                {/* Priority indicator */}
                <div className="flex items-center gap-1 flex-shrink-0">
                  <Flag size={14} className={priorityColors[todo.priority]} />
                  <span className={`text-xs font-medium ${priorityColors[todo.priority]}`}>
                    {todo.priority}
                  </span>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-4 text-xs text-amber-700">
                  <div className="flex items-center gap-1">
                    <Calendar size={12} />
                    {formatDate(todo.createdAt)}
                  </div>
                  {todo.category && (
                    <span className="px-2 py-1 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-full border border-orange-200">
                      {todo.category}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-amber-500 hover:text-orange-600 transition-colors"
                    title="Edit task"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="p-1 text-amber-500 hover:text-red-600 transition-colors"
                    title="Delete task"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
