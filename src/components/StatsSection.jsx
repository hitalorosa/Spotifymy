import { motion } from 'framer-motion'
import { useRelationshipTime } from '../hooks/useRelationshipTime'

const COUNTERS = [
  { key: 'years',   label: 'Anos'     },
  { key: 'months',  label: 'Meses'    },
  { key: 'days',    label: 'Dias'     },
  { key: 'hours',   label: 'Horas'    },
  { key: 'minutes', label: 'Minutos'  },
  { key: 'seconds', label: 'Segundos' },
]

export default function StatsSection() {
  const time = useRelationshipTime()

  return (
    <section className="bg-[#121212]">

      {/* ── Foto do casal ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full overflow-hidden relative"
        style={{ aspectRatio: '4/3' }}
      >
        <img
          src="/images/casal.jpg"
          alt="Hitalo e Sara"
          className="w-full h-full object-cover"
          onError={e => {
            e.target.style.display = 'none'
            const p = e.target.parentElement
            p.style.background = 'linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)'
            p.innerHTML = `
              <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;color:rgba(255,255,255,0.25)">
                <svg width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                <span style="font-size:13px;font-weight:500">A foto de vocês vai ficar aqui</span>
              </div>`
          }}
        />
        {/* fade bottom */}
        <div
          className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #121212)' }}
        />
      </motion.div>

      {/* ── Cabeçalho ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="px-5 pt-1 pb-5"
      >
        <h2 className="text-white font-bold text-2xl leading-tight">Hitalo e Sara</h2>
        <p className="text-white/45 text-sm mt-0.5">Juntos desde 2024</p>
      </motion.div>

      {/* ── Grid 3×2 de contadores ────────────────────── */}
      <div className="grid grid-cols-3 gap-3 px-5 pb-5">
        {COUNTERS.map(({ key, label }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="flex flex-col items-center justify-center py-5 rounded-2xl"
            style={{ background: '#1c1c1e' }}
          >
            <span
              className="font-bold tabular-nums leading-none text-white"
              style={{ fontSize: 'clamp(28px, 9vw, 40px)' }}
            >
              {String(time[key]).padStart(2, '0')}
            </span>
            <span className="text-white/45 text-xs mt-2 font-medium">{label}</span>
          </motion.div>
        ))}
      </div>

      {/* ── Mensagem especial ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.1 }}
        className="mx-5 mb-6 rounded-2xl overflow-hidden"
        style={{ background: '#e03131' }}
      >
        <div className="px-5 py-5">
          <p className="text-white font-bold text-sm mb-3">Mensagem especial</p>
          <p className="text-white font-bold leading-snug"
             style={{ fontSize: 'clamp(18px, 5.5vw, 22px)' }}>
            "Você é o amor da minha vida e a pessoa que me faz querer ser melhor a cada dia. Te amo, Sara. 💚"
          </p>
        </div>
      </motion.div>

    </section>
  )
}
