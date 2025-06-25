export default function Hero() {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4">
        Your AI Copilot
      </h1>
      <p className="max-w-xl text-lg md:text-xl text-slate-600">
        Ask anything, get instant answers and build faster.
        <br />
        Press <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd> to open the copilot.
      </p>
    </section>
  );
}
