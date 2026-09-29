import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import { useLocalStorage } from './hooks/useLocalStorage';
import { triggerCelebration } from './utils/confetti';

const today = new Date();
const todayStr = today.toISOString().split('T')[0];
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const tomorrowStr = tomorrow.toISOString().split('T')[0];

const STARTER_TODOS = [
  {
    id: 'task-1',
    text: 'Complete project sprint goals 🎯',
    completed: false,
    createdAt: Date.now() - 30000,
    priority: 'high',
    category: 'Work',
    dueDate: todayStr,
  },
  {
    id: 'task-2',
    text: 'Review documentation and notes 📚',
    completed: false,
    createdAt: Date.now() - 20000,
    priority: 'medium',
    category: 'Study',
    dueDate: tomorrowStr,
  },
  {
    id: 'task-3',
    text: 'Complete all pending tasks for a celebration! 🎉',
    completed: false,
    createdAt: Date.now() - 10000,
    priority: 'low',
    category: 'Personal',
  },
  {
    id: 'task-4',
    text: 'Toggle dark mode in top-right corner 🌙',
    completed: true,
    createdAt: Date.now(),
    category: 'Personal',
  },
];

export default function App() {
  // Theme state synced with localStorage and html class
  const [darkMode, setDarkMode] = useLocalStorage('taskflow_theme', () => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Todos state synced with localStorage
  const [todos, setTodos] = useLocalStorage('taskflow_todos', STARTER_TODOS);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Add todo with extended attributes
  const handleAddTodo = ({ text, priority, category, dueDate }) => {
    const newTodo = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `task-${Date.now()}`,
      text,
      completed: false,
      createdAt: Date.now(),
      priority,
      category,
      dueDate,
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  // Toggle completed & trigger confetti if all active tasks are finished
  const handleToggleComplete = (id) => {
    setTodos((prev) => {
      const target = prev.find((t) => t.id === id);
      const willBeCompleted = target && !target.completed;
      const updated = prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );

      if (willBeCompleted) {
        const remainingActive = updated.filter((t) => !t.completed).length;
        if (remainingActive === 0 && updated.length > 0) {
          triggerCelebration();
        }
      }

      return updated;
    });
  };

  // Edit todo
  const handleEditTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // Delete todo
  const handleDeleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Clear completed
  const handleClearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  // Counts
  const totalCount = todos.length;
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = totalCount - completedCount;

  // Available unique categories
  const availableCategories = useMemo(() => {
    const set = new Set();
    todos.forEach((t) => {
      if (t.category) set.add(t.category);
    });
    return Array.from(set);
  }, [todos]);

  // Filtered todos (status + category tag)
  const filteredTodos = useMemo(() => {
    return todos.filter((t) => {
      // Status filter
      if (activeFilter === 'active' && t.completed) return false;
      if (activeFilter === 'completed' && !t.completed) return false;

      // Category filter
      if (selectedCategory !== 'all' && t.category !== selectedCategory) return false;

      return true;
    });
  }, [todos, activeFilter, selectedCategory]);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <main className="w-full max-w-xl mx-auto">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-soft dark:shadow-soft-dark transition-all">
          <Header
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            totalCount={totalCount}
            completedCount={completedCount}
          />

          <TodoInput onAddTodo={handleAddTodo} />

          {totalCount > 0 && (
            <TodoFilter
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              availableCategories={availableCategories}
              activeCount={activeCount}
              completedCount={completedCount}
              onClearCompleted={handleClearCompleted}
            />
          )}

          <TodoList
            todos={filteredTodos}
            filter={activeFilter}
            onToggleComplete={handleToggleComplete}
            onDeleteTodo={handleDeleteTodo}
            onEditTodo={handleEditTodo}
          />
        </div>
      </main>

      <footer className="mt-12 text-center text-xs text-zinc-400 dark:text-zinc-600">
        <p>Built by Abiola Adeosun, an HNG Intern</p>
      </footer>
    </div>
  );
}
