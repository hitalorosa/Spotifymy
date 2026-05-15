import { motion } from 'framer-motion'

export default function RetrospectiveButton({ onClick }) {
  return (
    <section className="px-6 pb-16 bg-[#121212] flex flex-col items-center gap-4">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-white/40 text-sm text-center"
      >
        Quer reviver nossos melhores momentos?
      </motion.p>

      <motion.button
        onClick={onClick}
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.95 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
        className="w-full py-5 rounded-full text-black font-bold text-lg tracking-wide pulse-green"
        style={{
          background: 'linear-gradient(135deg, #1ED760 0%, #17a84a 100%)',
          boxShadow: '0 8px 32px rgba(30,215,96,0.4)',
        }}
      >
        ▶ &nbsp;Ver Nossa Retrospectiva
      </motion.button>

      <p className="text-white/20 text-xs text-center">
        Uma experiência especial só para nós 💚
      </p>
    </section>
  )
}
