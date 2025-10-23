import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Creative Workspace',
  description: 'Privacy Policy for Creative Workspace - Learn how we handle your data',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 mb-8 font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
          <p className="text-slate-500 mb-8">Last updated: October 23, 2025</p>

          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
              <p className="text-slate-700 leading-relaxed">
                We collect information you provide directly to us when you create an account, 
                use our services, or communicate with us. This includes your name, email address, 
                and any content you create using our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your transactions and send related information</li>
                <li>Send you technical notices and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Monitor and analyze trends and usage</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Information Sharing</h2>
              <p className="text-slate-700 leading-relaxed">
                We do not share your personal information with third parties except as described 
                in this policy. We may share information with service providers who perform 
                services on our behalf, such as payment processing and data analytics.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Data Security</h2>
              <p className="text-slate-700 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Your Rights</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your data</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Cookies</h2>
              <p className="text-slate-700 leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our service 
                and hold certain information. You can instruct your browser to refuse all cookies 
                or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Contact Us</h2>
              <p className="text-slate-700 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:{' '}
                <a href="mailto:privacy@creativeworkspace.com" className="text-violet-600 hover:underline">
                  privacy@creativeworkspace.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}