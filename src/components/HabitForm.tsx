
import { useState, type SubmitEvent } from "react";
import { Button } from "./Button";
import { useHabits } from "../context/useHabits";

export function HabitForm() {
  const [name, setName] = useState("");
  const { addHabit } = useHabits();

  const isValid = name.trim().length >= 3;

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!isValid) return;

    addHabit(name.trim());
    setName("");
  }

  return (
    <form
      className="flex items-start gap-2"
      onSubmit={handleSubmit}
    >
      <div className="flex-1 min-w-0">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New habit..."
          className="w-full rounded-lg bg-zinc-800 px-4 py-2 text-zinc-100 outline-none focus:ring-2 focus-visible:ring-violet-500"
        />

        {name.length > 0 && !isValid && (
          <p className="mt-2 text-sm text-red-400">
            Habit name must be at least 3 characters long.
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={!isValid}
        className="px-4 py-2 font-medium"
      >
        Add Habit
      </Button>
    </form>
  );
}
