import { motion } from 'framer-motion'
import { useRelationshipTime } from '../hooks/useRelationshipTime'

function StatCard({ label, value, unit, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center bg-white/5 rounded-2xl p-4 border border-white/10"
    >
      <span className="text-[#1ED760] font-bold text-3xl tabular-nums leading-none">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-white/50 text-xs mt-1 uppercase tracking-widest">{label}</span>
      {unit && <span className="text-white/30 text-[10px]">{unit}</span>}
    </motion.div>
  )
}

export default function StatsSection() {
  const { years, months, days, hours, seconds, totalDays } = useRelationshipTime()

  return (
    <section className="px-6 py-12 bg-[#121212]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <p className="text-[#1ED760] text-xs font-semibold tracking-widest uppercase mb-2">
          ● Ao vivo
        </p>
        <h2 className="text-white text-2xl font-bold">Nosso Tempo Juntos</h2>
        <p className="text-white/40 text-sm mt-1">desde 04 de junho de 2024</p>
      </motion.div>

      {/* Main counters grid */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <StatCard label="Anos" value={years} delay={0.1} />
        <StatCard label="Meses" value={months} delay={0.2} />
      </div>
      <div className="grid grid-cols-3 gap-3 mb-3">
        <StatCard label="Dias" value={days} delay={0.3} />
        <StatCard label="Horas" value={hours} delay={0.4} />
        <StatCard label="Seg" value={seconds} delay={0.5} />
      </div>

      {/* Total days highlight */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="text-center py-6 mt-4 rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(30,215,96,0.15) 0%, rgba(30,215,96,0.05) 100%)',
          border: '1px solid rgba(30,215,96,0.3)',
        }}
      >
        <span className="text-[#1ED760] font-bold text-5xl tabular-nums">{totalDays}</span>
        <p className="text-white/60 text-sm mt-1">dias de amor e cumplicidade</p>
      </motion.div>

      {/* Special message */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-8 p-6 rounded-2xl relative overflow-hidden"
        style={{
          background: '#1a1a1a',
          border: '1px solid rgba(30,215,96,0.4)',
        }}
      >
        <div
          className="absolute top-0 left-0 w-1 h-full rounded-l-2xl"
          style={{ background: '#1ED760' }}
        />
        <p className="text-white/40 text-xs uppercase tracking-widest mb-3 font-semibold">
          Mensagem especial 💌
        </p>
        <p className="text-white/90 text-base leading-relaxed italic">
          "Cada segundo ao seu lado é o melhor da minha vida. Você é minha música favorita, aquela que eu quero ouvir pra sempre. Te amo, Sara. 💚"
        </p>
        <p className="text-[#1ED760] text-sm mt-3 font-semibold text-right">— Hitalo</p>
      </motion.div>
    </section>
  )
}
