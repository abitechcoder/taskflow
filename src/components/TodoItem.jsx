import React, { useState, useRef, useEffect } from 'react';
import { Check, Trash2, Edit3, Calendar } from 'lucide-react';
import { getDueDateBadge } from '../utils/dateUtils';
import { CATEGORY_STYLES, PRIORITY_CONFIG } from '../utils/constants';

export default function TodoItem({
  todo,
  onToggleComplete,
  onDeleteTodo,
  onEditTodo,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus();
      inputRef.current?.select();
    }
  }, [isEditing]);

  const handleStartEdit = () => {
    setEditValue(todo.text);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== todo.text) {
      onEditTodo(todo.id, trimmed);
    } else if (!trimmed) {
      setEditValue(todo.text);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditValue(todo.text);
      setIsEditing(false);
    }
  };

  const dueDateBadge = getDueDateBadge(todo.dueDate, todo.completed);
  const priorityInfo = todo.priority && PRIORITY_CONFIG[todo.priority];
  const categoryStyle = todo.category ? (CATEGORY_STYLES[todo.category] || CATEGORY_STYLES.default) : null;

  return (
    <li
      className={`group flex items-start sm:items-center justify-between p-3.5 rounded-xl border transition-all ${
        todo.completed
          ? 'bg-zinc-50/60 dark:bg-zinc-900/40 border-zinc-200/60 dark:border-zinc-800/60'
          : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-sm'
      }`}
    >
      <div className="flex items-start sm:items-center space-x-3 flex-1 min-w-0 mr-2">
        {/* Minimalist Checkbox */}
        <button
          onClick={() => onToggleComplete(todo.id)}
          aria-label={todo.completed ? 'Mark task incomplete' : 'Mark task complete'}
          className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 sm:mt-0 transition-all ${
            todo.completed
              ? 'bg-zinc-900 border-zinc-900 dark:bg-white dark:border-white text-white dark:text-zinc-900'
              : 'border-zinc-300 dark:border-zinc-700 hover:border-zinc-500 dark:hover:border-zinc-500 bg-transparent'
          }`}
        >
          {todo.completed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              ref={inputRef}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleSaveEdit}
              onKeyDown={handleKeyDown}
              className="w-full bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 text-sm rounded-md text-zinc-900 dark:text-zinc-100 outline-none border border-zinc-300 dark:border-zinc-700 focus:ring-1 focus:ring-zinc-400"
            />
          ) : (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span
                onDoubleClick={handleStartEdit}
                title="Double-click to edit"
                className={`text-sm select-none break-words cursor-pointer transition-all ${
                  todo.completed
                    ? 'line-through text-zinc-400 dark:text-zinc-500'
                    : 'text-zinc-800 dark:text-zinc-200'
                }`}
              >
                {todo.text}
              </span>

              {/* Priority Indicator */}
              {priorityInfo && (
                <span
                  title={`${priorityInfo.label} Priority`}
                  className={`inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded border ${
                    todo.completed
                      ? 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800'
                      : priorityInfo.badge
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full mr-1 ${todo.completed ? 'bg-zinc-400' : priorityInfo.color}`} />
                  {priorityInfo.label}
                </span>
              )}

              {/* Category / Tag Badge */}
              {todo.category && (
                <span
                  className={`inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                    todo.completed
                      ? 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800'
                      : categoryStyle
                  }`}
                >
                  #{todo.category}
                </span>
              )}

              {/* Due Date Status Badge */}
              {dueDateBadge && (
                <span
                  className={`inline-flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded border ${dueDateBadge.badgeClass}`}
                >
                  <Calendar className="w-2.5 h-2.5 mr-1" />
                  {dueDateBadge.label}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity flex-shrink-0 ml-1">
        {!isEditing && (
          <button
            onClick={handleStartEdit}
            aria-label="Edit task"
            className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={() => onDeleteTodo(todo.id)}
          aria-label="Delete task"
          className="p-1.5 text-zinc-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </li>
  );
}
