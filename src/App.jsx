import { useState } from 'react'
import SpotifyPlayer from './components/SpotifyPlayer'
import StatsSection from './components/StatsSection'
import RetrospectiveButton from './components/RetrospectiveButton'
import StoriesContainer from './components/stories/StoriesContainer'

export default function App() {
  const [showStories, setShowStories] = useState(false)

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <div className="max-w-[430px] mx-auto relative">
        <SpotifyPlayer />
        <StatsSection />
        <RetrospectiveButton onClick={() => setShowStories(true)} />
      </div>

      {showStories && (
        <StoriesContainer onClose={() => setShowStories(false)} />
      )}
    </div>
  )
}
