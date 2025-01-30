"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface PasswordFormProps {
  onAuthenticate: () => void
}

export default function PasswordForm({ onAuthenticate }: PasswordFormProps) {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    })

    if (response.ok) {
      onAuthenticate()
    } else {
      setError("Incorrect password. Please try again.")
    }
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-card p-8 rounded-lg shadow-lg max-w-md w-full"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-primary">Enter Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
          className="handwritten text-xl"
        />
        <Button type="submit" className="w-full handwritten text-xl">
          Open Envelope
        </Button>
        {error && <p className="text-destructive text-center">{error}</p>}
      </form>
    </motion.div>
  )
}

