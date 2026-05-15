import { motion } from 'framer-motion'
import { useRelationshipTime } from '../../hooks/useRelationshipTime'

export default function SlideStats() {
  const { totalHours, totalDays } = useRelationshipTime()

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center px-8 relative"
      style={{ background: 'linear-gradient(160deg, #0a2e17 0%, #121212 70%)' }}
    >
      {/* Decorative rings */}
      <div
        className="absolute w-72 h-72 rounded-full opacity-10"
        style={{ border: '2px solid #1ED760' }}
      />
      <div
        className="absolute w-52 h-52 rounded-full opacity-20"
        style={{ border: '2px solid #1ED760' }}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center z-10"
      >
        <p className="text-[#1ED760] text-xs font-semibold tracking-widest uppercase mb-6">
          Nossas Estatísticas
        </p>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
        >
          <span className="text-[#1ED760] font-bold leading-none"
            style={{ fontSize: 'clamp(56px, 18vw, 80px)' }}
          >
            {totalHours.toLocaleString('pt-BR')}
          </span>
          <p className="text-white text-xl font-semibold mt-2">
            horas que passamos juntos
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-2 gap-4">
          {[
            { label: 'Dias juntos', value: totalDays.toLocaleString('pt-BR') },
            { label: 'Sorrisos', value: '∞' },
            { label: 'Aventuras', value: '+ de 50' },
            { label: 'Amor', value: '100%' },
          ].map(({ label, value }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="rounded-xl p-4 text-center"
              style={{ background: 'rgba(30,215,96,0.1)', border: '1px solid rgba(30,215,96,0.2)' }}
            >
              <p className="text-white font-bold text-xl">{value}</p>
              <p className="text-white/50 text-xs mt-1">{label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
