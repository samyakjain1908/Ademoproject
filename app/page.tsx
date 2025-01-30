"use client"

import { useState } from "react"
import ValentineMessage from "./components/ValentineMessage"
import PasswordForm from "./components/PasswordForm"
import { motion } from "framer-motion"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background flex items-center justify-center p-4"
    >
      {!isAuthenticated ? <PasswordForm onAuthenticate={() => setIsAuthenticated(true)} /> : <ValentineMessage />}
    </motion.div>
  )
}

