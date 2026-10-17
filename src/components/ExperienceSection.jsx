import React from 'react'
import { motion } from 'framer-motion'
import {
  Briefcase,
  MapPin,
  Calendar,
  ChevronRight,
  Quote,
  Linkedin,
  ExternalLink
} from 'lucide-react'

export default function ExperienceSection({ experience, testimonials = [] }) {
  return (
    <section id="experience" className="py-12 sm:py-16 relative space-y-12">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-3">
          <Briefcase className="w-3.5 h-3.5" />
          <span>02 / CAREER TRAJECTORY</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
          Professional Experience
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-1.5 max-w-xl">
          Impact-driven engineering across core optical network automation, full-stack infrastructure, and campus IT operations.
        </p>
      </div>

      {/* Featured LinkedIn Endorsement / Recommendation Card */}
      {testimonials.length > 0 && (
        <div className="space-y-4">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card glass-card-hover rounded-3xl p-6 sm:p-8 border border-indigo-500/30 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent relative overflow-hidden"
            >
              <Quote className="w-16 h-16 text-indigo-400/10 absolute right-6 top-6 pointer-events-none" />
              <div className="relative z-10 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 text-xs font-mono">
                  <Linkedin className="w-3.5 h-3.5 text-indigo-400" />
                  <span>VERIFIED LINKEDIN RECOMMENDATION</span>
                </div>

                <blockquote className="text-sm sm:text-base lg:text-lg text-zinc-200 leading-relaxed italic">
                  “{t.quote}”
                </blockquote>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-white/10">
                  <div>
                    <p className="text-base font-bold text-white">{t.author}</p>
                    <p className="text-xs sm:text-sm font-mono text-indigo-300">
                      {t.role}
                    </p>
                  </div>

                  {t.linkedinUrl && (
                    <a
                      href={t.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-indigo-500/20 border border-white/10 hover:border-indigo-400/40 text-xs font-mono text-zinc-200 hover:text-white transition-all"
                    >
                      <Linkedin className="w-3.5 h-3.5 text-indigo-400" />
                      <span>View {t.author} on LinkedIn</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Experience Timeline */}
      <div className="relative pl-5 sm:pl-8 border-l border-white/10 space-y-8">
        {experience.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: idx * 0.08 }}
            className="relative group"
          >
            {/* Glowing Timeline Node */}
            <span className="absolute -left-[27px] sm:-left-[39px] top-6 w-3.5 h-3.5 rounded-full bg-zinc-900 border-2 border-indigo-400 group-hover:scale-125 group-hover:bg-indigo-400 transition-all shadow-[0_0_12px_rgba(99,102,241,0.6)]" />

            <div className="glass-card glass-card-hover rounded-3xl p-5 sm:p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/5">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      {item.role}
                    </h3>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/25">
                      {item.type}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-indigo-300 mt-1">
                    {item.company}
                  </p>
                </div>

                <div className="flex flex-col sm:items-end text-xs font-mono text-zinc-400 gap-1">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    {item.period}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-zinc-500">
                    <MapPin className="w-3.5 h-3.5" />
                    {item.location}
                  </span>
                </div>
              </div>

              <p className="text-sm text-zinc-300 mt-4 leading-relaxed">
                {item.summary}
              </p>

              <ul className="mt-4 space-y-2.5">
                {item.achievements.map((ach, i) => (
                  <li
                    key={i}
                    className="text-xs sm:text-sm text-zinc-400 flex items-start gap-2"
                  >
                    <ChevronRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{ach}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-white/5">
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-900/80 text-zinc-300 border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
