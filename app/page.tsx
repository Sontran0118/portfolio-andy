import { GitHubProjects } from '@/components/GitHubProjects';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Contact } from '@/components/Contact';

export const metadata = {
  title: 'Andy Tran | Software Engineer',
  description: 'Portfolio of Andy Tran - Software Engineer, Systems Programmer, and Backend Engineer specializing in C/C++, JavaScript, and low-level programming.',
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <GitHubProjects />
        <Contact />
      </div>
    </main>
  );
}
