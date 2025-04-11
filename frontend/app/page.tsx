"use client"

import type React from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, CheckCircle, Brain, Sparkles } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"

export default function LandingPage() {
  // Create refs for each section
  const featuresRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)

  // Function to scroll to a section
  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800 sticky top-0 bg-gray-950/80 backdrop-blur-md z-10">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold text-cyan-400">
            <Brain className="h-5 w-5" />
            <span>Mnemo-vault</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection(aboutRef)}
              className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
            >
              About
            </button>
          </nav>
          <div className="flex gap-4">
            <Link href="/login">
              <Button
                variant="outline"
                className="border-gray-700 text-black hover:text-cyan-400 hover:border-cyan-400"
              >
                Log In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-black font-medium">Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-950"></div>
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-600/10 rounded-full filter blur-3xl"></div>
          </div>
          <div className="container relative px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 mb-2">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-sm font-medium">AI-Powered Learning</span>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
                    Knowledge Management Reimagined
                  </h1>
                  <p className="max-w-[600px] text-gray-400 md:text-xl">
                    Transform how you learn and retain information with our intelligent platform that organizes,
                    summarizes, and helps you interact with your knowledge base in meaningful ways.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                  <Link href="/register">
                    <Button
                      size="lg"
                      className="gap-1.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-black font-medium shadow-lg shadow-cyan-500/20"
                    >
                      Get Started
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => scrollToSection(featuresRef)}
                    className="border-gray-700 text-black hover:text-cyan-400 hover:border-cyan-400"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-teal-500/20 rounded-2xl blur-xl"></div>
                  <Image
                    src="/placeholder.svg?height=550&width=550"
                    width={550}
                    height={550}
                    alt="AI Knowledge Management System"
                    className="relative rounded-2xl border border-gray-800 shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section ref={featuresRef} className="w-full py-16 md:py-24 lg:py-32 bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <div className="inline-block rounded-lg bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400 border border-cyan-500/20">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
                  Smart Knowledge Management
                </h2>
                <p className="text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Mnemo-vault combines cutting-edge AI with intuitive design to create a seamless knowledge management
                  experience that adapts to your learning style.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-2">
              {[
                {
                  title: "Intelligent Content Extraction",
                  description:
                    "Effortlessly import knowledge from URLs, PDFs, documents, and more backed by advanced parsing libraries that preserves context and structure.",
                },
                {
                  title: "AI-Powered Summary Notes",
                  description:
                    "Get concise, accurate summaries of complex content for quick revision of topics, powered with the latest and the best open-source LLM models.",
                },
                {
                  title: "Interactive Flash Cards",
                  description:
                    "Reinforce your learning with dynamically generated flash cards that adapt to your knowledge gaps and help you retain information more effectively.",
                },
                {
                  title: "Natural Language Queries",
                  description:
                    "Ask questions in plain English and receive precise answers drawn directly from your personal knowledge base, with citations to original sources.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-2 rounded-xl border border-gray-800 bg-gray-900/50 p-6 shadow-lg transition-all hover:shadow-cyan-500/5 hover:border-gray-700"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/10 text-cyan-400">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-400">{feature.title}</h3>
                  <p className="text-center text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section ref={aboutRef} className="w-full py-16 md:py-24 lg:py-32 bg-gray-950 relative">
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-600/10 rounded-full filter blur-3xl"></div>
          </div>
          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-cyan-500/10 px-3 py-1 text-sm text-cyan-400 border border-cyan-500/20">
                  About
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
                  About the Project & Creator
                </h2>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              {/* About the Project */}
              <div className="flex flex-col justify-center space-y-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 shadow-lg">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-cyan-400">About Mnemo-vault</h3>
                  <p className="text-gray-400">
                    Mnemo-vault is a personal project born out of my passion for AI and knowledge management. As I
                    navigate through the rapidly evolving generative AI space, I wanted to create a tool that could help
                    me and others efficiently organize and retrieve information.
                  </p>
                  <p className="text-gray-400">
                    This project combines modern web technologies with AI capabilities to create a seamless experience
                    for users who want to manage their learning materials and notes in one place.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-gray-200">Project Goals</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-cyan-400" />
                      <span className="text-gray-300">Create a clean, responsive user interface</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-cyan-400" />
                      <span className="text-gray-300">Implement secure user authentication</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-cyan-400" />
                      <span className="text-gray-300">Connect frontend with FastAPI backend</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* About the Creator */}
              <div className="flex flex-col justify-center space-y-4 rounded-xl border border-gray-800 bg-gray-900/50 p-6 shadow-lg">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-cyan-400">About Me</h3>
                  <p className="text-gray-400">
                    I'm Girivardhana Reddiar, a Data Science MS candidate passionate about AI, machine learning, and
                    software development. This project represents my journey in learning full-stack development while
                    applying my data science knowledge.
                  </p>
                  <p className="text-gray-400">
                    With a background in computer science and a focus on AI applications, I'm constantly exploring new
                    technologies and methodologies to solve real-world problems through innovative solutions.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-bold text-gray-200">Skills & Interests</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-cyan-400" />
                      <span className="text-gray-300">Machine Learning & AI</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-cyan-400" />
                      <span className="text-gray-300">Full-Stack Development</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-cyan-400" />
                      <span className="text-gray-300">Data Analysis & Visualization</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-24 lg:py-32 bg-gray-900 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent opacity-70"></div>
          <div className="container relative px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">
                  Ready to Transform Your Learning?
                </h2>
                <p className="text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join Mnemo-vault today and experience a new way to capture, organize, and interact with your
                  knowledge. Your personalized AI learning assistant awaits.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-6">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="gap-1.5 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-black font-medium shadow-lg shadow-cyan-500/20"
                  >
                    Create Free Account
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-gray-700 text-black hover:text-cyan-400 hover:border-cyan-400"
                  >
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-gray-800 bg-gray-950">
        <div className="border-t border-gray-800 py-6">
          <div className="container flex flex-col items-center justify-between gap-4 px-4 md:px-6 lg:flex-row">
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Mnemo-vault. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                  <path d="M9 18c-4.51 2-5-2-7-2"></path>
                </svg>
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
