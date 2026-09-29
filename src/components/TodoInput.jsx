import React, { useState } from 'react';
import { Plus, Calendar, Flag, Tag, X } from 'lucide-react';
import { PRESET_CATEGORIES, PRIORITY_CONFIG } from '../utils/constants';

export default function TodoInput({ onAddTodo }) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('none');
  const [category, setCategory] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onAddTodo({
      text: trimmed,
      priority: priority !== 'none' ? priority : null,
      category: category.trim() || null,
      dueDate: dueDate || null,
    });

    // Reset form
    setText('');
    setPriority('none');
    setCategory('');
    setDueDate('');
    setShowOptions(false);
  };

  const hasExtraFields = priority !== 'none' || category || dueDate;

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm focus-within:border-zinc-400 dark:focus-within:border-zinc-600 focus-within:ring-2 focus-within:ring-zinc-400/20 dark:focus-within:ring-zinc-600/20 transition-all overflow-hidden">
        {/* Main Input Row */}
        <div className="flex items-center px-4 py-3">
          <input
            type="text"
            value={text}
            onFocus={() => setShowOptions(true)}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full bg-transparent text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none"
          />

          <div className="flex items-center space-x-1.5 ml-2 flex-shrink-0">
            <button
              type="button"
              onClick={() => setShowOptions(!showOptions)}
              title="Add task details (due date, priority, tag)"
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                hasExtraFields || showOptions
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200'
                  : 'text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
            </button>

            <button
              type="submit"
              disabled={!text.trim()}
              aria-label="Add todo"
              className="px-3.5 py-1.5 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center justify-center text-xs font-medium space-x-1 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>Add</span>
            </button>
          </div>
        </div>

        {/* Expandable Options Row */}
        {(showOptions || hasExtraFields) && (
          <div className="px-4 pb-3 pt-1 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-2 text-xs">
            {/* Priority Selector */}
            <div className="flex items-center space-x-1 bg-zinc-50 dark:bg-zinc-800/60 p-1 rounded-lg border border-zinc-200/60 dark:border-zinc-700/60">
              <Flag className="w-3 h-3 text-zinc-400 ml-1" />
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="bg-transparent text-xs text-zinc-700 dark:text-zinc-300 outline-none pr-1 cursor-pointer"
              >
                <option value="none" className="dark:bg-zinc-800">Priority</option>
                <option value="low" className="dark:bg-zinc-800">Low</option>
                <option value="medium" className="dark:bg-zinc-800">Medium</option>
                <option value="high" className="dark:bg-zinc-800">High</option>
              </select>
            </div>

            {/* Category / Tag Selector */}
            <div className="flex items-center space-x-1 bg-zinc-50 dark:bg-zinc-800/60 p-1 rounded-lg border border-zinc-200/60 dark:border-zinc-700/60">
              <Tag className="w-3 h-3 text-zinc-400 ml-1" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent text-xs text-zinc-700 dark:text-zinc-300 outline-none pr-1 cursor-pointer"
              >
                <option value="" className="dark:bg-zinc-800">Tag</option>
                {PRESET_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="dark:bg-zinc-800">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Due Date Input */}
            <div className="flex items-center space-x-1 bg-zinc-50 dark:bg-zinc-800/60 p-1 rounded-lg border border-zinc-200/60 dark:border-zinc-700/60">
              <Calendar className="w-3 h-3 text-zinc-400 ml-1" />
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-transparent text-xs text-zinc-700 dark:text-zinc-300 outline-none cursor-pointer"
              />
              {dueDate && (
                <button
                  type="button"
                  onClick={() => setDueDate('')}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
