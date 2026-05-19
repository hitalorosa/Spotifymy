import { motion } from 'framer-motion'

const CONQUISTAS = [
  { icon: '🎉', label: 'Primeiro beijo' },
  { icon: '🔥', label: 'Paixão'         },
  { icon: '∞',  label: 'Para sempre'    },
  { icon: '🎯', label: 'Cumplicidade'   },
]

// Fita 3D abstrata feita só com CSS + SVG — sem imagem externa
function AbstractArt({ flip = false }) {
  return (
    <svg
      viewBox="0 0 320 120"
      className="w-full"
      style={{ transform: flip ? 'scaleY(-1)' : undefined }}
      aria-hidden
    >
      <defs>
        <linearGradient id={flip ? 'gf' : 'g1'} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#ff6b9d" />
          <stop offset="50%"  stopColor="#ff2d55" />
          <stop offset="100%" stopColor="#c0392b" />
        </linearGradient>
        <filter id="blur1">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      {/* Fita principal */}
      <path
        d="M-10 60 Q60 20 130 55 Q200 90 270 40 Q310 20 340 50"
        fill="none"
        stroke={`url(#${flip ? 'gf' : 'g1'})`}
        strokeWidth="28"
        strokeLinecap="round"
        opacity="0.9"
      />
      {/* Borda brilhante */}
      <path
        d="M-10 60 Q60 20 130 55 Q200 90 270 40 Q310 20 340 50"
        fill="none"
        stroke="rgba(255,180,200,0.6)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Sombra difusa */}
      <path
        d="M-10 65 Q60 25 130 60 Q200 95 270 45 Q310 25 340 55"
        fill="none"
        stroke="rgba(200,0,50,0.35)"
        strokeWidth="36"
        strokeLinecap="round"
        filter="url(#blur1)"
      />
    </svg>
  )
}

export default function RetrospectiveButton({ onClick }) {
  return (
    <section className="bg-[#121212] px-5 pb-14">

      {/* ── Conquistas ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-5"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-white font-bold text-base">Conquistas</span>
          <span className="text-white/40 text-xs bg-white/8 px-2 py-1 rounded-full">
            4 / 30
          </span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          {CONQUISTAS.map(({ icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.7 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 250 }}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="w-full aspect-square flex items-center justify-center rounded-2xl text-xl"
                style={{
                  background: 'rgba(88,86,214,0.18)',
                  border: '1.5px solid rgba(88,86,214,0.5)',
                }}
              >
                {icon}
              </div>
              <span className="text-white/40 text-[9px] text-center leading-tight">{label}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ── Card da Retrospectiva ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl overflow-hidden relative"
        style={{ background: '#000' }}
      >
        {/* Arte abstrata topo */}
        <div className="w-full" style={{ marginBottom: '-8px' }}>
          <AbstractArt />
        </div>

        {/* Texto central */}
        <div className="px-6 py-4 text-center">
          <h2 className="text-white font-bold text-2xl leading-tight mb-1">
            Sua Retrospectiva
          </h2>
          <p className="text-white/50 text-sm">Explore o seu tempo de casal</p>
        </div>

        {/* Arte abstrata fundo (invertida) */}
        <div className="w-full" style={{ marginTop: '-8px' }}>
          <AbstractArt flip />
        </div>

        {/* Botão "Vamos lá" */}
        <div className="flex justify-center pb-8 pt-2">
          <motion.button
            onClick={onClick}
            whileTap={{ scale: 0.94 }}
            className="px-10 py-3.5 rounded-full font-bold text-white text-base"
            style={{
              background: 'linear-gradient(135deg, #2dd4bf 0%, #0891b2 100%)',
              boxShadow: '0 4px 24px rgba(45,212,191,0.35)',
            }}
          >
            Vamos lá
          </motion.button>
        </div>
      </motion.div>

    </section>
  )
}
