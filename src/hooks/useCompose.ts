import { useState } from "react"

export function useCompose() {
  const [isComposing, setIsComposing] = useState(false)
  const [content, setContent] = useState("")
  
  const compose = async (prompt: string) => {
    setIsComposing(true)
    // Add your composition logic here
    setIsComposing(false)
  }
  
  return { isComposing, content, compose }
}