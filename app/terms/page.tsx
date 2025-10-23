import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Creative Workspace',
  description: 'Terms of Service for Creative Workspace',
};

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Terms of Service</h1>
          <p className="text-slate-500 mb-8">Last updated: October 23, 2025</p>

          <div className="prose prose-slate max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-slate-700 leading-relaxed">
                By accessing and using Creative Workspace, you accept and agree to be bound by 
                these Terms of Service. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Use License</h2>
              <p className="text-slate-700 leading-relaxed mb-3">
                We grant you a personal, non-exclusive, non-transferable license to use our service. 
                You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-700">
                <li>Modify or copy our materials</li>
                <li>Use the materials for commercial purposes without permission</li>
                <li>Attempt to reverse engineer any software</li>
                <li>Remove any copyright or proprietary notations</li>
                <li>Transfer materials to another person</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">3. User Responsibilities</h2>
              <p className="text-slate-700 leading-relaxed">
                You are responsible for maintaining the confidentiality of your account and password. 
                You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">4. Content Ownership</h2>
              <p className="text-slate-700 leading-relaxed">
                You retain all rights to content you create using our platform. By using our service, 
                you grant us a license to host, store, and display your content as necessary to provide 
                the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">5. Payment Terms</h2>
              <p className="text-slate-700 leading-relaxed">
                Premium features require payment. All fees are in USD and non-refundable unless 
                otherwise stated. We reserve the right to change our pricing at any time with 30 days notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-slate-700 leading-relaxed">
                We shall not be liable for any indirect, incidental, special, consequential, or 
                punitive damages resulting from your use of or inability to use the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">7. Termination</h2>
              <p className="text-slate-700 leading-relaxed">
                We may terminate or suspend your account immediately, without prior notice, for any 
                breach of these Terms. Upon termination, your right to use the service will cease immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">8. Changes to Terms</h2>
              <p className="text-slate-700 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any 
                material changes via email or through our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">9. Contact Us</h2>
              <p className="text-slate-700 leading-relaxed">
                If you have any questions about these Terms, please contact us at:{' '}
                <a href="mailto:support@creativeworkspace.com" className="text-violet-600 hover:underline">
                  support@creativeworkspace.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}