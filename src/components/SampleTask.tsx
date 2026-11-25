
import { useEffect, useState } from "react";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default function SampleTask() {
  const [task, setTask] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadTask() {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/2",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch task");
        }

        const data: Todo = await response.json();

        if (!controller.signal.aborted) {
          setTask(data);
        }
      } catch {
        if (!controller.signal.aborted) {
          setError("Could not load the task");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadTask();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="rounded-xl bg-zinc-800 p-4 text-white">
      <h2 className="mb-3 text-lg font-bold">
        Sample Task from API
      </h2>

      {loading && <p>Loading...</p>}

      {error && (
        <p className="text-red-500">{error}</p>
      )}

      {task && (
      <div className="space-y-2">
        <p>User ID: {task.userId}</p>
        <p>Task ID: {task.id}</p>
        <p>Task: {task.title}</p>

        <p>
        Status: {task.completed ? "Completed" : "Pending"}
        </p>
      </div>
    )}
    </div>
  );
}
