export function About() {
  const skills = [
    { category: 'Systems', items: ['C/C++', 'Assembly/MIPS', 'Linux'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'MongoDB'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript'] },
    { category: 'Tools', items: ['Git', 'Networking', 'Protocol Implementation'] },
  ];

  return (
    <section className="py-16 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">About Me</h2>
        <div className="bg-gray-800/50 rounded-xl p-8 shadow-xl border border-gray-700">
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            I'm a software engineer with a passion for systems programming and backend development.
            My expertise spans low-level programming in C/C++ and Assembly, full-stack web development,
            and building robust, scalable systems. I specialize in networking, algorithms, and creating
            efficient solutions to complex technical challenges.
          </p>
          
          <h3 className="text-2xl font-semibold text-white mb-6">Technical Skills</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} className="space-y-2">
                <h4 className="text-blue-400 font-semibold">{skillGroup.category}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
