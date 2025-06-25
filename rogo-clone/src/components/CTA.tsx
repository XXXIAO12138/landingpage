export default function CTA() {
  return (
    <section
      id="cta"
      className="py-24 bg-slate-900 text-white text-center px-4"
    >
      <h2 className="text-3xl font-bold mb-4">Ready to build faster?</h2>
      <p className="mb-8 text-slate-300">
        Deploy your own AI copilot in less than five minutes.
      </p>
      <a
        href="https://console.cloud.google.com/run"
        target="_blank"
        className="inline-block px-6 py-3 bg-white text-slate-900 rounded-lg font-medium hover:bg-slate-200 transition"
      >
        Deploy on Cloud Run
      </a>
    </section>
  );
}
