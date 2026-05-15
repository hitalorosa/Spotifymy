import { motion } from 'framer-motion'

const TIMELINE_EVENTS = [
  { date: '04 Jun 2024', label: 'Nosso começo 💚', photo: '/images/foto3.jpg', rotate: -3 },
  { date: 'Ago 2024', label: 'Primeira aventura juntos', photo: '/images/foto4.jpg', rotate: 2 },
  { date: 'Dez 2024', label: 'Natal especial ❄️', photo: '/images/foto5.jpg', rotate: -2 },
  { date: 'Fev 2025', label: 'Nosso Dia dos Namorados 💝', photo: '/images/foto4.jpg', rotate: 3 },
  { date: '04 Jun 2025', label: '1 ano juntos 🎉', photo: '/images/foto3.jpg', rotate: -1 },
]

function Polaroid({ event, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: event.rotate }}
      transition={{ delay: index * 0.12, duration: 0.5, type: 'spring' }}
      className="flex-shrink-0 w-36"
      style={{
        background: '#fff',
        padding: '8px 8px 32px 8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        borderRadius: 4,
      }}
    >
      <div className="w-full aspect-square bg-gray-200 overflow-hidden rounded-sm mb-2">
        <img
          src={event.photo}
          alt={event.label}
          className="w-full h-full object-cover"
          onError={e => {
            e.target.style.display = 'none'
            e.target.parentElement.style.background =
              'linear-gradient(135deg, #1ED760 0%, #0d3320 100%)'
            e.target.parentElement.innerHTML =
              '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:32px">💚</div>'
          }}
        />
      </div>
      <p className="text-gray-800 text-[10px] font-bold text-center leading-tight px-1">
        {event.label}
      </p>
      <p className="text-gray-400 text-[9px] text-center mt-1">{event.date}</p>
    </motion.div>
  )
}

export default function SlideTimeline() {
  return (
    <div
      className="w-full h-full flex flex-col"
      style={{ background: 'linear-gradient(160deg, #0d1a14 0%, #121212 100%)' }}
    >
      <div className="px-6 pt-16 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[#1ED760] text-xs font-semibold tracking-widest uppercase mb-2">
            Nossa Linha do Tempo
          </p>
          <h2 className="text-white text-2xl font-bold">Momentos que vivemos</h2>
        </motion.div>
      </div>

      {/* Scrollable polaroids */}
      <div className="flex-1 flex items-center px-6 overflow-x-auto gap-5 pb-8"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {TIMELINE_EVENTS.map((event, i) => (
          <div key={i} style={{ scrollSnapAlign: 'center' }}>
            <Polaroid event={event} index={i} />
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="pb-12 flex justify-center items-center gap-2 text-white/30 text-xs"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        deslize para ver mais
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </motion.div>
    </div>
  )
}
