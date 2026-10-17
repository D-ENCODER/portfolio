import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import tonkatsuData from '../data/tonkatsuData.json'
import {
  Film,
  Tv,
  Star,
  Clock,
  Play,
  Compass,
  Github,
  BarChart3,
  Heart,
  Search,
  Gamepad2
} from 'lucide-react'

const accentClasses = {
  indigo: {
    glow: 'from-indigo-500/15 to-transparent',
    icon: 'text-indigo-400',
  },
  purple: {
    glow: 'from-purple-500/15 to-transparent',
    icon: 'text-purple-400',
  },
  emerald: {
    glow: 'from-emerald-500/15 to-transparent',
    icon: 'text-emerald-400',
  },
  amber: {
    glow: 'from-amber-500/15 to-transparent',
    icon: 'text-amber-400',
  },
}

export default function HobbiesSection({ hobbies }) {
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const hallOfFameItems = tonkatsuData?.topRated || tonkatsuData?.items || []
  const topGenres = tonkatsuData?.topGenres || []
  const currentlyWatching = (tonkatsuData?.currentlyWatching || []).slice(0, 6)

  const filteredTopRated = useMemo(() => {
    return hallOfFameItems.filter((item) => {
      const matchesCat =
        categoryFilter === 'All' || item.category === categoryFilter
      const q = searchQuery.trim().toLowerCase()
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        (item.genres || []).some((g) => g.toLowerCase().includes(q)) ||
        (item.year && String(item.year).includes(q))
      return matchesCat && matchesSearch
    })
  }, [hallOfFameItems, categoryFilter, searchQuery])

  return (
    <section id="hobbies" className="py-12 sm:py-16 scroll-mt-24">
      <div className="space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
                <Film className="w-3.5 h-3.5" />
                <span>Tonkatsu Box • {tonkatsuData.totalItems} Tracked Titles</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Docker Synced
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              {hobbies?.headline || 'Tonkatsu Box — Cinema, Series, Anime & Gaming Vault'}
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-2xl">
              {hobbies?.subheadline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
            {hobbies?.cineLogRepo && (
              <a
                href={hobbies.cineLogRepo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-xs font-mono text-zinc-300 hover:text-white hover:border-purple-400/40 transition-all"
              >
                <Github className="w-3.5 h-3.5 text-purple-400" />
                <span>CineLog C++ Repo</span>
              </a>
            )}
          </div>
        </div>

        {/* Top 4 Media Stats Bento */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
          {(hobbies?.mediaStats || []).map((stat, idx) => {
            const style = accentClasses[stat.accent] || accentClasses.indigo
            const StatIcon =
              idx === 0 ? Film : idx === 1 ? Tv : idx === 2 ? Clock : Gamepad2
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="glass-card glass-card-hover rounded-3xl p-4 sm:p-6 relative overflow-hidden min-w-0"
              >
                <div
                  className={`absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-bl ${style.glow} rounded-full blur-2xl pointer-events-none`}
                />
                <div className="relative z-10 flex flex-col justify-between h-full space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-zinc-400 truncate">
                      {stat.label}
                    </span>
                    <StatIcon className={`w-4 h-4 shrink-0 ${style.icon}`} />
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                      {stat.value}
                    </p>
                    <p className="text-[11px] sm:text-xs text-zinc-500 mt-1 truncate">
                      {stat.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Middle Row: Real Genre Affinity Bars & Real Currently Watching Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Genre Affinity */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-5 sm:p-7 flex flex-col justify-between min-w-0">
            <div className="flex items-center justify-between gap-2 mb-5">
              <div className="flex items-center gap-2.5">
                <BarChart3 className="w-4 h-4 text-indigo-400 shrink-0" />
                <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-300">
                  Top Genres Across 466 Completed Titles
                </h3>
              </div>
            </div>

            <div className="space-y-3.5">
              {topGenres.slice(0, 6).map((g, idx) => (
                <div key={g.genre} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs gap-2">
                    <span className="text-zinc-200 font-medium truncate">
                      {g.genre}
                    </span>
                    <span className="text-indigo-400 font-mono text-[11px] shrink-0">
                      {g.count}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-zinc-900 overflow-hidden p-0.5 border border-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${g.share}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: idx * 0.06 }}
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Currently Watching Queue (from Tonkatsu Box watched_episodes) */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-5 sm:p-7 flex flex-col justify-between min-w-0">
            <div className="flex items-center justify-between gap-2 mb-5">
              <div className="flex items-center gap-2.5">
                <Play className="w-4 h-4 text-emerald-400 shrink-0" />
                <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-300">
                  Currently Watching Rotation (Live Episode Progress)
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Queue
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentlyWatching.map((item) => {
                const watched = item.episodesWatched || 0
                const total = item.totalEpisodes || 1
                const pct = Math.min(100, Math.round((watched / total) * 100))
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/25 transition-all flex items-center gap-3 min-w-0"
                  >
                    {item.posterUrl ? (
                      <img
                        src={item.posterUrl}
                        alt={item.title}
                        loading="lazy"
                        className="w-11 h-16 rounded-lg object-cover shrink-0 border border-white/10"
                      />
                    ) : (
                      <div className="w-11 h-16 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                        <Tv className="w-4 h-4 text-zinc-500" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex items-center justify-between gap-1.5">
                        <p className="text-xs sm:text-sm font-semibold text-white truncate">
                          {item.title}
                        </p>
                        {item.userRating && (
                          <span className="inline-flex items-center gap-0.5 text-[11px] font-mono text-amber-300 shrink-0">
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                            {item.userRating}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                        <span className="truncate">{item.year}</span>
                        <span className="text-emerald-300">
                          {watched}/{total} eps ({pct}%)
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-zinc-900 overflow-hidden">
                        <div
                          style={{ width: `${pct}%` }}
                          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                        />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* 10/10 & Top Rated Hall of Fame */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-rose-400 shrink-0" />
              <h3 className="text-lg sm:text-xl font-bold text-white">
                10/10 & Top Rated Hall of Fame ({filteredTopRated.length})
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {['All', 'Movie', 'Anime & Animation', 'TV Series', 'Manga'].map(
                (cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                      categoryFilter === cat
                        ? 'bg-indigo-500/25 text-white border border-indigo-400/40'
                        : 'glass-card text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {cat === 'Anime & Animation' ? 'Anime' : cat}
                  </button>
                )
              )}

              <div className="relative w-full sm:w-56">
                <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter top rated..."
                  className="w-full pl-9 pr-4 py-1.5 rounded-full glass-card text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-400/50"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredTopRated.map((item) => (
              <div
                key={item.id}
                className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col justify-between group border border-white/10"
              >
                <div className="relative aspect-[2/3] bg-zinc-900 overflow-hidden">
                  {item.posterUrl ? (
                    <img
                      src={item.posterUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-4 text-center text-xs text-zinc-500">
                      {item.title}
                    </div>
                  )}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between gap-1">
                    <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[10px] font-mono text-zinc-200 border border-white/10 truncate">
                      {item.category === 'Anime & Animation'
                        ? 'Anime'
                        : item.category}
                    </span>
                    {item.userRating ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/90 text-zinc-950 font-mono font-bold text-[11px] shadow-lg">
                        <Star className="w-2.5 h-2.5 fill-zinc-950" />
                        {item.userRating}/10
                      </span>
                    ) : (
                      item.isFavorite && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-rose-500/90 text-white font-mono font-bold text-[10px]">
                          ★ FAV
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="p-3 space-y-1">
                  <p className="text-xs sm:text-sm font-bold text-white truncate">
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span>{item.year || 'Classic'}</span>
                    {item.genres && item.genres[0] && (
                      <span className="text-zinc-500 truncate max-w-[90px]">
                        {item.genres[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Personal Hobbies & Interests */}
        {hobbies?.otherInterests && hobbies.otherInterests.length > 0 && (
          <div className="glass-card rounded-3xl p-5 sm:p-8 space-y-5">
            <div className="flex items-center gap-2.5">
              <Compass className="w-4 h-4 text-indigo-400 shrink-0" />
              <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-zinc-300">
                Off-Clock Pursuits & Creative Interests
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {hobbies.otherInterests.map((interest) => (
                <div
                  key={interest.title}
                  className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-indigo-500/25 transition-colors space-y-2"
                >
                  <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400">
                    {interest.category}
                  </span>
                  <h4 className="text-base font-bold text-white">
                    {interest.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {interest.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
