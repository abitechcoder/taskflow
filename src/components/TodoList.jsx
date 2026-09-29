import React from 'react';
import TodoItem from './TodoItem';
import { ClipboardCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function TodoList({
  todos,
  filter,
  onToggleComplete,
  onDeleteTodo,
  onEditTodo,
}) {
  if (todos.length === 0) {
    let emptyIcon = <Sparkles className="w-8 h-8 text-zinc-400 dark:text-zinc-600 mb-2 stroke-[1.5]" />;
    let emptyTitle = "No tasks yet";
    let emptySubtitle = "Type above and press Enter to add your first task.";

    if (filter === 'active') {
      emptyIcon = <ClipboardCheck className="w-8 h-8 text-zinc-400 dark:text-zinc-600 mb-2 stroke-[1.5]" />;
      emptyTitle = "All caught up!";
      emptySubtitle = "There are no pending tasks left on your list.";
    } else if (filter === 'completed') {
      emptyIcon = <CheckCircle2 className="w-8 h-8 text-zinc-400 dark:text-zinc-600 mb-2 stroke-[1.5]" />;
      emptyTitle = "No completed tasks";
      emptySubtitle = "Finish tasks to see them archived here.";
    }

    return (
      <div className="py-12 px-4 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/20 flex flex-col items-center justify-center">
        {emptyIcon}
        <h3 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
          {emptyTitle}
        </h3>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 max-w-xs">
          {emptySubtitle}
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-2.5">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
        />
      ))}
    </ul>
  );
}
