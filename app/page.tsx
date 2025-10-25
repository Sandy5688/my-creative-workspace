"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, 
  Zap, 
  Brain, 
  Save,
  Palette,
  ArrowRight
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/70 border-b border-gray-200 dark:border-slate-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Creative Workspace
            </span>
          </div>

          <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Link href="#features" className="hover:text-indigo-600 transition">Features</Link>
            <Link href="/faq" className="hover:text-indigo-600 transition">FAQ</Link>
            <Link href="/pricing" className="hover:text-indigo-600 transition">Pricing</Link>
            <Link href="/workspace" className="hover:text-indigo-600 transition">Workspace</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700" asChild>
              <Link href="/workspace">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 md:py-32 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6 px-4 py-2 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-sm font-semibold"
          >
            ✨ Introducing Adaptive Composition Engine
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create. Edit. Deploy
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">effortlessly.</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Your studio for adaptive content creation. Build stunning interfaces in minutes with our intelligent composition engine.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button size="lg" className="text-lg px-8 py-6 h-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all" asChild>
              <Link href="/workspace">
                Start Creating <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 h-auto border-2 hover:border-indigo-600 hover:text-indigo-600 transition-all" asChild>
              <Link href="#features">Explore Features</Link>
            </Button>
          </div>

          {/* Animated Mockup Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative max-w-5xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 blur-3xl opacity-20"></div>
            <div className="relative backdrop-blur-sm bg-white/10 dark:bg-slate-900/10 rounded-3xl p-3 shadow-2xl border border-white/20 dark:border-slate-800/20">
              <div className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-xl border border-gray-200 dark:border-slate-800">
                <div className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-900 p-3 flex items-center gap-2 border-b border-gray-200 dark:border-slate-700">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Creative Workspace
                  </div>
                </div>
                <div className="aspect-[16/10] bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-slate-900 dark:to-indigo-950 flex items-center justify-center p-12">
                  <div className="text-center">
                    <motion.div
                      animate={{ 
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0]
                      }}
                      transition={{ 
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <Sparkles className="h-20 w-20 text-indigo-400 mx-auto mb-4" />
                    </motion.div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Workspace Preview</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Everything you need to create
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Powerful features that make creation effortless
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                emoji: "⚡",
                title: "Real-time Editing",
                description: "Instantly see your changes as you create"
              },
              {
                icon: Brain,
                emoji: "🧠",
                title: "Smart Preview",
                description: "Adaptive live rendering for your projects"
              },
              {
                icon: Save,
                emoji: "💾",
                title: "Autosave Drafts",
                description: "Never lose your progress again"
              },
              {
                icon: Palette,
                emoji: "🎨",
                title: "Adaptive Blocks",
                description: "Compose intelligent, AI-assisted layouts"
              }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-gradient-to-br from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-2xl shadow-lg hover:shadow-xl border border-gray-100 dark:border-slate-700 cursor-pointer group"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                  {feature.emoji}
                </div>
                <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative backdrop-blur-sm bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-12 md:p-16 text-center shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Ready to start creating?
              </h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
                Join thousands of creators building amazing content with Creative Workspace
              </p>
              <Button size="lg" className="text-lg px-8 py-6 h-auto bg-white text-indigo-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all" asChild>
                <Link href="/workspace">
                  Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-slate-800 py-12 px-6 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">Creative Workspace</span>
            </div>
            
            <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
              <Link href="/privacy" className="hover:text-indigo-600 transition">Privacy</Link>
              <Link href="/terms" className="hover:text-indigo-600 transition">Terms</Link>
              <Link href="/faq" className="hover:text-indigo-600 transition">FAQ</Link>
              <Link href="/about" className="hover:text-indigo-600 transition">About</Link>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              © 2025 Creative Workspace
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
