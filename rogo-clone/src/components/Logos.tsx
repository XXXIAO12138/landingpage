const names = ["google", "meta", "netflix", "stripe", "vercel"];

export default function Logos() {
  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 opacity-70">
        {names.map(n => (
          <img
            key={n}
            src={`/logos/${n}.svg`}
            alt={n}
            className="h-10 grayscale"
          />
        ))}
      </div>
    </section>
  );
}
