import { useState } from 'react'
import { HabitForm } from './components/HabitForm'
import { HabitList } from './components/HabitList'
import { Header } from './components/Header'
import { HabitProvider } from './context/HabitProvider'

import { addWeeks, eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns'

export default function App() {
  
  const [weekOffset, setWeekOffset] = useState(0)

    const week = addWeeks(new Date(), weekOffset)

    const visibleDates = eachDayOfInterval ({ 
          start: startOfWeek(week, {weekStartsOn: 1}),
          end: endOfWeek(week, {weekStartsOn: 1}),
  
  })

  return (
    <div className="max-w-2xl mx-auto p-4 flex flex-col gap-4">
      <HabitProvider>
  <Header
    visibleDates={visibleDates}
    onePrev={() => setWeekOffset(prev => prev - 1)}
    oneNext={() => setWeekOffset(prev => prev + 1)}
  />

  <div className="flex items-center justify-between">
    <p className="text-sm text-zinc-400">
  {weekOffset === 0
    ? "Current Week"
    : weekOffset < 0
    ? `Previous Week: ${weekOffset}`
    : `Future Week: ${weekOffset}`}
</p>

    <button
      onClick={() => setWeekOffset(0)}
      className="rounded-lg bg-violet-600 px-4 py-2 text-white"
    >
      Current Week
    </button>
  </div>

  <HabitForm />

  <HabitList visibleDates={visibleDates} />
</HabitProvider>
    </div>
  )
}




