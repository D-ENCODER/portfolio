import React from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Code2,
  Film,
  Command
} from 'lucide-react'

const navItems = [
  { id: 'overview', label: 'Overview', shortLabel: 'Home', icon: Sparkles },
  { id: 'projects', label: 'Projects', shortLabel: 'Projects', icon: FolderGit2 },
  { id: 'experience', label: 'Experience', shortLabel: 'Work', icon: Briefcase },
  { id: 'education', label: 'Education', shortLabel: 'Edu', icon: GraduationCap },
  { id: 'leetcode', label: 'LeetCode', shortLabel: 'LeetCode', icon: Code2 },
  { id: 'hobbies', label: 'Hobbies', shortLabel: 'Hobbies', icon: Film },
]

export default function Navbar({
  activeSection,
  onSelectSection,
  onOpenCommandPalette,
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-4 pt-2.5 sm:pt-4 pointer-events-none">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        {/* Top Row on Mobile / Left & Right on Desktop */}
        <div className="flex items-center justify-between w-full md:w-auto">
          {/* Brand Badge */}
          <motion.button
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => onSelectSection('overview')}
            className="pointer-events-auto group flex items-center gap-2 px-3 py-1.5 sm:py-2 rounded-full glass-card hover:border-indigo-500/40 transition-all shrink-0"
          >
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-indigo-500"></span>
            </span>
            <span className="font-mono text-xs font-semibold tracking-wider text-zinc-200 group-hover:text-white transition-colors">
              HET<span className="text-indigo-400">.PY</span>
            </span>
          </motion.button>

          {/* Mobile Command Palette Button */}
          <motion.button
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={onOpenCommandPalette}
            className="pointer-events-auto md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card text-xs font-mono text-zinc-300 hover:text-white hover:border-indigo-500/40 transition-all"
            aria-label="Open Command Palette"
          >
            <Command className="w-4 h-4 text-indigo-400" />
            <span className="text-zinc-400">Search</span>
          </motion.button>
        </div>

        {/* Slide Navigation Bar — Full-width 6-column large icon dock on mobile, sleek pill on desktop */}
        <motion.nav
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="pointer-events-auto grid grid-cols-6 md:flex md:items-center gap-1 p-1.5 rounded-2xl md:rounded-full glass-card shadow-2xl shadow-black/80 w-full md:w-auto"
        >
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            return (
              <button
                key={item.id}
                onClick={() => onSelectSection(item.id)}
                className={`relative px-1.5 md:px-3.5 py-2 md:py-1.5 rounded-xl md:rounded-full text-xs sm:text-sm font-medium transition-colors flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2 whitespace-nowrap ${
                  isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
                title={item.label}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 32,
                    }}
                    className="absolute inset-0 rounded-xl md:rounded-full bg-gradient-to-r from-indigo-500/25 via-purple-500/20 to-indigo-500/25 border border-indigo-400/30 shadow-[0_0_20px_rgba(99,102,241,0.25)]"
                  />
                )}
                <Icon
                  className={`w-5 h-5 md:w-4 md:h-4 relative z-10 shrink-0 ${
                    isActive ? 'text-indigo-400' : ''
                  }`}
                />
                <span className="relative z-10 text-[10px] md:hidden font-medium tracking-tight leading-none">
                  {item.shortLabel}
                </span>
                <span className="relative z-10 hidden md:inline">
                  {item.label}
                </span>
              </button>
            )
          })}
        </motion.nav>

        {/* Desktop Command Palette (⌘K) */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="pointer-events-auto hidden md:flex items-center gap-2 shrink-0"
        >
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full glass-card text-xs font-mono text-zinc-300 hover:text-white hover:border-indigo-500/40 transition-all"
            aria-label="Open Command Palette"
          >
            <Command className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-zinc-400">⌘K</span>
          </button>
        </motion.div>
      </div>
    </header>
  )
}
