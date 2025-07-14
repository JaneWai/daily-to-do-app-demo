import React, { useState } from 'react'
import { Plus, Flag, Tag } from 'lucide-react'
import { Todo } from '../types/todo'

interface AddTodoFormProps {
  onAdd: (text: string, priority: Todo['priority'], category?: string) => void
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAdd }) => {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Todo['priority']>('medium')
  const [category, setCategory] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text.trim(), priority, category.trim() || undefined)
      setText('')
      setCategory('')
      setPriority('medium')
      setShowOptions(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What would you like to accomplish today?"
            className="w-full px-4 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 text-lg bg-white/80 backdrop-blur-sm placeholder-amber-600"
          />
        </div>
        <button
          type="button"
          onClick={() => setShowOptions(!showOptions)}
          className={`px-4 py-3 rounded-xl border-2 transition-all duration-200 shadow-md ${
            showOptions 
              ? 'bg-gradient-to-br from-amber-500 to-orange-500 text-white border-amber-500 shadow-lg' 
              : 'border-amber-200 text-amber-600 hover:border-amber-300 hover:text-amber-700 bg-white/80'
          }`}
          title="Options"
        >
          <Tag size={20} />
        </button>
        <button
          type="submit"
          disabled={!text.trim()}
          className="px-6 py-3 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium shadow-lg hover:shadow-xl"
        >
          <Plus size={20} />
          Add
        </button>
      </div>

      {showOptions && (
        <div className="flex gap-4 p-4 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-100 shadow-inner">
          <div className="flex-1">
            <label className="block text-sm font-medium text-amber-800 mb-2">
              Priority
            </label>
            <div className="flex gap-2">
              {(['low', 'medium', 'high'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg border transition-all duration-200 shadow-sm ${
                    priority === p
                      ? p === 'high' 
                        ? 'bg-gradient-to-br from-red-500 to-pink-500 text-white border-red-500 shadow-lg'
                        : p === 'medium'
                        ? 'bg-gradient-to-br from-amber-500 to-yellow-500 text-white border-amber-500 shadow-lg'
                        : 'bg-gradient-to-br from-emerald-500 to-green-500 text-white border-emerald-500 shadow-lg'
                      : 'bg-white/80 border-amber-200 text-amber-700 hover:border-amber-300 hover:bg-amber-50'
                  }`}
                >
                  <Flag size={14} />
                  {p}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-amber-800 mb-2">
              Category (optional)
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Work, Personal, Home"
              className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white/80 placeholder-amber-500"
            />
          </div>
        </div>
      )}
    </form>
  )
}
