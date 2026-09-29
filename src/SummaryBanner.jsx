// SummaryBanner — calculates the done count, total and percentage from habits on
// every render (nothing here is stored in state) and draws a progress bar.
// When every habit is done it celebrates — but only if there is at least one habit.
export default function SummaryBanner({ habits }) {
  const total = habits.length
  const done = habits.filter(h => h.doneToday).length
  const percent = total === 0 ? 0 : Math.round((done / total) * 100)
  const allDone = total > 0 && done === total

  return (
    <section className={`summary${allDone ? ' is-celebrating' : ''}`}>
      <p className="summary-text">
        {done} of {total} done — {percent}%
      </p>
      <div
        className="progress"
        role="progressbar"
        aria-label="Habits done today"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div className="progress-fill" style={{ width: `${percent}%` }} />
      </div>
      {allDone && <p className="celebrate">🎉 All done for today — great job!</p>}
    </section>
  )
}
