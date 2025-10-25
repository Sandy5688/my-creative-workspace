"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Save, Download, Settings, User, Home } from "lucide-react";
import Link from "next/link";

export default function Workspace() {
  const [prompt, setPrompt] = useState("");
  const [preview, setPreview] = useState("");

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-lg shadow-sm">
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold text-lg">Creative Workspace</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition">
              New
            </button>
            <button className="px-4 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition">
              <Save className="h-4 w-4 inline mr-2" />
              Save
            </button>
            <button className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition">
              <Zap className="h-4 w-4 inline mr-2" />
              Go Live
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition">
              <Settings className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 p-6 overflow-hidden">
        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Left Panel */}
          <motion.div 
            initial={{x:-20,opacity:0}} 
            animate={{x:0,opacity:1}}
            className="col-span-12 lg:col-span-3 bg-white rounded-2xl shadow-xl p-6 flex flex-col border border-gray-200"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100">
                <Sparkles className="h-5 w-5 text-indigo-600" />
              </div>
              <h2 className="text-lg font-bold">Directive Input</h2>
            </div>
            
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to create..."
              className="flex-1 w-full p-4 border-2 border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:outline-none transition"
            />
            
            <button 
              onClick={() => setPreview(`✨ Generated: ${prompt}`)}
              className="mt-4 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold hover:shadow-2xl hover:scale-[1.02] transition-all"
            >
              <Zap className="h-4 w-4 inline mr-2" />
              Compose
            </button>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Recent Directives
              </h3>
              <p className="text-sm text-gray-400">No recent directives yet</p>
            </div>
          </motion.div>

          {/* Center Panel */}
          <motion.div 
            initial={{y:20,opacity:0}} 
            animate={{y:0,opacity:1}} 
            transition={{delay:0.1}}
            className="col-span-12 lg:col-span-6 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200"
          >
            <div className="border-b px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50">
              <h2 className="text-lg font-bold">Live Preview</h2>
            </div>
            
            <div className="p-12 h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
              {preview ? (
                <motion.div 
                  initial={{scale:0.9,opacity:0}}
                  animate={{scale:1,opacity:1}}
                  className="text-center max-w-2xl"
                >
                  <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    {preview}
                  </div>
                  <p className="text-gray-600">Your composition is ready!</p>
                </motion.div>
              ) : (
                <div className="text-center">
                  <Sparkles className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No preview yet</h3>
                  <p className="text-gray-500">Enter a directive and click Compose</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Panel */}
          <motion.div 
            initial={{x:20,opacity:0}} 
            animate={{x:0,opacity:1}} 
            transition={{delay:0.2}}
            className="col-span-12 lg:col-span-3 bg-white rounded-2xl shadow-xl p-6 border border-gray-200"
          >
            <h2 className="text-lg font-bold mb-4">Properties</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  Status
                </p>
                <p className="text-sm font-medium">{preview ? "✓ Composed" : "○ Empty"}</p>
              </div>

              <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl border border-gray-200">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Actions
                </p>
                <button className="w-full py-2.5 px-4 bg-white border-2 border-gray-200 rounded-lg text-sm font-medium hover:border-indigo-300 hover:shadow-md transition mb-2">
                  <Download className="h-4 w-4 inline mr-2" />
                  Export
                </button>
                <button className="w-full py-2.5 px-4 bg-white border-2 border-gray-200 rounded-lg text-sm font-medium hover:border-indigo-300 hover:shadow-md transition">
                  Edit Blocks
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/90 backdrop-blur-lg">
        <div className="px-6 h-12 flex items-center justify-between text-sm">
          <span className="text-gray-600">✓ All changes saved locally</span>
          <span className="text-gray-500">Version 1.0.0</span>
        </div>
      </footer>
    </div>
  );
}
