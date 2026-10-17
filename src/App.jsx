import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import portfolioData from './data/portfolioData.json'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import EducationCoursesSection from './components/EducationCoursesSection'
import LeetCodeSection from './components/LeetCodeSection'
import HobbiesSection from './components/HobbiesSection'
import CommandPalette from './components/CommandPalette'
import { Github, Linkedin, Mail } from 'lucide-react'

const pageSlideVariants = {
  initial: { opacity: 0, y: 24, scale: 0.98, filter: 'blur(8px)' },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -16,
    scale: 0.98,
    filter: 'blur(6px)',
    transition: { duration: 0.25 },
  },
}

export default function App() {
  const [activeSection, setActiveSection] = useState('overview')
  const [commandOpen, setCommandOpen] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  // Global keyboard shortcut Cmd/Ctrl + K
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setCommandOpen((prev) => !prev)
      } else if (e.key === 'Escape') {
        setCommandOpen(false)
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Interactive cursor glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSelectSection = (id) => {
    setActiveSection(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col justify-between bg-[#050507] text-zinc-100 relative selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-400 to-cyan-400 origin-left z-50"
      />

      {/* Dynamic Ambient Spotlight following cursor */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(99, 102, 241, 0.07), transparent 45%)`,
        }}
      />

      {/* Subtle Background Grid */}
      <div className="pointer-events-none fixed inset-0 bg-grid-pattern opacity-60 z-0" />

      {/* Top Ambient Glow */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[850px] h-[320px] bg-indigo-600/10 blur-[140px] rounded-full z-0" />

      {/* Floating Glass Navbar (Slide-Only Mode) */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        onOpenCommandPalette={() => setCommandOpen(true)}
      />

      {/* Main Content Container — Exclusive Slide Transitions */}
      <main className="relative z-10 flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 pt-6 sm:pt-8">
        <AnimatePresence mode="wait">
          {activeSection === 'overview' && (
            <motion.div
              key="overview"
              variants={pageSlideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Hero
                profile={portfolioData.profile}
                leetcode={portfolioData.leetcode}
                hobbies={portfolioData.hobbies}
                onNavigate={handleSelectSection}
              />
            </motion.div>
          )}
          {activeSection === 'projects' && (
            <motion.div
              key="projects"
              variants={pageSlideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-24 md:pt-20"
            >
              <ProjectsSection projects={portfolioData.projects} />
            </motion.div>
          )}
          {activeSection === 'experience' && (
            <motion.div
              key="experience"
              variants={pageSlideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-24 md:pt-20"
            >
              <ExperienceSection
                experience={portfolioData.experience}
                testimonials={portfolioData.testimonials}
              />
            </motion.div>
          )}
          {activeSection === 'education' && (
            <motion.div
              key="education"
              variants={pageSlideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-24 md:pt-20"
            >
              <EducationCoursesSection
                education={portfolioData.education}
                courses={portfolioData.courses}
                specializations={portfolioData.specializations}
              />
            </motion.div>
          )}
          {activeSection === 'leetcode' && (
            <motion.div
              key="leetcode"
              variants={pageSlideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-24 md:pt-20"
            >
              <LeetCodeSection leetcode={portfolioData.leetcode} />
            </motion.div>
          )}
          {activeSection === 'hobbies' && (
            <motion.div
              key="hobbies"
              variants={pageSlideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="pt-24 md:pt-20"
            >
              <HobbiesSection hobbies={portfolioData.hobbies} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer — Only GitHub, LinkedIn, and Email */}
      <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
            <p className="text-xs font-mono text-zinc-400">
              © {new Date().getFullYear()} {portfolioData.profile.name}. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={portfolioData.profile.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full glass-card text-zinc-300 hover:text-white hover:border-indigo-400/40 transition-all text-xs font-mono"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4 text-indigo-400" />
              <span>GitHub</span>
            </a>
            <a
              href={portfolioData.profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full glass-card text-zinc-300 hover:text-white hover:border-indigo-400/40 transition-all text-xs font-mono"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4 text-indigo-400" />
              <span>LinkedIn</span>
            </a>
            <a
              href={`mailto:${portfolioData.profile.email}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full glass-card text-zinc-300 hover:text-white hover:border-indigo-400/40 transition-all text-xs font-mono"
              aria-label="Email"
            >
              <Mail className="w-4 h-4 text-indigo-400" />
              <span>Email</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Command Palette Modal (Cmd/Ctrl + K) */}
      <CommandPalette
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        onNavigate={handleSelectSection}
        profile={portfolioData.profile}
        projects={portfolioData.projects}
        leetcode={portfolioData.leetcode}
      />
    </div>
  )
}
