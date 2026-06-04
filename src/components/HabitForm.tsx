import { useState, type SubmitEvent} from 'react'
import { Button } from './Button'
import { useHabits } from '../context/HabitProvider'



// type HabitFormProps = {
//     addHabit: (name: string) => void
// }

export function HabitForm() {

  const [name, setName] = useState("")
  const {addHabit} = useHabits()

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()

    if (name.trim() === "") return
    setName("")

    addHabit(name)

    // console.log(name)
  }

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        // type="text"
        placeholder="New habit..."
        className="flex-1 rounded-lg bg-zinc-800 px-4 py-2 text-zinc-100 outline-none focus:ring-2 focus-visible:ring-violet-500"
      />

      <Button 
      disabled={name.trim() === ""}
      className="rotate-lg px-4 py-2 font-medium">Add Habit</Button>
    </form>
  )
}