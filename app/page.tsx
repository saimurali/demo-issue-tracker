import Board from "@/components/Board";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50">Issues</h1>
        <ThemeToggle />
      </div>
      <Board />
    </main>
  );
}
