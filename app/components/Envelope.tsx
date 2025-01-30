"use client"

import { motion } from "framer-motion"

interface EnvelopeProps {
  isOpen: boolean
  onOpen: () => void
}

export default function Envelope({ isOpen, onOpen }: EnvelopeProps) {
  return (
    <motion.div
      className="w-64 h-48 bg-secondary rounded-lg shadow-lg cursor-pointer relative overflow-hidden"
      whileHover={{ scale: 1.05 }}
      onClick={onOpen}
    >
      <motion.div
        className="absolute inset-0 bg-primary"
        initial={false}
        animate={isOpen ? { rotateX: 180, y: -100 } : { rotateX: 0, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ transformOrigin: "top" }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-primary-foreground">
          <span className="text-2xl font-bold">To,</span>
          <span className="text-3xl font-bold italic">Mi amor</span>
        </div>
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-accent flex items-center justify-center"
        initial={false}
        animate={isOpen ? { y: 0 } : { y: 150 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <span className="text-2xl font-bold text-primary">Open Me</span>
      </motion.div>
    </motion.div>
  )
}

