import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GraduationCap,
  Award,
  BookOpen,
  ExternalLink,
  FileText,
  Github,
  Sparkles,
  CheckCircle2
} from 'lucide-react'

export default function EducationCoursesSection({
  education,
  courses,
  specializations = [],
}) {
  const categories = ['All', ...new Set(courses.map((c) => c.category))]
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredCourses =
    selectedCategory === 'All'
      ? courses
      : courses.filter((c) => c.category === selectedCategory)

  return (
    <section id="education" className="py-16 relative space-y-14">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-3">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>03 / ACADEMICS & CONTINUOUS LEARNING</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
          Education & Coursera Certifications
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-1.5 max-w-2xl">
          Academic Computer Science degrees paired with {courses.length} completed Coursera courses across Google, IBM, and UC San Diego.
        </p>
      </div>

      {/* Formal Education Cards */}
      <div className="space-y-5">
        {education.map((edu) => (
          <motion.div
            key={edu.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 relative overflow-hidden"
          >
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-white/5">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-500/25">
                    {edu.period}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/25">
                    {edu.gpa}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white mt-3">
                  {edu.degree}
                </h3>
                <p className="text-base text-cyan-300 font-medium mt-0.5">
                  {edu.institution}
                </p>
              </div>

              <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/10 self-start lg:self-center">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-xs sm:text-sm text-zinc-200 font-medium">
                  {edu.honors}
                </span>
              </div>
            </div>

            <div className="relative z-10 mt-6">
              <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                Core University Coursework
              </p>
              <div className="flex flex-wrap gap-2">
                {edu.coursework.map((cw) => (
                  <span
                    key={cw}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-900/90 text-zinc-200 border border-white/5"
                  >
                    {cw}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Professional Certificate Specialization Spotlight */}
      {specializations.length > 0 && (
        <div className="space-y-4">
          {specializations.map((spec) => (
            <div
              key={spec.id}
              className="glass-card rounded-3xl p-6 sm:p-7 border border-amber-500/25 bg-gradient-to-r from-amber-500/10 via-indigo-500/5 to-transparent flex flex-col lg:flex-row lg:items-center justify-between gap-5"
            >
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 text-xs font-mono text-amber-300">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>PROFESSIONAL CERTIFICATE SPECIALIZATION • ID: {spec.credentialId}</span>
                </div>
                <h4 className="text-xl font-bold text-white">{spec.title}</h4>
                <p className="text-xs sm:text-sm text-zinc-300">
                  {spec.provider} — Completed all 6 courses & hands-on Qwiklabs assessments.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <a
                  href={spec.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-400/30 text-xs font-mono text-amber-200 transition-colors"
                >
                  <span>Verify Specialization</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <a
                  href={spec.certificatePdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-card hover:border-emerald-400/40 text-xs font-mono text-emerald-300 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Certificate PDF</span>
                </a>
                <a
                  href={spec.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full glass-card hover:border-indigo-400/40 text-xs font-mono text-zinc-200 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Solutions Repo</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completed Courses & Certifications Sub-section */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              All {courses.length} Completed Coursera Courses
            </h3>
          </div>

          {/* Course Category Filter */}
          <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl glass-card self-start">
            {categories.map((cat) => {
              const active = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                    active ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="courseCategoryPill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 rounded-xl bg-cyan-500/20 border border-cyan-400/30"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              )
            })}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course, idx) => (
              <motion.div
                layout
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      {course.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {course.date}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {course.title}
                  </h4>
                  <p className="text-xs font-mono text-zinc-400 mt-1 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{course.provider}</span>
                  </p>

                  <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
                    {course.notes}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/5 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {course.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-900 text-zinc-300 border border-white/5"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    {course.credentialUrl && course.credentialUrl !== '#' && (
                      <a
                        href={course.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        <span>
                          {course.date.startsWith('ID:') ? 'Verify ID' : 'Course Link'}
                        </span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                    {course.certificatePdfUrl && (
                      <a
                        href={course.certificatePdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors"
                      >
                        <FileText className="w-3 h-3" />
                        <span>Certificate PDF</span>
                      </a>
                    )}
                    {course.repoUrl && (
                      <a
                        href={course.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
                      >
                        <Github className="w-3 h-3" />
                        <span>Labs & Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
