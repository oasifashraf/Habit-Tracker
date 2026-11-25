import {useHabits} from "../context/useHabits";

export default function HabitCount() {
    const { habits } = useHabits();
    const totalHabits = habits.length;
    return (
        <div className="rounded-lg bg-violet-600 p-4 text-white">
            <h2 className="text-lg font-bold">Habit Statistics</h2>

            <p className="mt-2">
                You are tracking {totalHabits} habits.
            </p>
        </div>
    );
}