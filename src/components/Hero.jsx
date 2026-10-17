import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  MapPin,
  Terminal,
  Github,
  Linkedin,
  Code2,
  Mail,
  FileDown,
  Phone,
  ChevronRight,
  Film,
  Briefcase,
  GraduationCap
} from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

export default function Hero({ profile, leetcode, hobbies, onNavigate }) {
  return (
    <section id="overview" className="relative pt-28 sm:pt-28 lg:pt-32 pb-12 sm:pb-16">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 sm:space-y-8"
      >
        {/* Top Hero Bento Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Primary Intro Card */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-8 glass-card glass-card-hover rounded-3xl p-5 sm:p-8 lg:p-10 relative overflow-hidden group min-w-0"
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/25 transition-all duration-700" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between h-full space-y-6 min-w-0">
              <div className="flex flex-wrap items-center gap-2 max-w-full min-w-0">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 sm:py-1 rounded-2xl sm:rounded-full text-[11px] sm:text-xs font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 max-w-full min-w-0">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="whitespace-normal sm:whitespace-nowrap leading-snug break-words text-left">
                    {profile.availability}
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono bg-white/5 text-zinc-300 border border-white/10 max-w-full">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span className="truncate">{profile.location}</span>
                </span>
                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-mono bg-white/5 text-zinc-400 hover:text-white border border-white/10 transition-colors max-w-full"
                  >
                    <Phone className="w-3 h-3 text-indigo-400 shrink-0" />
                    <span className="truncate">{profile.phone}</span>
                  </a>
                )}
              </div>

              <div className="space-y-3 min-w-0">
                <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-indigo-400 break-words">
                  {profile.role}
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
                  Hi, I’m{' '}
                  <span className="bg-gradient-to-r from-white via-indigo-200 to-indigo-400 bg-clip-text text-transparent">
                    {profile.name}
                  </span>
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-zinc-400 max-w-2xl leading-relaxed">
                  {profile.tagline}
                </p>
              </div>

              {/* Action Buttons & Socials */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    onClick={() => onNavigate('projects')}
                    className="group/btn inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-white text-zinc-950 font-semibold text-xs sm:text-sm hover:bg-indigo-50 transition-all shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                  >
                    <span>Explore Projects</span>
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>

                  {profile.resumeUrl && (
                    <a
                      href={profile.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      download="Het_Joshi_Resume.pdf"
                      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-indigo-500/15 hover:bg-indigo-500/25 border border-indigo-400/30 text-indigo-200 font-medium text-xs sm:text-sm transition-all"
                    >
                      <FileDown className="w-4 h-4 text-indigo-400" />
                      <span>Resume PDF</span>
                    </a>
                  )}

                  <button
                    onClick={() => onNavigate('leetcode')}
                    className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full glass-card hover:border-indigo-400/40 text-zinc-200 font-medium text-xs sm:text-sm transition-all"
                  >
                    <Code2 className="w-4 h-4 text-amber-400" />
                    <span>LeetCode Vault</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={profile.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    title="GitHub (@D-ENCODER)"
                    className="p-2.5 rounded-full glass-card text-zinc-400 hover:text-white hover:border-indigo-400/40 transition-all"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a
                    href={profile.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    title="LinkedIn (het-joshi)"
                    className="p-2.5 rounded-full glass-card text-zinc-400 hover:text-white hover:border-indigo-400/40 transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    aria-label="Email"
                    title={profile.email}
                    className="p-2.5 rounded-full glass-card text-zinc-400 hover:text-white hover:border-indigo-400/40 transition-all"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Live LeetCode Pulse & Metrics */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 flex flex-col gap-5 min-w-0"
          >
            {/* Quick LeetCode Spotlight Bento */}
            <div
              onClick={() => onNavigate('leetcode')}
              className="cursor-pointer glass-card glass-card-hover rounded-3xl p-5 sm:p-6 relative overflow-hidden group flex-1 flex flex-col justify-between min-w-0"
            >
              <div className="absolute -right-10 -top-10 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all" />
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
                    <Code2 className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-mono uppercase tracking-wider text-zinc-400 truncate">
                      D-ENCODER / leetcode-challenges
                    </p>
                    <p className="text-sm font-semibold text-white truncate">
                      Live GitHub Solution Vault
                    </p>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0" />
              </div>

              <div className="my-4 flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <span className="text-3xl font-extrabold text-white font-mono">
                    {leetcode.totalSolved}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono ml-1.5">
                    problems solved
                  </span>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {leetcode.globalRanking}
                </span>
              </div>

              {/* Mini segmented difficulty bar */}
              <div className="space-y-2">
                <div className="h-2 w-full rounded-full bg-zinc-800/90 overflow-hidden flex gap-0.5 p-0.5">
                  <div
                    style={{ width: `${(leetcode.difficulty.easy.solved / leetcode.totalSolved) * 100}%` }}
                    className="bg-emerald-400 rounded-l-full"
                  />
                  <div
                    style={{ width: `${(leetcode.difficulty.medium.solved / leetcode.totalSolved) * 100}%` }}
                    className="bg-amber-400"
                  />
                  <div
                    style={{ width: `${(leetcode.difficulty.hard.solved / leetcode.totalSolved) * 100}%` }}
                    className="bg-rose-500 rounded-r-full"
                  />
                </div>
                <div className="flex justify-between text-[11px] font-mono text-zinc-400">
                  <span className="text-emerald-400">Easy: {leetcode.difficulty.easy.solved}</span>
                  <span className="text-amber-400">Med: {leetcode.difficulty.medium.solved}</span>
                  <span className="text-rose-400">Hard: {leetcode.difficulty.hard.solved}</span>
                </div>
              </div>
            </div>

            {/* 2x2 Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-3.5">
              {profile.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-4 border border-white/5 hover:border-white/15 transition-all min-w-0"
                >
                  <p className="text-xl sm:text-2xl font-bold text-white font-mono truncate">{m.value}</p>
                  <p className="text-xs text-zinc-400 mt-0.5 truncate">{m.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Middle Bento Row: Technical Arsenal */}
        <motion.div
          variants={itemVariants}
          className="glass-card rounded-3xl p-5 sm:p-8"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-indigo-400 shrink-0" />
              <h2 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-300">
                Technical Stack & Core Competencies
              </h2>
            </div>
            <span className="text-xs font-mono text-zinc-500 hidden sm:inline">
              {profile.handle} • {profile.email}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {profile.skills.map((group) => (
              <div
                key={group.category}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:border-indigo-500/25 transition-colors"
              >
                <p className="text-xs font-mono uppercase tracking-wider text-indigo-400 mb-3">
                  {group.category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-900/90 text-zinc-300 border border-white/5 hover:border-indigo-400/30 hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Interactive Slide Cards: Experience, Education, and Hobbies/CineLog */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5"
        >
          {/* Experience Quick Slide Card */}
          <div
            onClick={() => onNavigate('experience')}
            className="cursor-pointer glass-card glass-card-hover rounded-3xl p-5 sm:p-6 group flex flex-col justify-between gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Briefcase className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-indigo-400">
                Career & Recommendation
              </p>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                SaskTel & U of R Experience
              </h3>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                PostgreSQL, Docker, K8s & NetBox fiber modeling + verified LinkedIn recommendation.
              </p>
            </div>
          </div>

          {/* Education & 19 Coursera Courses Quick Slide Card */}
          <div
            onClick={() => onNavigate('education')}
            className="cursor-pointer glass-card glass-card-hover rounded-3xl p-5 sm:p-6 group flex flex-col justify-between gap-4"
          >
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <GraduationCap className="w-4 h-4" />
              </div>
              <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Degrees & 19 Certifications
              </p>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                U of R B.Sc. CS & Coursera
              </h3>
              <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                CS 320/421 AI, CS 476 Capstone, State Hackathon 1st Prize & 19 verified Coursera IDs.
              </p>
            </div>
          </div>

          {/* Hobbies & CineLog Watchlist Quick Slide Card */}
          {hobbies && (
            <div
              onClick={() => onNavigate('hobbies')}
              className="cursor-pointer glass-card glass-card-hover rounded-3xl p-5 sm:p-6 group flex flex-col justify-between gap-4 relative overflow-hidden"
            >
              <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition-all pointer-events-none" />
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                  <Film className="w-4 h-4" />
                </div>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-purple-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-purple-400">
                  Beyond the Terminal
                </p>
                <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                  Movies, Series & Hobbies
                </h3>
                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                  {(hobbies.mediaStats && hobbies.mediaStats[0]?.value) || '318'} Movies • {(hobbies.mediaStats && hobbies.mediaStats[1]?.value) || '148'} Series/Anime • Personal Tonkatsu Box Vault.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </section>
  )
}
