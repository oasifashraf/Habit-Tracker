
import { isSameDay } from "date-fns";
import { type ReactNode } from "react";
import { HabitContext, type Habit } from "./useHabits";
import { useLocalStorage } from "../hooks/useLocalStorage";

// Provider Props
type HabitProviderProps = {
  children: ReactNode;
};

// Data structure saved in Local Storage
type StoredHabit = {
  id: string;
  name: string;
  completions: string[];
};

// Convert saved Date strings back to Date objects
function parseHabits(json: string): Habit[] {
  const saved = JSON.parse(json) as StoredHabit[];

  if (!Array.isArray(saved)) {
    throw new Error("Invalid saved habits");
  }

  return saved.map((habit) => ({
    id: habit.id,
    name: habit.name,
    completions: habit.completions.map(
      (dateString) => new Date(dateString)
    ),
  }));
}

export function HabitProvider({
  children,
}: HabitProviderProps) {

  // Load and save habit data using Local Storage
  const [habits, setHabits] = useLocalStorage<Habit[]>(
    "Habits",
    [],
    parseHabits
  );

  // Add a new habit
  function addHabit(name: string) {
    setHabits((curr) => [
      ...curr,
      {
        id: crypto.randomUUID(),
        name,
        completions: [],
      },
    ]);
  }

  // Delete a habit
  function deleteHabit(id: string) {
    setHabits((curr) =>
      curr.filter((habit) => habit.id !== id)
    );
  }

  // Mark or unmark a habit as completed
  function toggleHabit(id: string, date: Date) {
    setHabits((curr) =>
      curr.map((habit) => {
        if (habit.id !== id) {
          return habit;
        }

        const alreadyDone = habit.completions.some(
          (completedDate) =>
            isSameDay(completedDate, date)
        );

        const completions = alreadyDone
          ? habit.completions.filter(
              (completedDate) =>
                !isSameDay(completedDate, date)
            )
          : [...habit.completions, date];

        return {
          ...habit,
          completions,
        };
      })
    );
  }

  // Share data and functions with child components
  return (
    <HabitContext.Provider
      value={{
        habits,
        addHabit,
        deleteHabit,
        toggleHabit,
      }}
    >
      {children}
    </HabitContext.Provider>
  );
}
