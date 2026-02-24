export function Hero() {
  return (
    <section className="pt-20 pb-16 text-center animate-fadeIn">
      <div className="space-y-6">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-tight">
          Andy Tran
        </h1>
        <p className="text-xl sm:text-2xl text-blue-400 font-medium">
          Software Engineer | Systems Programmer | Backend Engineer
        </p>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Based in New York City · Actively seeking opportunities
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <a
            href="https://github.com/Sontran0118"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/sontran0118/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
