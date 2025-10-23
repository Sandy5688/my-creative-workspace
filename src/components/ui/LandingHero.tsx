'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, Palette, Code, Rocket, Star } from 'lucide-react';

export default function LandingHero() {
  const features = [
    { icon: Sparkles, text: 'AI-Powered Generation', color: 'from-blue-500 to-cyan-500' },
    { icon: Zap, text: 'Lightning Fast', color: 'from-yellow-500 to-orange-500' },
    { icon: Palette, text: 'Beautiful Design', color: 'from-pink-500 to-rose-500' },
    { icon: Code, text: 'Developer Friendly', color: 'from-purple-500 to-indigo-500' },
  ];

  return (
    <div className="flex items-center justify-center min-h-full bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8">
      <div className="max-w-4xl w-full text-center space-y-8">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', duration: 1, bounce: 0.5 }}
          className="inline-block"
        >
          <div className="relative">
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(14, 165, 233, 0.3)',
                  '0 0 60px rgba(14, 165, 233, 0.5)',
                  '0 0 20px rgba(14, 165, 233, 0.3)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 bg-gradient-to-br from-blue-500 via-cyan-500 to-purple-500 rounded-3xl flex items-center justify-center"
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center"
            >
              <Star className="w-5 h-5 text-white" fill="currentColor" />
            </motion.div>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Create Amazing
            </span>
            <br />
            <span className="text-gray-800">Content in Seconds</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto">
            Powered by advanced AI, designed for creators. 
            <br className="hidden md:block" />
            Your ideas deserve the perfect presentation.
          </p>
        </motion.div>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${feature.color} rounded-full text-white font-medium shadow-lg`}
            >
              <feature.icon className="w-5 h-5" />
              <span>{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Prompt Examples */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-3"
        >
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
            Try These Prompts →
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              'Create a landing page for a coffee shop',
              'Build a tech startup website',
              'Design a fitness app landing',
              'Make a restaurant showcase',
            ].map((example, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-sm text-gray-700 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer"
              >
                "{example}"
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Animated Arrow */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1.2, y: { duration: 1.5, repeat: Infinity } }}
          className="pt-8"
        >
          <div className="inline-flex items-center gap-2 text-gray-400">
            <Rocket className="w-5 h-5" />
            <span className="text-sm font-medium">Enter a prompt to get started</span>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-20 blur-xl"
        />
      </div>
    </div>
  );
}