# Taskflow — Clean & Minimalist Todo App

A sleek, responsive, and minimalist Todo application built with **React** and **Tailwind CSS**. It persists all tasks and preferences directly in your browser's **LocalStorage**.

---

## ✨ Features

- **Minimalist Aesthetic**: Clean typography (Inter font), refined neutral palette (zinc/slate), soft card shadows, and subtle borders.
- **LocalStorage Persistence**:
  - Automatically saves all your tasks, completion states, priorities, tags, and due dates.
  - Remembers your Light / Dark mode preference across browser sessions.
- **Light & Dark Mode**: One-click toggle in the header with full theme transition and browser `color-scheme` integration.
- **Due Dates & Status Badges**:
  - Assign due dates to any task.
  - Automatically displays smart relative status badges:
    - **Overdue**: Highlighted in rose/red.
    - **Today**: Highlighted in amber.
    - **Tomorrow**: Highlighted in sky blue.
    - Future dates formatted cleanly (e.g. *Oct 2*).
- **Priority Indicators**:
  - Assign **High** (Rose dot), **Medium** (Amber dot), or **Low** (Blue dot) priority to tasks.
- **Tags & Categories**:
  - Categorize tasks with preset tags (`#Work`, `#Personal`, `#Study`, `#Health`).
  - Interactive tag filter bar to view tasks by specific categories.
- **Confetti Celebration 🎉**:
  - Powered by `canvas-confetti`.
  - Automatically fires a celebration confetti burst whenever you complete all active tasks (100% progress).
- **Task Management**:
  - **Add Task**: Quickly create tasks with the input bar. Click the detail button or focus to expand due date, priority, and tag options.
  - **Mark Complete**: Custom minimalist checkmark toggle with strike-through styling.
  - **Inline Editing**: Double-click any task or click the edit icon to edit inline. Press `Enter` to save, `Esc` to cancel.
  - **Delete Task**: Discreet trash icon on hover.
  - **Clear Completed**: Clear all completed tasks in one click.
- **Filters & Progress**:
  - Filter tabs: **All**, **Active**, and **Completed**.
  - Tag filter chips for category-based filtering.
  - Remaining active task counter.
  - Visual progress bar tracking overall completion percentage.

---

## 🛠️ Tech Stack

- **React 18** (JavaScript)
- **Vite**
- **Tailwind CSS**
- **canvas-confetti**
- **Lucide React** (Icons)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```
