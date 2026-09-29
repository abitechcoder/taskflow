import React from 'react';
import { Tag } from 'lucide-react';

export default function TodoFilter({
  activeFilter,
  setActiveFilter,
  selectedCategory,
  setSelectedCategory,
  availableCategories,
  activeCount,
  completedCount,
  onClearCompleted,
}) {
  const statusFilters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <div className="mb-5 pb-4 border-b border-zinc-200 dark:border-zinc-800 space-y-3 text-xs">
      {/* Primary status row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Active counter */}
        <span className="text-zinc-500 dark:text-zinc-400 font-medium">
          <strong className="text-zinc-900 dark:text-zinc-100 font-semibold">{activeCount}</strong> {activeCount === 1 ? 'task' : 'tasks'} remaining
        </span>

        {/* Status Filter Pills */}
        <div className="flex items-center p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
          {statusFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                activeFilter === f.id
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Clear Completed Action */}
        <div>
          {completedCount > 0 ? (
            <button
              onClick={onClearCompleted}
              className="text-zinc-500 hover:text-red-500 dark:text-zinc-400 dark:hover:text-red-400 font-medium transition-colors"
            >
              Clear completed ({completedCount})
            </button>
          ) : (
            <div className="w-20 hidden sm:block" />
          )}
        </div>
      </div>

      {/* Category / Tag Pills row (only if categories exist) */}
      {availableCategories.length > 0 && (
        <div className="flex items-center space-x-1.5 overflow-x-auto pt-1 pb-0.5">
          <span className="flex items-center text-zinc-400 dark:text-zinc-500 mr-1 text-[11px]">
            <Tag className="w-3 h-3 mr-1" />
            Tags:
          </span>
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2 py-0.5 rounded-md font-medium text-[11px] transition-all ${
              selectedCategory === 'all'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            All
          </button>
          {availableCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? 'all' : cat)}
              className={`px-2 py-0.5 rounded-md font-medium text-[11px] transition-all ${
                selectedCategory === cat
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                  : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              #{cat}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
