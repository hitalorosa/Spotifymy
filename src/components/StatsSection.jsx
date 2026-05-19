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
    <section className="bg-[#0e0e0e]">

      {/* ── Foto do casal ─────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full aspect-[4/3] overflow-hidden relative"
      >
        <img
          src="/images/casal.jpg"
          alt="Hitalo e Sara"
          className="w-full h-full object-cover"
          onError={e => {
            e.target.style.display = 'none'
            e.target.parentElement.style.background =
              'linear-gradient(135deg, #0d3320 0%, #1a5c2e 100%)'
            e.target.parentElement.innerHTML =
              '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:72px">💚</div>'
          }}
        />
        {/* Gradiente de transição para baixo */}
        <div
          className="absolute inset-x-0 bottom-0 h-24"
          style={{ background: 'linear-gradient(to bottom, transparent, #0e0e0e)' }}
        />
      </motion.div>

      {/* ── Título / cabeçalho ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center px-6 pt-2 pb-6"
      >
        <p className="text-white/40 text-xs uppercase tracking-widest mb-1">
          Hitalo e Sara · desde 04/06/2024
        </p>
      </motion.div>

      {/* ── Grid 3 × 2 de contadores ─────────────────────── */}
      <div className="grid grid-cols-3 px-4 pb-2">
        {COUNTERS.map(({ key, label }, i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="flex flex-col items-center py-7"
            style={{
              borderRight:  (i % 3 !== 2) ? '1px solid rgba(255,255,255,0.08)' : 'none',
              borderBottom: (i < 3)       ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}
          >
            <span
              className="font-bold tabular-nums leading-none text-white"
              style={{ fontSize: 'clamp(32px, 10vw, 46px)' }}
            >
              {String(time[key]).padStart(2, '0')}
            </span>
            <span className="text-white/45 text-xs mt-2 font-medium">{label}</span>
          </motion.div>
        ))}
      </div>

      {/* ── Mensagem especial ────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="mx-4 mb-8 mt-4 rounded-2xl overflow-hidden"
        style={{ background: '#1ED760' }}
      >
        <div className="px-6 py-6">
          <p className="text-black font-bold text-base uppercase tracking-wide mb-3">
            Mensagem especial 💌
          </p>
          <p className="text-black/85 text-sm leading-relaxed font-medium italic">
            "Você é o amor da minha vida e a pessoa que me faz querer ser melhor a cada dia. Obrigado por existir e por escolher estar ao meu lado. Te amo, Sara. 💚"
          </p>
          <p className="text-black/70 text-sm mt-3 font-bold text-right">— Hitalo</p>
        </div>
      </motion.div>

    </section>
  )
}
