"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { sendResponse } from "../actions/valentine"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import Envelope from "./Envelope"

export default function ValentineMessage() {
  const [response, setResponse] = useState<string | null>(null)
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false)
  const noButtonRef = useRef<HTMLDivElement>(null)

  const handleResponse = async (answer: "yes" | "no") => {
    await sendResponse(answer)
    setResponse(answer)
  }

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const noButtonX = useTransform(mouseX, (value) => {
    if (!noButtonRef.current) return 0
    const buttonRect = noButtonRef.current.getBoundingClientRect()
    const distanceX = value - (buttonRect.left + buttonRect.width / 2)
    return distanceX > 0 ? 100 : -100
  })

  const noButtonY = useTransform(mouseY, (value) => {
    if (!noButtonRef.current) return 0
    const buttonRect = noButtonRef.current.getBoundingClientRect()
    const distanceY = value - (buttonRect.top + buttonRect.height / 2)
    return distanceY > 0 ? 100 : -100
  })

  const handleMouseMove = (event: React.MouseEvent) => {
    mouseX.set(event.clientX)
    mouseY.set(event.clientY)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl" onMouseMove={handleMouseMove}>
      <AnimatePresence>
        {!isEnvelopeOpen ? (
          <motion.div
            key="envelope"
            exit={{ opacity: 0 }}
            className="flex justify-center items-center h-[calc(100vh-4rem)]"
          >
            <Envelope isOpen={isEnvelopeOpen} onOpen={() => setIsEnvelopeOpen(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="message"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-primary">My Dearest Love</h1>
            <div className="space-y-6 text-xl md:text-2xl text-center mb-8 text-foreground">
              <p>Chetna, you are the most special person in my life, my happy place, and my constant source of joy.</p>
              <p>
                Your unwavering support and care mean the world to me. You lift me up when I'm down and celebrate with
                me in my happiest moments.
              </p>
              <p>Every day with you is a blessing, and I'm grateful for your presence in my life.</p>
              <p>Mai hu tere saath hamesha !! 💗💗</p>
            </div>
            <div className="flex justify-center space-x-4 mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-1/3 aspect-square relative rounded-lg overflow-hidden shadow-lg"
              >
                <Image src="/Photo1.jpg" alt="Our special moment" layout="fill" objectFit="cover" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-1/3 aspect-square relative rounded-lg overflow-hidden shadow-lg"
              >
                <Image src="/Photo2.jpg?height=300&width=300" alt="Our memory 2" layout="fill" objectFit="cover" />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-1/3 aspect-square relative rounded-lg overflow-hidden shadow-lg"
              >
                <Image src="/Photo3.jpg?height=300&width=300" alt="Our memory 3" layout="fill" objectFit="cover" />
              </motion.div>
            </div>
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold text-primary">Will you be my Valentine?</h2>
              {!response ? (
                <div className="flex justify-center space-x-4">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Button
                      onClick={() => handleResponse("yes")}
                      className="text-2xl px-8 py-4 bg-primary text-primary-foreground"
                    >
                      Yes
                    </Button>
                  </motion.div>
                  <motion.div
                    ref={noButtonRef}
                    style={{ x: noButtonX, y: noButtonY }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Button className="text-2xl px-8 py-4 bg-secondary text-secondary-foreground cursor-not-allowed">
                      No
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-3xl font-bold text-primary"
                >
                  I'm so happy! I love you! ❤️
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

