"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Zap, 
  Shield, 
  Clock,
  ArrowRight,
  Check
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-blue-950 dark:to-purple-950">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-xl font-bold">Creative Workspace</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-sm font-medium hover:text-blue-600 transition">
              Features
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-blue-600 transition">
              FAQ
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-blue-600 transition">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">Log in</Button>
            <Button size="sm" asChild>
              <Link href="/workspace">Start Creating</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block mb-6 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium">
              ✨ Now with Adaptive Composition Engine
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create. Edit. Deploy.
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 mb-10 max-w-3xl mx-auto">
              Your studio for adaptive content creation. Build stunning interfaces in minutes with our intelligent composition engine.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild>
                <Link href="/workspace">
                  Start Creating <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto">
                Explore Features
              </Button>
            </div>

            {/* Hero Image/Mockup */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="glass rounded-3xl p-2 shadow-2xl">
                <div className="bg-white dark:bg-slate-900 rounded-2xl aspect-video flex items-center justify-center border border-slate-200 dark:border-slate-800">
                  <div className="text-center">
                    <Sparkles className="h-16 w-16 text-slate-300 dark:text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-500 dark:text-slate-400">Workspace Preview</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Everything you need to create</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Powerful features that make creation effortless
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Zap,
                title: "Real-time Editing",
                description: "See changes instantly as you create"
              },
              {
                icon: Sparkles,
                title: "Smart Preview",
                description: "Live preview with adaptive rendering"
              },
              {
                icon: Clock,
                title: "Autosave Drafts",
                description: "Never lose your work again"
              },
              {
                icon: Shield,
                title: "Adaptive Blocks",
                description: "Intelligent content composition"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:shadow-lg transition"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="glass rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to start creating?</h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
              Join thousands of creators building amazing content
            </p>
            <Button size="lg" className="text-lg px-8 py-6 h-auto" asChild>
              <Link href="/workspace">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-200 dark:border-slate-800">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-blue-600 to-purple-600" />
              <span className="font-semibold">Creative Workspace</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-600 dark:text-slate-400">
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/about">About</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
