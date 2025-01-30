"use server"

import { sendEmail } from "../utils/email"

export async function sendResponse(answer: "yes" | "no") {
  const subject = `Valentine's Day Response: ${answer.toUpperCase()}`
  const text = `Your girlfriend's response to your Valentine's Day request is: ${answer.toUpperCase()}`

  try {
    await sendEmail(subject, text)
    return { success: true }
  } catch (error) {
    console.error("Failed to send email:", error)
    return { success: false, error: "Failed to send email" }
  }
}

