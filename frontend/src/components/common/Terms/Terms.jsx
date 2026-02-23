import React from 'react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-900">
          Terms of Service
        </h1>
        
        <div className="prose prose-lg max-w-none text-slate-700">
          <p className="text-slate-500 text-center mb-12">
            Last updated: February 2025
          </p>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By using QueueLess (the "Service"), you agree to these Terms of Service ("Terms"). If you do not agree, please do not use the Service.
          </p>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">2. Who Can Use QueueLess</h2>
          <p>
            You must be at least 13 years old to use QueueLess. If you are under 18, you need permission from a parent or guardian.
          </p>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">3. What You Can Do</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>Create digital tickets for supported services and offices</li>
            <li>View your own tickets and queue status</li>
            <li>Use the Service in good faith and for lawful purposes</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">4. What You Cannot Do</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>Create fake accounts or tickets</li>
            <li>Harass staff or other users</li>
            <li>Try to hack, overload, or damage the system</li>
            <li>Use the Service for illegal activities</li>
            <li>Share your account with others</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">5. Account & Security</h2>
          <p>
            You are responsible for keeping your account safe. If someone else uses your account, we are not responsible for what happens.
          </p>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">6. Tickets & Queues</h2>
          <p>
            Tickets are valid only for the date and service you selected. We are not responsible if the service is delayed, cancelled, or unavailable. Queue position is managed fairly, but we may change rules or suspend service at any time.
          </p>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">7. Termination</h2>
          <p>
            We can suspend or delete your account at any time if you break these Terms or if we need to protect the system.
          </p>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">8. Changes to Terms</h2>
          <p>
            We may update these Terms. We will notify you of big changes (via email or in-app notice). Continued use after changes means you accept them.
          </p>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">9. Contact Us</h2>
          <p>
            If you have questions about these Terms, email us at: support@queueless.et
          </p>

          <p className="mt-12 text-center text-slate-500 italic">
            Thank you for using QueueLess — we hope it saves you time and stress!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;