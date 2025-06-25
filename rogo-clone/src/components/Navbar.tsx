export default function Navbar() {
  return (
    <header className="w-full fixed top-0 left-0 bg-white/70 backdrop-blur z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-4">
        <span className="font-bold text-xl">Rogo Clone</span>
        <a
          href="#cta"
          className="px-4 py-2 rounded-lg bg-slate-900 text-white text-sm hover:bg-slate-800"
        >
          Get Started
        </a>
      </div>
    </header>
  );
}
