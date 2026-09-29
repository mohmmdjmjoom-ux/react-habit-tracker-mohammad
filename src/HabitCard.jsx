// HabitCard — shows one habit's title and streak, with a Todo/Done toggle and a
// Remove button. It owns no state: it only calls the functions App passes down.
export default function HabitCard({ habit, onToggleDone, onRemove }) {
  const { id, title, doneToday, streak } = habit

  return (
    <li className={`habit-card${doneToday ? ' is-done' : ''}`}>
      <span className="habit-title">{title}</span>
      <span className="habit-streak">streak: {streak}</span>
      <button
        type="button"
        className={`btn btn-toggle${doneToday ? ' is-done' : ''}`}
        aria-pressed={doneToday}
        onClick={() => onToggleDone(id)}
      >
        {doneToday ? 'Done' : 'Todo'}
      </button>
      <button
        type="button"
        className="btn btn-remove"
        aria-label={`Remove ${title}`}
        onClick={() => onRemove(id)}
      >
        Remove
      </button>
    </li>
  )
}
