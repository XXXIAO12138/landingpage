const features = [
  {
    title: "WebSocket streaming",
    desc: "Real-time answers with near-zero latency."
  },
  {
    title: "Gemini LLM",
    desc: "Google-grade reasoning backing every reply."
  },
  {
    title: "One-click deploy",
    desc: "Docker → Cloud Run in minutes."
  }
];

export default function FeatureGrid() {
  return (
    <section className="py-24 bg-slate-50" id="features">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
        {features.map(f => (
          <div
            key={f.title}
            className="bg-white p-8 rounded-2xl shadow flex flex-col"
          >
            <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
            <p className="text-slate-600 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
