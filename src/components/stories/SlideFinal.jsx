import { motion } from 'framer-motion'
import { useRelationshipTime } from '../../hooks/useRelationshipTime'

export default function SlideFinal({ onClose }) {
  const { totalDays } = useRelationshipTime()

  function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: 'Hitalo & Sara 💚',
        text: `${totalDays} dias de uma história linda!`,
        url: window.location.href,
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link copiado! 💚')
      })
    }
  }

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center px-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #071a0e 0%, #0d3320 40%, #121212 100%)' }}
    >
      {/* Animated rings */}
      {[200, 280, 360].map((size, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: size,
            height: size,
            border: '1px solid rgba(30,215,96,0.15)',
          }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
        />
      ))}

      {/* Animated heart */}
      <motion.div
        className="text-6xl mb-6 z-10"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        💚
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
        className="text-center z-10 mb-8"
      >
        <p className="text-[#1ED760] text-xs font-semibold tracking-widest uppercase mb-4">
          Nossa Conexão
        </p>
        <h1 className="text-white font-bold text-4xl leading-tight mb-4">
          Hitalo &amp; Sara
        </h1>

        {/* Days counter */}
        <div
          className="mx-auto py-4 px-8 rounded-2xl mb-4"
          style={{ background: 'rgba(30,215,96,0.1)', border: '1px solid rgba(30,215,96,0.3)' }}
        >
          <span className="text-[#1ED760] font-bold text-5xl">{totalDays}</span>
          <p className="text-white/60 text-sm mt-1">dias de amor</p>
        </div>

        <p className="text-white/50 text-sm">desde 04 de junho de 2024</p>

        <p className="text-white text-lg mt-6 leading-relaxed italic">
          "E que venham muitos mais..."
        </p>
        <p className="text-[#1ED760] font-semibold mt-2">— Hitalo 💚</p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col gap-3 w-full max-w-xs z-10"
      >
        <button
          onClick={handleShare}
          className="w-full py-4 rounded-full font-bold text-black text-base"
          style={{ background: '#1ED760' }}
        >
          Compartilhar 💚
        </button>
        <button
          onClick={onClose}
          className="w-full py-4 rounded-full font-bold text-white text-base"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
        >
          Fechar
        </button>
      </motion.div>
    </div>
  )
}
