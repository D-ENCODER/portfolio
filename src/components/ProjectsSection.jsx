import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FolderGit2,
  Github,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  X,
  ArrowUpRight
} from 'lucide-react'

export default function ProjectsSection({ projects }) {
  const categories = ['All', ...new Set(projects.map((p) => p.category))]
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <section id="projects" className="py-16 relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono mb-3">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>01 / SELECTED WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Featured Engineering Projects
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-1.5 max-w-xl">
            Production systems, developer tooling, and interactive applications built from the ground up.
          </p>
        </div>

        {/* Animated Category Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl glass-card self-start">
          {categories.map((cat) => {
            const active = activeCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  active ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="projectCategoryPill"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    className="absolute inset-0 rounded-xl bg-indigo-500/25 border border-indigo-400/30"
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Animated Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.article
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setSelectedProject(project)}
              className="group cursor-pointer glass-card glass-card-hover rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Subtle top gradient wash */}
              <div
                className={`absolute inset-x-0 top-0 h-36 bg-gradient-to-b ${project.accent} pointer-events-none opacity-75 group-hover:opacity-100 transition-opacity`}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-white/5 text-zinc-300 border border-white/10">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      {project.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                        title="View Source on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                        title="Open Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center gap-2">
                  <span>{project.title}</span>
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-indigo-400" />
                </h3>
                <p className="text-xs font-mono text-indigo-300/80 mt-0.5">
                  {project.subtitle}
                </p>

                <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
                  {project.description}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {project.highlights.slice(0, 2).map((point, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-zinc-300 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-zinc-900/90 text-zinc-300 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Expandable Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ type: 'spring', stiffness: 360, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-indigo-500/30 relative overflow-hidden"
            >
              <div
                className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${selectedProject.accent} pointer-events-none`}
              />
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                      {selectedProject.category} • {selectedProject.year}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3">
                      {selectedProject.title}
                    </h3>
                    <p className="text-sm font-mono text-indigo-300 mt-1">
                      {selectedProject.subtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed mt-5">
                  {selectedProject.description}
                </p>

                <div className="mt-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                    Key Architecture & Engineering Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedProject.highlights.map((h, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm text-zinc-200"
                      >
                        <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2.5">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-900 text-zinc-200 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center justify-end gap-3">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card hover:border-indigo-400/40 text-xs font-mono text-zinc-200"
                    >
                      <Github className="w-4 h-4" />
                      <span>Source Code</span>
                    </a>
                  )}
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500 hover:bg-indigo-400 text-xs font-semibold text-white transition-colors"
                    >
                      <span>Live Deployment</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

