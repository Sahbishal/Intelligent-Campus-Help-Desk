import ChatInterface from '@/components/ChatInterface';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-2">
          Intelligent Campus Help Desk
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Powered by Gemini AI
        </p>
      </div>
      <ChatInterface />
    </main>
  );
}
