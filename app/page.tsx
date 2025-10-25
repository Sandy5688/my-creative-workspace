"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Zap, Brain, Save, Palette, ArrowRight, Menu } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Creative Workspace
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">Home</Link>
              <Link href="/workspace" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">Projects</Link>
              <Link href="/faq" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">FAQ</Link>
              <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition">About</Link>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/workspace" className="hidden sm:inline-flex px-4 py-2 text-sm font-semibold text-gray-700 hover:text-indigo-600 transition">
                Sign In
              </Link>
              <Link href="/workspace" className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-xl transition-all">
                Go Live
              </Link>
              <button className="md:hidden p-2">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-20 pb-32 px-6">
        <div className="absolute inset-0 bg-grid-slate-200/50 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-8 px-5 py-2.5 rounded-full bg-white shadow-lg border border-indigo-100"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600"></span>
              </span>
              <span className="text-sm font-semibold text-indigo-600">✨ Now with Adaptive Composition Engine</span>
            </motion.div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your studio for
              </span>
              <span className="block text-gray-900">adaptive content creation</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Build stunning interfaces in minutes with our intelligent composition engine. 
              Create, edit, and deploy with unprecedented speed and precision.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/workspace" className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-lg font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
                Start Creating
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-8 py-4 bg-white text-gray-900 text-lg font-bold rounded-2xl border-2 border-gray-200 hover:border-indigo-300 hover:shadow-xl transition-all duration-300">
                Explore Features
              </button>
            </div>
          </motion.div>

          {/* Mockup Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 blur-3xl opacity-20"></div>
            <div className="relative backdrop-blur-sm bg-white/30 rounded-3xl p-4 shadow-2xl border border-white/50">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-3 flex items-center gap-2 border-b">
                  <div className="flex gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center text-sm text-gray-600 font-medium">Creative Workspace Studio</div>
                </div>
                <div className="aspect-[16/9] bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-12">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.05, 1] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Sparkles className="h-24 w-24 text-indigo-400" />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4 text-gray-900">Everything you need to create</h2>
            <p className="text-xl text-gray-600">Powerful features that make creation effortless</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, emoji: "⚡", title: "Real-time Editing", desc: "See your changes instantly as you create" },
              { icon: Brain, emoji: "🧠", title: "Smart Preview", desc: "Adaptive live rendering for all your projects" },
              { icon: Save, emoji: "💾", title: "Autosave Drafts", desc: "Never lose your progress again" },
              { icon: Palette, emoji: "🎨", title: "Adaptive Blocks", desc: "Intelligent, AI-assisted composition" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                className="group p-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-200 hover:border-indigo-200 hover:shadow-2xl transition-all cursor-pointer"
              >
                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform">{feature.emoji}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl font-bold text-white mb-6">Ready to start creating?</h2>
          <p className="text-xl text-indigo-100 mb-10">
            Join thousands of creators building amazing content with Creative Workspace
          </p>
          <Link href="/workspace" className="inline-flex items-center gap-3 px-8 py-4 bg-white text-indigo-600 text-lg font-bold rounded-2xl hover:shadow-2xl hover:scale-105 transition-all">
            Get Started Free <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-white font-bold">Creative Workspace</span>
            </div>
            <div className="flex gap-8 text-sm">
              <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition">Terms</Link>
              <Link href="/faq" className="hover:text-white transition">FAQ</Link>
              <Link href="/about" className="hover:text-white transition">About</Link>
            </div>
            <p className="text-sm">© 2025 Creative Workspace. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
