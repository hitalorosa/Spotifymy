import { useRelationshipTime } from '../hooks/useRelationshipTime'

const START_DATE = new Date('2024-06-04T00:00:00')

// Calcula progresso da barra: percentual de 2 anos completos
function getProgress() {
  const twoYears = 2 * 365 * 24 * 60 * 60 * 1000
  const elapsed = Date.now() - START_DATE.getTime()
  return Math.min((elapsed / twoYears) * 100, 99)
}

function formatBarTime(totalDays) {
  const years = Math.floor(totalDays / 365)
  const months = Math.floor((totalDays % 365) / 30)
  const days = (totalDays % 365) % 30
  if (years > 0) return `${years}a ${months}m ${days}d`
  return `${months}m ${days}d`
}

export default function SpotifyPlayer() {
  const { totalDays } = useRelationshipTime()
  const progress = getProgress()

  return (
    <div
      className="relative min-h-screen flex flex-col justify-end pb-10 px-6"
      style={{
        background: 'linear-gradient(180deg, #1a5c2e 0%, #121212 70%)',
      }}
    >
      {/* Status bar area */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 pt-4 text-xs text-white/60">
        <span>
          {new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </span>
        <span className="text-[#1ED760] font-semibold text-xs tracking-widest">SPOTIFYMY</span>
        <span>♥</span>
      </div>

      {/* Cover Art */}
      <div className="mt-16 mb-8 flex justify-center">
        <div
          className="w-64 h-64 rounded-lg shadow-2xl overflow-hidden"
          style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.6)' }}
        >
          <img
            src="/images/cover.jpg"
            alt="Capa"
            className="w-full h-full object-cover"
            onError={e => {
              e.target.style.display = 'none'
              e.target.parentElement.style.background =
                'linear-gradient(135deg, #1ED760 0%, #158a3e 100%)'
              e.target.parentElement.innerHTML =
                '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:80px">💚</div>'
            }}
          />
        </div>
      </div>

      {/* Track info */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-white font-bold text-xl leading-tight">Hitalo &amp; Sara 💚</p>
          <p className="text-white/60 text-sm mt-0.5">Nossa História</p>
        </div>
        <button className="text-[#1ED760]">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
          </svg>
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="w-full bg-white/20 rounded-full h-1 mb-2 cursor-pointer">
          <div
            className="bg-white rounded-full h-1 relative transition-all duration-1000"
            style={{ width: `${progress}%` }}
          >
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full -mr-1.5 shadow-md" />
          </div>
        </div>
        <div className="flex justify-between text-white/50 text-xs">
          <span>{formatBarTime(totalDays)}</span>
          <span>2 anos</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between px-4">
        {/* Shuffle */}
        <button className="text-white/50">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="16 3 21 3 21 8" />
            <line x1="4" y1="20" x2="21" y2="3" />
            <polyline points="21 16 21 21 16 21" />
            <line x1="15" y1="15" x2="21" y2="21" />
          </svg>
        </button>

        {/* Prev */}
        <button className="text-white/80">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="19 20 9 12 19 4 19 20" />
            <line x1="5" y1="19" x2="5" y2="5" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        {/* Play */}
        <button
          className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#121212">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </button>

        {/* Next */}
        <button className="text-white/80">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 4 15 12 5 20 5 4" />
            <line x1="19" y1="5" x2="19" y2="19" stroke="currentColor" strokeWidth="2" />
          </svg>
        </button>

        {/* Repeat */}
        <button className="text-[#1ED760]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="17 1 21 5 17 9" />
            <path d="M3 11V9a4 4 0 0 1 4-4h14" />
            <polyline points="7 23 3 19 7 15" />
            <path d="M21 13v2a4 4 0 0 1-4 4H3" />
          </svg>
        </button>
      </div>

      {/* Devices / Queue row */}
      <div className="flex items-center justify-between mt-6 px-1 text-white/40">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="3" width="20" height="14" rx="2" />
          <line x1="8" y1="21" x2="16" y2="21" />
          <line x1="12" y1="17" x2="12" y2="21" />
        </svg>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-[#1ED760]" />
          <span className="text-xs text-[#1ED760]">Reproduzindo</span>
        </div>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="8" y1="6" x2="21" y2="6" />
          <line x1="8" y1="12" x2="21" y2="12" />
          <line x1="8" y1="18" x2="21" y2="18" />
          <line x1="3" y1="6" x2="3.01" y2="6" />
          <line x1="3" y1="12" x2="3.01" y2="12" />
          <line x1="3" y1="18" x2="3.01" y2="18" />
        </svg>
      </div>

      {/* Scroll hint */}
      <div className="flex flex-col items-center mt-8 text-white/30 animate-bounce">
        <span className="text-xs mb-1">Role para ver nossos stats</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>
  )
}
