export function getDueDateBadge(dateString, isCompleted = false) {
  if (!dateString) return null;

  const [year, month, day] = dateString.split('-').map(Number);
  const taskDate = new Date(year, month - 1, day);
  
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const diffTime = taskDate.getTime() - today.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (isCompleted) {
    return {
      label: taskDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      isOverdue: false,
      badgeClass: 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500 border-zinc-200 dark:border-zinc-800',
    };
  }

  if (diffDays < 0) {
    return {
      label: diffDays === -1 ? 'Yesterday (Overdue)' : `${Math.abs(diffDays)}d overdue`,
      isOverdue: true,
      badgeClass: 'bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border-rose-200/80 dark:border-rose-900/50',
    };
  }

  if (diffDays === 0) {
    return {
      label: 'Today',
      isOverdue: false,
      badgeClass: 'bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400 border-amber-200/80 dark:border-amber-900/50',
    };
  }

  if (diffDays === 1) {
    return {
      label: 'Tomorrow',
      isOverdue: false,
      badgeClass: 'bg-sky-50 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400 border-sky-200/80 dark:border-sky-900/50',
    };
  }

  return {
    label: taskDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    isOverdue: false,
    badgeClass: 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800',
  };
}
