import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SlideIntro from './SlideIntro'
import SlideStats from './SlideStats'
import SlideSaudade from './SlideSaudade'
import SlideTimeline from './SlideTimeline'
import SlideWordle from './SlideWordle'
import SlideFinal from './SlideFinal'

const SLIDES = [SlideIntro, SlideStats, SlideSaudade, SlideTimeline, SlideWordle, SlideFinal]
const SLIDE_DURATION = 8000 // ms por slide automático (apenas para barra visual)

export default function StoriesContainer({ onClose }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const touchStartX = useRef(null)

  function go(idx) {
    if (idx < 0) return
    if (idx >= SLIDES.length) { onClose(); return }
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (delta < -50) go(current + 1)
    else if (delta > 50) go(current - 1)
    touchStartX.current = null
  }

  function handleTap(e) {
    const x = e.clientX
    const mid = window.innerWidth / 2
    if (x < mid) go(current - 1)
    else go(current + 1)
  }

  const SlideComponent = SLIDES[current]

  const variants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black flex flex-col"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Progress bars */}
      <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-3 pt-safe">
        {SLIDES.map((_, i) => (
          <div key={i} className="flex-1 h-0.5 rounded-full bg-white/30 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: i < current ? '100%' : i === current ? '60%' : '0%',
                background: '#1ED760',
              }}
            />
          </div>
        ))}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-7 right-4 z-20 text-white/80 hover:text-white p-2"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Slide area */}
      <div className="flex-1 relative overflow-hidden" onClick={handleTap}>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <SlideComponent onNext={() => go(current + 1)} onClose={onClose} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation arrows (desktop) */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none">
        {current > 0 && (
          <button
            className="pointer-events-auto text-white/40 hover:text-white/80 p-2"
            onClick={e => { e.stopPropagation(); go(current - 1) }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
        <div className="flex-1" />
        {current < SLIDES.length - 1 && (
          <button
            className="pointer-events-auto text-white/40 hover:text-white/80 p-2"
            onClick={e => { e.stopPropagation(); go(current + 1) }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
