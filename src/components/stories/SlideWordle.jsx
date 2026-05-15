import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ↓ Troque aqui pela palavra real de 7 letras (maiúsculas, sem acento)
const TARGET_WORD = 'PALAVRA'
const WORD_LENGTH = 7
const MAX_GUESSES = 6

const KEYBOARD_ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['ENTER','Z','X','C','V','B','N','M','⌫'],
]

function getTileState(guess, position, target) {
  const letter = guess[position]
  if (!letter) return 'empty'
  if (target[position] === letter) return 'correct'
  if (target.includes(letter)) return 'present'
  return 'absent'
}

const stateColors = {
  empty: '#1a1a1a',
  filled: '#333',
  correct: '#1ED760',
  present: '#b59f3b',
  absent: '#3a3a3a',
}

export default function SlideWordle() {
  const [guesses, setGuesses] = useState([])
  const [current, setCurrent] = useState('')
  const [won, setWon] = useState(false)
  const [lost, setLost] = useState(false)
  const [shake, setShake] = useState(false)
  const [usedKeys, setUsedKeys] = useState({})

  const submitGuess = useCallback(() => {
    if (current.length !== WORD_LENGTH) {
      setShake(true)
      setTimeout(() => setShake(false), 500)
      return
    }
    const newGuesses = [...guesses, current]
    const newUsed = { ...usedKeys }
    current.split('').forEach((letter, i) => {
      const state = getTileState(current, i, TARGET_WORD)
      if (!newUsed[letter] || state === 'correct') newUsed[letter] = state
    })
    setUsedKeys(newUsed)
    setGuesses(newGuesses)
    setCurrent('')
    if (current === TARGET_WORD) setWon(true)
    else if (newGuesses.length >= MAX_GUESSES) setLost(true)
  }, [current, guesses, usedKeys])

  const handleKey = useCallback((key) => {
    if (won || lost) return
    if (key === '⌫' || key === 'BACKSPACE') {
      setCurrent(c => c.slice(0, -1))
    } else if (key === 'ENTER') {
      submitGuess()
    } else if (/^[A-Z]$/.test(key) && current.length < WORD_LENGTH) {
      setCurrent(c => c + key)
    }
  }, [won, lost, current, submitGuess])

  useEffect(() => {
    const handler = (e) => handleKey(e.key.toUpperCase())
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [handleKey])

  // Build display rows
  const rows = Array.from({ length: MAX_GUESSES }, (_, i) => {
    if (i < guesses.length) return { word: guesses[i], submitted: true }
    if (i === guesses.length) return { word: current, submitted: false }
    return { word: '', submitted: false }
  })

  return (
    <div
      className="w-full h-full flex flex-col items-center"
      style={{ background: 'linear-gradient(160deg, #0d1020 0%, #121212 100%)' }}
    >
      <div className="pt-16 pb-4 text-center px-6">
        <p className="text-[#1ED760] text-xs font-semibold tracking-widest uppercase mb-1">
          Mini-jogo
        </p>
        <h2 className="text-white text-xl font-bold">Adivinhe nossa palavra!</h2>
        <p className="text-white/40 text-xs mt-1">{WORD_LENGTH} letras · {MAX_GUESSES} tentativas</p>
      </div>

      {/* Grid */}
      <div className="flex flex-col gap-1.5 mb-4">
        {rows.map((row, ri) => (
          <motion.div
            key={ri}
            className={`flex gap-1.5 ${shake && ri === guesses.length ? 'shake' : ''}`}
          >
            {Array.from({ length: WORD_LENGTH }, (_, ci) => {
              const letter = row.word[ci] || ''
              const state = row.submitted
                ? getTileState(row.word, ci, TARGET_WORD)
                : letter ? 'filled' : 'empty'
              return (
                <motion.div
                  key={ci}
                  className="w-10 h-10 flex items-center justify-center rounded font-bold text-white text-lg border"
                  style={{
                    background: stateColors[state],
                    borderColor: state === 'empty' ? '#444' : stateColors[state],
                  }}
                  animate={row.submitted ? { rotateX: [0, 90, 0] } : {}}
                  transition={{ delay: ci * 0.08, duration: 0.4 }}
                >
                  {letter}
                </motion.div>
              )
            })}
          </motion.div>
        ))}
      </div>

      {/* Result message */}
      <AnimatePresence>
        {(won || lost) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-3 px-5 py-2 rounded-full text-sm font-bold"
            style={{ background: won ? '#1ED760' : '#c0392b', color: '#000' }}
          >
            {won ? '🎉 Acertou! Palavra: ' + TARGET_WORD : `A palavra era: ${TARGET_WORD}`}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyboard */}
      <div className="flex flex-col gap-1.5 px-2">
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} className="flex justify-center gap-1">
            {row.map(key => {
              const keyState = usedKeys[key]
              const isWide = key === 'ENTER' || key === '⌫'
              return (
                <button
                  key={key}
                  onClick={() => handleKey(key)}
                  className="rounded font-bold text-white text-xs h-12 flex items-center justify-center select-none active:scale-95 transition-transform"
                  style={{
                    width: isWide ? 52 : 30,
                    background: keyState ? stateColors[keyState] : '#3a3a3a',
                    fontSize: isWide ? 10 : 12,
                  }}
                >
                  {key}
                </button>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}
