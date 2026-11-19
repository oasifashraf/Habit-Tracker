type WelcomeMessageProps = {
  name: string;
  message: string;
  totalHabits: number;
};

export default function WelcomeMessage({ name, message, totalHabits }: WelcomeMessageProps) {
  return (
    <div className="rounded-lg bg-violet-600 p-4 text-white">
      <h2 className="text-xl font-bold">
        Welcome, {name}!
      </h2>

      <p className="mt-2">{message}</p>
      <p className="mt-2">
        Total Habits: {totalHabits}
      </p>


    </div>
  );
}