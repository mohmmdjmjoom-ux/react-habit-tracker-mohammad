// HabitForm — a controlled input and an Add button. It keeps only the text being
// typed; on submit it hands the trimmed title up to App through onAdd.
import { useState } from 'react'

export default function HabitForm({ onAdd }) {
  const [title, setTitle] = useState('')

  function handleSubmit(e) {
    e.preventDefault() // stop the browser reloading the page (and wiping state)
    const trimmed = title.trim()
    if (!trimmed) return // blank or spaces-only titles are ignored
    onAdd(trimmed)
    setTitle('')
  }

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <label htmlFor="new-habit" className="visually-hidden">
        New habit
      </label>
      <input
        id="new-habit"
        type="text"
        placeholder="New habit"
        value={title}
        onChange={e => setTitle(e.target.value)}
        autoComplete="off"
      />
      <button type="submit" className="btn btn-primary">
        Add
      </button>
    </form>
  )
}
