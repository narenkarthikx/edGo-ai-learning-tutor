import type React from "react"
import { Brain, Sparkles } from "lucide-react"

const FloatingElement = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <div 
    className={`absolute w-2 h-2 bg-primary/20 rounded-full animate-float ${className}`}
    style={{ animationDelay: `${delay}s` }}
  />
)

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-primary/5 rounded-full blur-2xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
        
        {/* Floating particles */}
        <FloatingElement className="top-20 left-20" delay={0} />
        <FloatingElement className="top-32 right-32" delay={1} />
        <FloatingElement className="bottom-40 left-1/3" delay={2} />
        <FloatingElement className="top-1/2 left-10" delay={3} />
        <FloatingElement className="bottom-20 right-20" delay={4} />
      </div>
      
      {/* Branding */}
      <div className="absolute top-8 left-8 flex items-center gap-2 animate-fade-in">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
          <Brain className="w-6 h-6" />
        </div>
        <div className="flex flex-col">
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Edvion
          </span>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3" />
            <span>AI Powered Learning</span>
          </div>
        </div>
      </div>
      
      <div className="w-full max-w-md relative z-10 animate-fade-in" style={{ animationDelay: "0.2s" }}>
        {children}
      </div>
    </div>
  )
}
