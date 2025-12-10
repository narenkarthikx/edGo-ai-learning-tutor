"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, BarChart3, Users, Zap, Globe, BookOpen, TrendingUp, Star, Play, ChevronRight, Sparkles, Brain, Target, Award } from "lucide-react"
import { useEffect, useState } from "react"

// Floating particles component
const FloatingParticles = () => {
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, delay: number}>>([])
  
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4
    }))
    setParticles(newParticles)
  }, [])
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-primary/20 rounded-full animate-pulse-soft"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animation: `float 6s ease-in-out infinite ${particle.delay}s`
          }}
        />
      ))}
    </div>
  )
}

// Animated counter component
const AnimatedCounter = ({ value, suffix = "" }: { value: string | number, suffix?: string }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )
    
    const element = document.getElementById(`counter-${value}`)
    if (element) observer.observe(element)
    
    return () => observer.disconnect()
  }, [value])
  
  useEffect(() => {
    if (isVisible && typeof value === 'number') {
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev < value) {
            return Math.min(prev + Math.ceil(value / 20), value)
          }
          return value
        })
      }, 100)
      
      return () => clearInterval(timer)
    }
  }, [isVisible, value])
  
  return (
    <div id={`counter-${value}`} className="text-3xl font-bold text-primary">
      {typeof value === 'number' ? count : value}{suffix}
    </div>
  )
}

export default function Home() {
  const [currentFeature, setCurrentFeature] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % 6)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 relative overflow-hidden">
      <FloatingParticles />
      
      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-6 py-4 border-b backdrop-blur-xl bg-background/90 sticky top-0">
        <div className="flex items-center gap-2 animate-fade-in group">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center text-white font-bold hover:shadow-2xl transition-all duration-300 hover:scale-110 group-hover:rotate-6">
            <Brain className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            Edvion
          </span>
          <Badge variant="secondary" className="ml-2 animate-pulse-soft">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </div>
        <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Link href="/auth/login">
            <Button variant="ghost" className="hover:bg-primary/10 transition-all hover:scale-105">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-xl transition-all hover:scale-105 relative overflow-hidden group">
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20 max-w-6xl mx-auto">
        {/* Interactive background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
        </div>
        
        <div className="relative z-10 text-center space-y-8 mb-16">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm animate-pulse-soft">
              <Star className="w-4 h-4 mr-2" />
              AI-Powered Learning Revolution
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-balance leading-tight animate-fade-in bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Personalized AI Tutoring for Every Student
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: "0.2s" }}>
            Revolutionary adaptive learning system for government schools. Identify learning gaps early, support at individual pace,
            and enable equitable outcomes across <span className="text-primary font-semibold">literacy and numeracy</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link href="/auth/register">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:shadow-2xl transition-all hover:scale-110 px-8 py-6 text-lg group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Start Learning <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="outline" className="hover:bg-primary/10 transition-all hover:scale-105 px-8 py-6 text-lg bg-transparent backdrop-blur-sm border-2 hover:border-primary group">
                <Users className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                For Teachers
              </Button>
            </Link>
          </div>
          
          {/* Interactive demo preview */}
          <div className="mt-16 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20 hover:border-primary/40 transition-all duration-500 hover:shadow-2xl group cursor-pointer relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex items-center justify-center gap-4 text-primary">
                <Play className="w-8 h-8 group-hover:scale-125 transition-transform duration-300" />
                <span className="text-lg font-semibold">Watch Interactive Demo</span>
                <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
              </div>
            </Card>
          </div>
        </div>

        {/* Interactive Feature Showcase */}
        <div className="relative mt-20">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-in">
            Powerful Features for Modern Education
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Adaptive Learning",
                description: "AI adjusts content difficulty in real-time based on student performance",
                color: "from-yellow-500/20 to-orange-500/20",
                delay: "0s",
              },
              {
                icon: Globe,
                title: "Multilingual Support",
                description: "Learn in Hindi, English, Tamil, Telugu and 8+ regional languages",
                color: "from-blue-500/20 to-cyan-500/20",
                delay: "0.1s",
              },
              {
                icon: Target,
                title: "Gap Detection",
                description: "Instantly identify and address learning gaps with precision AI analysis",
                color: "from-red-500/20 to-pink-500/20",
                delay: "0.2s",
              },
              {
                icon: BookOpen,
                title: "Smart Content",
                description: "Personalized lessons that adapt to each student's unique learning style",
                color: "from-green-500/20 to-emerald-500/20",
                delay: "0.3s",
              },
              {
                icon: Users,
                title: "Teacher Dashboard",
                description: "Comprehensive analytics and insights for better classroom management",
                color: "from-purple-500/20 to-violet-500/20",
                delay: "0.4s",
              },
              {
                icon: Award,
                title: "Progress Tracking",
                description: "Real-time learning analytics with gamification and achievement rewards",
                color: "from-indigo-500/20 to-blue-500/20",
                delay: "0.5s",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              const isActive = currentFeature === idx
              return (
                <Card
                  key={idx}
                  className={`p-6 cursor-pointer transition-all duration-500 hover:shadow-2xl group relative overflow-hidden border-2 ${
                    isActive ? "border-primary shadow-xl scale-105" : "border-transparent hover:border-primary/50"
                  } animate-fade-in`}
                  style={{ animationDelay: feature.delay }}
                  onMouseEnter={() => setCurrentFeature(idx)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative z-10">
                    <div className={`w-16 h-16 bg-gradient-to-br from-primary/30 to-primary/10 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                      isActive ? "scale-110 shadow-lg" : "group-hover:scale-110 group-hover:shadow-lg"
                    }`}>
                      <Icon className={`w-8 h-8 text-primary transition-all duration-300 ${
                        isActive ? "scale-110" : "group-hover:scale-110"
                      }`} />
                    </div>
                    <h3 className="font-bold text-xl mb-3 transition-colors group-hover:text-primary">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                  
                  <div className={`absolute bottom-4 right-4 opacity-0 transition-opacity duration-300 ${
                    isActive ? "opacity-100" : "group-hover:opacity-100"
                  }`}>
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Interactive Stats Section */}
      <section className="relative px-6 py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-y backdrop-blur-sm">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Transforming Education at Scale
            </h2>
            <p className="text-lg text-muted-foreground">
              Real impact, real results for students across India
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: 12, suffix: "+", label: "Grade Levels Supported", icon: BookOpen },
              { value: 8, suffix: "+", label: "Regional Languages", icon: Globe },
              { value: "100", suffix: "%", label: "Real-time Analytics", icon: TrendingUp },
              { value: "24/7", suffix: "", label: "AI Support Available", icon: Zap },
            ].map((stat, idx) => (
              <Card
                key={idx}
                className="p-6 hover:shadow-xl transition-all duration-500 hover:scale-105 group cursor-pointer bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/50"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-8 h-8 text-primary" />
                  </div>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </Card>
            ))}
          </div>
          
          {/* Interactive testimonial */}
          <Card className="mt-16 p-8 bg-gradient-to-br from-primary/5 to-background border-primary/20 hover:shadow-2xl transition-all duration-500 group">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary/30 to-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Star className="w-10 h-10 text-primary" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <blockquote className="text-lg italic mb-4">
                  "Edvion has revolutionized how our students engage with learning. The AI adaptation is incredible!"
                </blockquote>
                <div className="font-semibold text-primary">Priya Sharma</div>
                <div className="text-sm text-muted-foreground">Government School Teacher, Delhi</div>
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Interactive CTA Section */}
      <section className="relative px-6 py-20 bg-gradient-to-br from-primary/5 to-background overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "2s" }} />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="animate-fade-in">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Join the Revolution
            </Badge>
          </div>
          
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Ready to Transform Learning?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Join thousands of students and teachers already using AI-powered education
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link href="/auth/register">
              <Button size="lg" className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:shadow-2xl transition-all hover:scale-110 px-10 py-6 text-lg group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Start Free Trial <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>
            </Link>
            <Link href="/student/onboarding">
              <Button size="lg" variant="outline" className="hover:bg-primary/10 transition-all hover:scale-105 px-10 py-6 text-lg backdrop-blur-sm border-2 hover:border-primary group">
                <Play className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                Try Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-12 border-t bg-background/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-white font-bold">
                <Brain className="w-5 h-5" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Edvion
              </span>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Building AI-powered education for equitable learning outcomes in government schools across India
            </p>
            <div className="flex justify-center gap-4 pt-4">
              <Badge variant="outline" className="hover:bg-primary/10 transition-colors cursor-pointer">
                Privacy Policy
              </Badge>
              <Badge variant="outline" className="hover:bg-primary/10 transition-colors cursor-pointer">
                Terms of Service
              </Badge>
              <Badge variant="outline" className="hover:bg-primary/10 transition-colors cursor-pointer">
                Contact Us
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
