'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Brain, BookOpen, Target, Trophy, Sparkles, MessageSquare, HelpCircle, Zap, TrendingUp, Heart } from 'lucide-react'

export function ADKAgentShowcase() {
  const agents = [
    {
      id: 'content-generator',
      name: 'Content Generator',
      icon: BookOpen,
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      description: 'Creates personalized learning content tailored to your grade and learning style',
      features: [
        'Complete lesson generation',
        'Visual aids & diagrams',
        'Practice activities',
        'Real-world Tamil Nadu examples',
        'Quick understanding checks'
      ],
      exampleQuery: '"Teach me about Quadratic Equations"',
      bestFor: 'Learning new concepts',
      stats: { accuracy: '95%', responseTime: '3-5s' }
    },
    {
      id: 'gap-analyzer',
      name: 'Gap Analyzer',
      icon: Target,
      gradient: 'from-red-500 via-orange-500 to-yellow-500',
      description: 'Identifies what you\'re missing and creates a recovery plan',
      features: [
        'Deep gap analysis',
        'Prerequisite mapping',
        'Root cause identification',
        'Step-by-step remediation',
        'Confidence scoring'
      ],
      exampleQuery: '"Find my learning gaps in Mathematics"',
      bestFor: 'Identifying weak areas',
      stats: { accuracy: '92%', responseTime: '4-6s' }
    },
    {
      id: 'assessor',
      name: 'Assessment Creator',
      icon: Trophy,
      gradient: 'from-yellow-500 via-orange-500 to-red-500',
      description: 'Generates adaptive tests matching board exam patterns',
      features: [
        'Board exam pattern questions',
        'Mixed question types',
        'Adaptive difficulty',
        'Detailed explanations',
        'Mark scheme included'
      ],
      exampleQuery: '"Create a test on Electricity Chapter"',
      bestFor: 'Test preparation',
      stats: { accuracy: '96%', responseTime: '5-7s' }
    },
    {
      id: 'motivator',
      name: 'Motivator',
      icon: Sparkles,
      gradient: 'from-pink-500 via-purple-500 to-indigo-500',
      description: 'Keeps you engaged, motivated, and on track',
      features: [
        'Personalized encouragement',
        'Daily learning challenges',
        'Success stories',
        'Achievement celebrations',
        'Study streak tracking'
      ],
      exampleQuery: '"I need motivation to study Math"',
      bestFor: 'Staying motivated',
      stats: { engagement: '88%', impact: 'High' }
    },
    {
      id: 'tutor',
      name: 'Personal Tutor',
      icon: MessageSquare,
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      description: 'Interactive 1-on-1 tutoring with conversation memory',
      features: [
        'Conversational learning',
        'Socratic questioning',
        'Step-by-step guidance',
        'Context awareness',
        'Practice exercises'
      ],
      exampleQuery: '"How do I solve this trigonometry problem?"',
      bestFor: 'Getting personalized help',
      stats: { satisfaction: '94%', clarity: '96%' }
    },
    {
      id: 'smart-router',
      name: 'Smart Router',
      icon: Brain,
      gradient: 'from-purple-500 via-indigo-500 to-blue-500',
      description: 'Intelligent system that picks the best agent for your query',
      features: [
        'Intent detection',
        'Context analysis',
        'Automatic routing',
        'Multi-agent coordination',
        'Seamless experience'
      ],
      exampleQuery: '"Ask anything and I\'ll route it!"',
      bestFor: 'When you\'re not sure which agent to use',
      stats: { accuracy: '91%', versatility: 'High' }
    }
  ]

  const systemFeatures = [
    {
      icon: Brain,
      title: 'Intelligent Routing',
      description: 'Automatically selects the best agent for your query'
    },
    {
      icon: Zap,
      title: 'Fast Response',
      description: 'Get answers in 2-5 seconds on average'
    },
    {
      icon: TrendingUp,
      title: 'Grade-Adaptive',
      description: 'Content adapts to your class level (7, 10, etc.)'
    },
    {
      icon: Heart,
      title: 'Tamil Nadu Focused',
      description: 'Aligned with TNSCERT curriculum and board exams'
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Brain className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          ADK Agent System
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          6 specialized AI agents working together to provide you with personalized, adaptive education
        </p>
      </div>

      {/* System Features */}
      <div className="grid md:grid-cols-4 gap-4">
        {systemFeatures.map((feature, idx) => (
          <Card key={idx} className="text-center">
            <CardContent className="pt-6">
              <feature.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
              <p className="text-xs text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agents Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-center mb-6">Meet Your AI Tutors</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {agents.map((agent) => (
            <Card key={agent.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className={`h-2 bg-gradient-to-r ${agent.gradient}`} />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${agent.gradient} flex items-center justify-center`}>
                      <agent.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {agent.bestFor}
                      </Badge>
                    </div>
                  </div>
                </div>
                <CardDescription className="mt-2">{agent.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Features */}
                <div>
                  <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-yellow-600" />
                    Capabilities
                  </h4>
                  <ul className="space-y-1">
                    {agent.features.map((feature, idx) => (
                      <li key={idx} className="text-xs text-muted-foreground flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Example Query */}
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-xs text-muted-foreground mb-1">Example Query:</p>
                  <p className="text-sm font-medium italic">{agent.exampleQuery}</p>
                </div>

                {/* Stats */}
                <div className="flex gap-4 pt-2 border-t">
                  {Object.entries(agent.stats).map(([key, value]) => (
                    <div key={key} className="text-center flex-1">
                      <p className="text-xs text-muted-foreground capitalize">{key}</p>
                      <p className="text-sm font-bold text-primary">{value}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5" />
            How It Works
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold">Ask Your Question</h3>
              <p className="text-sm text-muted-foreground">
                Type your question or learning request
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold">Smart Routing</h3>
              <p className="text-sm text-muted-foreground">
                AI detects intent and picks the best agent
              </p>
            </div>
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold">Get Personalized Help</h3>
              <p className="text-sm text-muted-foreground">
                Receive tailored response for your grade level
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Why Use ADK Agents?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { icon: '🎯', title: 'Personalized Learning', desc: 'Content adapted to your grade and style' },
              { icon: '🚀', title: 'Fast & Efficient', desc: 'Get answers in seconds, not hours' },
              { icon: '📚', title: 'Curriculum Aligned', desc: 'Follows Tamil Nadu board syllabus' },
              { icon: '💪', title: 'Build Confidence', desc: 'Practice and improve continuously' },
              { icon: '🏆', title: 'Exam Ready', desc: 'Board exam pattern practice' },
              { icon: '✨', title: 'Stay Motivated', desc: 'Daily challenges and encouragement' }
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <span className="text-2xl">{benefit.icon}</span>
                <div>
                  <h4 className="font-semibold text-sm">{benefit.title}</h4>
                  <p className="text-xs text-muted-foreground">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
