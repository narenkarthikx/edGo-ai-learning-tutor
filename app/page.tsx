import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, BarChart3, Users, Zap, Globe, BookOpen, TrendingUp } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 py-4 border-b backdrop-blur-sm bg-background/80">
        <div className="flex items-center gap-2 animate-fade-in">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-white font-bold hover:shadow-lg transition-shadow">
            S
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Learn Buddy
          </span>
        </div>
        <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Link href="/auth/login">
            <Button variant="ghost" className="hover:bg-primary/10">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg transition-all hover:scale-105">
              Get Started
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center space-y-6 mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight animate-fade-in">
            Personalized AI Tutoring for Every Student
          </h1>
          <p
            className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Adaptive learning system for government schools. Identify learning gaps early, support at individual pace,
            and enable equitable outcomes across literacy and numeracy.
          </p>
          <div className="flex gap-4 justify-center pt-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Link href="/auth/register">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:shadow-xl transition-all hover:scale-105"
              >
                Start Learning <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-primary/5 transition-all hover:scale-105 bg-transparent"
              >
                For Teachers
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {[
            {
              icon: Zap,
              title: "Personalized Pace",
              description: "Each student learns at their own speed with AI adapting to their progress",
              delay: "0s",
            },
            {
              icon: Globe,
              title: "Multilingual Support",
              description: "Learn in your preferred language with support for multiple Indian languages",
              delay: "0.1s",
            },
            {
              icon: BarChart3,
              title: "Gap Detection",
              description: "Automatically identify learning gaps in literacy and numeracy",
              delay: "0.2s",
            },
            {
              icon: BookOpen,
              title: "Adaptive Content",
              description: "Tailored lessons that match each student's learning style and current level",
              delay: "0.3s",
            },
            {
              icon: Users,
              title: "Teacher Tools",
              description: "Track student progress and identify at-risk learners with actionable insights",
              delay: "0.4s",
            },
            {
              icon: TrendingUp,
              title: "Progress Analytics",
              description: "Real-time insights into learning outcomes and skill development",
              delay: "0.5s",
            },
          ].map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={idx}
                className="p-6 rounded-lg bg-card border hover:border-primary hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: feature.delay }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-gradient-to-br group-hover:from-primary/30 group-hover:to-primary/20 transition-all">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-12 bg-primary/5 border-y">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2 animate-fade-in">
            <div className="text-3xl font-bold text-primary">12+</div>
            <p className="text-sm text-muted-foreground">Grade Levels Supported</p>
          </div>
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="text-3xl font-bold text-primary">6+</div>
            <p className="text-sm text-muted-foreground">Regional Languages</p>
          </div>
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="text-3xl font-bold text-primary">Real-time</div>
            <p className="text-sm text-muted-foreground">Progress Tracking</p>
          </div>
          <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="text-3xl font-bold text-primary">100%</div>
            <p className="text-sm text-muted-foreground">Equitable Access</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t">
        <div className="max-w-6xl mx-auto text-center text-sm text-muted-foreground">
          <p>Building AI-powered education for equitable learning outcomes in government schools</p>
        </div>
      </footer>
    </div>
  )
}
