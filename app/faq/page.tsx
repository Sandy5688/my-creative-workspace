'use client';

import Link from 'next/link';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How does Adaptive generation work?',
    answer: 'Our Adaptive analyzes your prompt and generates professional designs by combining advanced language models with design best practices. It creates both visual elements and copy tailored to your specific needs.',
  },
  {
    question: 'Can I edit the generated designs?',
    answer: 'Yes! All generated content is fully editable. You can modify text, images, colors, and layout to perfectly match your vision.',
  },
  {
    question: 'What formats can I export to?',
    answer: 'You can export your designs as HTML/CSS code, publish directly to the web, or download as PDF. Premium users get additional export options including React components.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Yes! You can use basic features for free. Premium features are available with our Pro plan at $9.99/month with a 7-day free trial.',
  },
  {
    question: 'How many designs can I create?',
    answer: 'Free users can create up to 3 designs per month. Pro users get unlimited designs and generations.',
  },
  {
    question: 'Can I use the designs commercially?',
    answer: 'Yes! All designs you create are yours to use commercially. You retain full rights to your content.',
  },
  {
    question: 'What makes Creative Workspace different?',
    answer: 'We focus on quality over quantity, using state-of-the-art Adaptive models to generate professional results. Our intuitive interface makes the creation process smooth and enjoyable.',
  },
  {
    question: 'Do I need design or coding experience?',
    answer: 'Not at all! Creative Workspace is designed for everyone, regardless of technical background. Just describe what you want, and our Adaptive handles the rest.',
  },
  {
    question: 'How do I cancel my subscription?',
    answer: 'You can cancel anytime from your account settings. Your premium features remain active until the end of your billing period.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use industry-standard encryption and security practices. Your designs and data are private and never shared with third parties.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 mb-8 font-medium">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Frequently Asked Questions</h1>
          <p className="text-slate-600 text-lg">Everything you need to know about Creative Workspace</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-violet-600 flex-shrink-0" />
                ) : (
                  <Plus className="w-5 h-5 text-slate-400 flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-slate-600 leading-relaxed">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl shadow-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
          <p className="mb-6">We are here to help! Reach out to our support team.</p>
          <a href="mailto:support@creativeworkspace.com" className="inline-block bg-white text-violet-600 px-6 py-3 rounded-lg font-semibold hover:bg-violet-50 transition-colors">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}