import Board from "@/components/Board";

export default function Home() {
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-50">Issues</h1>
      <Board />
    </main>
  );
}
