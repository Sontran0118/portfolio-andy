export function Contact() {
  return (
    <section className="py-16 pb-24 animate-fadeIn">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-6">Get In Touch</h2>
        <p className="text-gray-300 text-lg mb-8">
          I'm actively seeking new opportunities. Let's connect and discuss how I can contribute to your team.
        </p>
        
        <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 text-gray-300">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>Contact via LinkedIn</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="https://www.linkedin.com/in/sontran0118/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                LinkedIn Profile
              </a>
              <a
                href="https://github.com/Sontran0118"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105"
              >
                GitHub Profile
              </a>
            </div>
          </div>
        </div>
        
        <footer className="mt-12 text-gray-500 text-sm">
          <p>© 2026 Andy Tran. Built with Next.js & Tailwind CSS.</p>
        </footer>
      </div>
    </section>
  );
}
