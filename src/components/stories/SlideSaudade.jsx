import { motion } from 'framer-motion'

export default function SlideSaudade() {
  return (
    <div className="w-full h-full relative flex items-end overflow-hidden bg-[#0a0a0a]">
      {/* Background photo */}
      <img
        src="/images/foto2.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        onError={e => {
          e.target.style.display = 'none'
        }}
      />

      {/* Placeholder gradient when no photo */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0d3320 0%, #1a5c2e 40%, #0a0a0a 100%)',
        }}
      />

      {/* Dark overlay at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
        }}
      />

      {/* Decorative heart */}
      <motion.div
        className="absolute top-20 right-8 text-5xl"
        animate={{ scale: [1, 1.15, 1], rotate: [-5, 5, -5] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        💚
      </motion.div>

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="relative z-10 px-8 pb-24 w-full"
      >
        <p className="text-[#1ED760] text-xs font-semibold tracking-widest uppercase mb-4">
          O que sinto
        </p>
        <p className="text-white text-2xl font-bold leading-tight mb-6">
          "Com você eu aprendi que o amor de verdade é aquele que nos faz crescer juntos."
        </p>
        <p className="text-white/60 text-base leading-relaxed">
          Cada momento ao seu lado é uma memória que carrego no peito. Obrigado por existir na minha vida. 💚
        </p>
        <p className="text-[#1ED760] mt-4 font-semibold">— Hitalo</p>
      </motion.div>
    </div>
  )
}
