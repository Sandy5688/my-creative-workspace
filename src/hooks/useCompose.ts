import { useState } from "react"

export function useCompose() {
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState("")
  
  const compose = async (params: any) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const { directive, settings } = params
    setContent(`Generated content for: ${directive} (Tier: ${settings?.tier || 'free'})`)
    setIsLoading(false)
    
    return {
      success: true,
      previewData: {
        id: Date.now().toString(),
        title: `Draft - ${directive.slice(0, 30)}`,
        content: `Generated content for: ${directive}`,
        createdAt: new Date(),
        updatedAt: new Date(),
        metadata: {
          tier: settings?.tier || 'free'
        }
      }
    }
  }
  
  return { isLoading, content, compose }
}
