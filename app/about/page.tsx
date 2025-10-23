import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Zap, Users, Target } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Creative Workspace',
  description: 'Learn about Creative Workspace - AI-powered design platform',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">About Creative Workspace</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Empowering creators to build stunning websites with the power of AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-violet-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Mission</h2>
            <p className="text-slate-600 leading-relaxed">
              To democratize professional web design by combining cutting-edge AI technology 
              with intuitive user experience, making it accessible to everyone.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Our Vision</h2>
            <p className="text-slate-600 leading-relaxed">
              A world where anyone can bring their creative ideas to life without technical 
              barriers, powered by intelligent design tools.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                <Zap className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Lightning Fast</h3>
              <p className="text-slate-600">
                Generate professional designs in seconds, not hours or days.
              </p>
            </div>

            <div>
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">AI-Powered</h3>
              <p className="text-slate-600">
                Advanced AI understands your vision and creates stunning results.
              </p>
            </div>

            <div>
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">User Friendly</h3>
              <p className="text-slate-600">
                No design or coding experience required. Anyone can create.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl shadow-lg p-8 md:p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Our Story</h2>
          <p className="text-lg leading-relaxed mb-4">
            Creative Workspace was born from a simple observation: talented people with great ideas 
            often struggle to bring them to life online. Traditional web design tools are either too 
            complex or too limiting.
          </p>
          <p className="text-lg leading-relaxed mb-4">
            We set out to build something different—a platform that combines the power of artificial 
            intelligence with intuitive design principles, creating a tool that feels natural and 
            empowering.
          </p>
          <p className="text-lg leading-relaxed">
            Today, Creative Workspace helps thousands of creators, entrepreneurs, and businesses 
            build beautiful online experiences without compromise.
          </p>
        </div>
      </div>
    </div>
  );
}