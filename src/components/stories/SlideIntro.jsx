import { motion } from 'framer-motion'

export default function SlideIntro() {
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0d3320 0%, #121212 60%)' }}
    >
      {/* Floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 8 + 4,
            height: Math.random() * 8 + 4,
            background: '#1ED760',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      {/* Photo */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'backOut' }}
        className="w-48 h-48 rounded-full overflow-hidden border-4 mb-8 shadow-2xl"
        style={{ borderColor: '#1ED760', boxShadow: '0 0 40px rgba(30,215,96,0.4)' }}
      >
        <img
          src="/images/foto1.jpg"
          alt="Nós"
          className="w-full h-full object-cover"
          onError={e => {
            e.target.style.display = 'none'
            e.target.parentElement.style.background =
              'linear-gradient(135deg, #1ED760 0%, #0d3320 100%)'
            e.target.parentElement.innerHTML =
              '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:60px">💚</div>'
          }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-center px-8"
      >
        <p className="text-[#1ED760] text-xs font-semibold tracking-widest uppercase mb-3">
          Nossa Retrospectiva
        </p>
        <h1 className="text-white font-bold text-4xl leading-tight mb-3">
          Hitalo<br />&amp; Sara
        </h1>
        <p className="text-white/60 text-lg">Nossos Momentos 💚</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="absolute bottom-16 flex flex-col items-center text-white/30"
      >
        <p className="text-xs mb-2">Toque para avançar</p>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </motion.div>
    </div>
  )
}
