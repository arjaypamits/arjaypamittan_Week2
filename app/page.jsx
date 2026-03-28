'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UserButton, SignInButton, useUser } from '@clerk/nextjs';
import Chat from '@/components/chat';

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const { isSignedIn } = useUser();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(sectionId);
  };

  const skills = [
    'React',
    'Next.js',
    'Vercel',
    'V0',
    'Claude',
    'Flutter',
    'Laravel',
    'HTML',
    'CSS',
    'Python',
    'PostgreSQL',
    'SQL',
    'WAMP',
    'XAMPP',
    'Groq'
  ];

  const certifications = [
    {
      title: 'Certificate of Membership',
      org: 'Junior Philippine Computer Society - SPUP Chapter',
      date: 'January 15, 2026'
    },
    {
      title: 'Certificate of Attendance',
      org: 'JPCS Leadership Transformation Workshop & NBO Election',
      date: 'December 9, 2025'
    },
    {
      title: 'Certificate of Participation',
      org: 'IT Cybersecurity Roadshow',
      date: 'October 25, 2025'
    },
    {
      title: 'Certificate of Recognition',
      org: 'Member of Organizing Team - IT Cybersecurity Roadshow',
      date: 'October 25, 2025'
    },
    {
      title: 'Certificate of Participation',
      org: '2025 SITE Film Festival',
      date: 'June 19, 2025'
    },
    {
      title: 'Certificate of Recognition',
      org: 'SITE Representative - The Paulinian Student Government',
      date: 'June 14, 2025'
    },
    {
      title: 'National Certificate II (TESDA)',
      org: 'Computer Systems Servicing',
      date: 'June 26, 2023 - Present'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white border-b border-black z-50">
        <div className="max-w-6xl mx-auto px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Arjay Pamittan</h1>

          <div className="flex gap-12 items-center">
            {['About', 'Skills', 'Projects', 'Education', 'Goals', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="nav-underline font-medium text-sm tracking-wide hover:text-black transition-colors"
              >
                {item}
              </button>
            ))}
            {isSignedIn ? (
              <UserButton />
            ) : (
              <SignInButton mode="modal">
                <button className="px-4 py-2 bg-black text-white rounded-lg font-medium text-sm hover:bg-gray-800 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24">
        {/* About Section */}
        <section id="about" className="max-w-6xl mx-auto px-8 py-24 border-b border-black">
          <div className="grid grid-cols-2 gap-16">
            <div>
              <p className="text-xs font-semibold tracking-widest text-gray-600 mb-8">
                AVAILABLE FOR WORK
              </p>
              <h2 className="text-5xl font-bold mb-8 leading-tight">
                Arjay P. Pamittan
              </h2>
              <p className="text-lg mb-8 leading-relaxed">
                Bachelor of Science in Information Technology Student at St. Paul University Philippines. Specialized in building modern web applications with React, Next.js, and Laravel.
              </p>
              <p className="text-sm text-gray-700 mb-8 leading-relaxed">
                Currently in my 3rd year, focused on full-stack development and cybersecurity. Experienced in multiple programming languages and frameworks with a passion for creating clean, efficient code.
              </p>
              
              <div className="flex gap-6 mb-8">
                <button className="px-8 py-3 bg-black text-white font-medium text-sm tracking-wide hover:bg-gray-900 transition-colors">
                  Contact Me
                </button>
                <button className="px-8 py-3 border border-black font-medium text-sm tracking-wide hover:bg-black hover:text-white transition-colors">
                  Download Resume
                </button>
              </div>

              <div className="flex gap-6 text-gray-600">
                <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-black transition-colors">GitHub</a>
                <a href="#" className="hover:text-black transition-colors">Email</a>
              </div>
            </div>
            
            <div className="flex items-center justify-center">
              <Image
                src="/pamittan.png"
                alt="Arjay Pamittan"
                width={350}
                height={350}
                className="rounded-lg object-cover"
                priority
              />
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="max-w-6xl mx-auto px-8 py-24 border-b border-black">
          <h2 className="text-4xl font-bold mb-16">Skills</h2>
          
          <div className="grid grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div
                key={skill}
                className="px-6 py-4 border border-black flex items-center justify-center text-center font-medium hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
              >
                {skill}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="max-w-6xl mx-auto px-8 py-24 border-b border-black">
          <h2 className="text-4xl font-bold mb-16">Projects</h2>
          <p className="text-lg text-gray-600">Coming soon...</p>
        </section>

        {/* Education Section */}
        <section id="education" className="max-w-6xl mx-auto px-8 py-24 border-b border-black">
          <h2 className="text-4xl font-bold mb-16">Education</h2>
          <p className="text-lg text-gray-600">Coming soon...</p>
        </section>

        {/* Certification Section */}
        <section id="certification" className="max-w-6xl mx-auto px-8 py-24 border-b border-black">
          <h2 className="text-4xl font-bold mb-16">Certifications & Achievements</h2>
          
          <div className="space-y-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="border-l-2 border-black pl-8 py-4 hover:pl-10 transition-all duration-200"
              >
                <h3 className="text-lg font-bold mb-2">{cert.title}</h3>
                <p className="text-gray-700 mb-2">{cert.org}</p>
                <p className="text-sm text-gray-500">{cert.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Goals Section */}
        <section id="goals" className="max-w-6xl mx-auto px-8 py-24 border-b border-black">
          <h2 className="text-4xl font-bold mb-16">Goals</h2>
          <p className="text-lg text-gray-600">Coming soon...</p>
        </section>

        {/* Contact Section */}
        <section id="contact" className="max-w-6xl mx-auto px-8 py-24">
          <h2 className="text-4xl font-bold mb-16">Get In Touch</h2>
          
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h3 className="text-xl font-bold mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-2">EMAIL</p>
                  <a href="mailto:arjaypamittan@spup.edu.ph" className="text-lg font-medium hover:underline">
                    arjaypamittan@spup.edu.ph
                  </a>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-2">LOCATION</p>
                  <p className="text-lg">Tuguegarao City, Cagayan</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600 font-semibold mb-2">SOCIAL</p>
                  <div className="flex gap-6">
                    <a href="#" className="font-medium hover:underline">LinkedIn</a>
                    <a href="#" className="font-medium hover:underline">GitHub</a>
                    <a href="#" className="font-medium hover:underline">Twitter</a>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-8">Quick Inquiry</h3>
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">Name</label>
                  <input
                    type="text"
                    className="w-full border border-black px-4 py-3 focus:outline-none focus:bg-black focus:text-white transition-colors"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold mb-3">Message</label>
                  <textarea
                    className="w-full border border-black px-4 py-3 resize-none focus:outline-none focus:bg-black focus:text-white transition-colors"
                    rows="5"
                    placeholder="Your message"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 font-medium text-sm tracking-wide hover:bg-gray-900 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 border-t border-gray-800">
        <div className="max-w-6xl mx-auto px-8 text-center text-sm text-gray-400">
          <p>&copy; 2026 Arjay Pamittan. All rights reserved.</p>
        </div>
      </footer>

      {/* Chat Component */}
      <Chat />
    </div>
  );
}
