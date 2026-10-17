import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Sparkles,
  FolderGit2,
  Briefcase,
  GraduationCap,
  Code2,
  Film,
  Github,
  Mail,
  ArrowRight,
  X
} from 'lucide-react'

export default function CommandPalette({
  isOpen,
  onClose,
  onNavigate,
  profile,
  projects,
  leetcode,
}) {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (isOpen) setQuery('')
  }, [isOpen])

  const actions = [
    {
      id: 'nav-overview',
      title: 'Go to Overview & Skills',
      category: 'Navigation',
      icon: Sparkles,
      action: () => {
        onNavigate('overview')
        onClose()
      },
    },
    {
      id: 'nav-projects',
      title: `Go to Projects (${projects.length})`,
      category: 'Navigation',
      icon: FolderGit2,
      action: () => {
        onNavigate('projects')
        onClose()
      },
    },
    {
      id: 'nav-experience',
      title: 'Go to Experience Timeline',
      category: 'Navigation',
      icon: Briefcase,
      action: () => {
        onNavigate('experience')
        onClose()
      },
    },
    {
      id: 'nav-education',
      title: 'Go to Education & Completed Courses',
      category: 'Navigation',
      icon: GraduationCap,
      action: () => {
        onNavigate('education')
        onClose()
      },
    },
    {
      id: 'nav-leetcode',
      title: `Go to LeetCode Vault (${leetcode.totalSolved} Solved)`,
      category: 'Navigation',
      icon: Code2,
      action: () => {
        onNavigate('leetcode')
        onClose()
      },
    },
    {
      id: 'nav-hobbies',
      title: 'Go to Movies, Series & Hobbies (CineLog Vault)',
      category: 'Navigation',
      icon: Film,
      action: () => {
        onNavigate('hobbies')
        onClose()
      },
    },
    {
      id: 'ext-github',
      title: 'Open GitHub Profile',
      category: 'Links',
      icon: Github,
      action: () => {
        window.open(profile.socials.github, '_blank')
        onClose()
      },
    },
    {
      id: 'ext-email',
      title: `Send Email (${profile.email})`,
      category: 'Links',
      icon: Mail,
      action: () => {
        window.location.href = `mailto:${profile.email}`
        onClose()
      },
    },
  ]

  const filtered = actions.filter(
    (a) =>
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-start justify-center pt-24 px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card rounded-2xl max-w-lg w-full border border-indigo-500/30 shadow-2xl overflow-hidden"
          >
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10">
              <Search className="w-4 h-4 text-indigo-400 shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to any section, project, or LeetCode vault..."
                className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
              />
              <button
                onClick={onClose}
                className="p-1 rounded-lg text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              {filtered.length === 0 ? (
                <p className="text-center text-xs font-mono text-zinc-500 py-8">
                  No matching commands found.
                </p>
              ) : (
                filtered.map((item) => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left hover:bg-indigo-500/15 group transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/5 group-hover:bg-indigo-500/20 text-zinc-300 group-hover:text-indigo-300 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-200 group-hover:text-white">
                            {item.title}
                          </p>
                          <p className="text-[11px] font-mono text-zinc-500">
                            {item.category}
                          </p>
                        </div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  )
                })
              )}
            </div>

            <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-500">
              <span>Press ESC to close</span>
              <span>⌘K / Ctrl+K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

