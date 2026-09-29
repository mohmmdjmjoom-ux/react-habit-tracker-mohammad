// App — owns the habits array (the single source of truth) and every function
// that changes it. Children get data and callbacks: data flows down, events flow up.
import { useState } from 'react'
import HabitForm from './HabitForm.jsx'
import HabitCard from './HabitCard.jsx'
import SummaryBanner from './SummaryBanner.jsx'

const INITIAL_HABITS = [
  { id: 1, title: 'Drink 2 L water', doneToday: true, streak: 4 },
  { id: 2, title: 'Study React 30 min', doneToday: true, streak: 1 },
  { id: 3, title: 'Sleep by 11pm', doneToday: false, streak: 0 },
]

// A counter that only goes up. It is never worked out from the array,
// so a removed habit's id is never handed out again.
let nextId = INITIAL_HABITS.length + 1

const FILTERS = ['all', 'done', 'pending']

export default function App() {
  const [habits, setHabits] = useState(INITIAL_HABITS)
  const [filter, setFilter] = useState('all')
  const [lastRemoved, setLastRemoved] = useState(null) // { habit, index } or null

  function addHabit(title) {
    const newHabit = { id: nextId++, title, doneToday: false, streak: 0 }
    setHabits(prev => [...prev, newHabit])
  }

  function toggleDone(id) {
    setHabits(prev =>
      prev.map(h =>
        h.id === id
          ? {
              ...h,
              doneToday: !h.doneToday,
              streak: h.doneToday ? Math.max(0, h.streak - 1) : h.streak + 1,
            }
          : h,
      ),
    )
  }

  function removeHabit(id) {
    const index = habits.findIndex(h => h.id === id)
    if (index === -1) return
    setLastRemoved({ habit: habits[index], index })
    setHabits(prev => prev.filter(h => h.id !== id))
  }

  function undoRemove() {
    if (!lastRemoved) return
    const { habit, index } = lastRemoved
    setHabits(prev => [...prev.slice(0, index), habit, ...prev.slice(index)])
    setLastRemoved(null)
  }

  // New-day rule: a habit done today keeps its streak; a habit that was
  // NOT done today broke its streak, so it goes back to 0. Either way,
  // every habit starts the new day as not done.
  function startNewDay() {
    setHabits(prev =>
      prev.map(h => ({
        ...h,
        doneToday: false,
        streak: h.doneToday ? h.streak : 0,
      })),
    )
    setLastRemoved(null)
  }

  // Derived every render — only the chosen filter is stored, never a second array.
  const visibleHabits = habits.filter(h => {
    if (filter === 'done') return h.doneToday
    if (filter === 'pending') return !h.doneToday
    return true
  })

  return (
    <main className="app">
      <h1>Habit Tracker</h1>

      <HabitForm onAdd={addHabit} />
      <SummaryBanner habits={habits} />

      <div className="toolbar">
        <div className="filters" role="group" aria-label="Filter habits">
          {FILTERS.map(f => (
            <button
              key={f}
              type="button"
              className={`btn btn-filter${filter === f ? ' is-active' : ''}`}
              aria-pressed={filter === f}
              onClick={() => setFilter(f)}
            >
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <button type="button" className="btn btn-secondary" onClick={startNewDay}>
          Start a new day
        </button>
      </div>

      {lastRemoved && (
        <div className="undo-bar" role="status">
          <span>
            Removed “{lastRemoved.habit.title}”
          </span>
          <button type="button" className="btn btn-secondary" onClick={undoRemove}>
            Undo
          </button>
        </div>
      )}

      {visibleHabits.length === 0 ? (
        <p className="empty">
          {habits.length === 0 ? 'No habits yet — add one above.' : `No ${filter} habits.`}
        </p>
      ) : (
        <ul className="habit-list">
          {visibleHabits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggleDone={toggleDone}
              onRemove={removeHabit}
            />
          ))}
        </ul>
      )}
    </main>
  )
}
