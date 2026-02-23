import React from 'react';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-900">
          Privacy Policy
        </h1>
        
        <div className="prose prose-lg max-w-none text-slate-700">
          <p className="text-slate-500 text-center mb-12">
            Last updated: February 2025
          </p>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">1. What Information We Collect</h2>
          <p>We collect only the information you give us:</p>
          <ul className="list-disc pl-6 space-y-3">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Password (encrypted – we never see it in plain text)</li>
            <li>Ticket information (service, office, ticket number, time created)</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">2. How We Use Your Information</h2>
          <p>We use it only to:</p>
          <ul className="list-disc pl-6 space-y-3">
            <li>Create and manage your tickets</li>
            <li>Show you your queue position and estimated wait time</li>
            <li>Send you notifications when your turn is near (optional)</li>
            <li>Help service providers manage queues</li>
            <li>Improve the app</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">3. We Do NOT Sell Your Data</h2>
          <p className="font-medium text-lg">
            We never sell, rent, or share your personal information with third parties for marketing or advertising.
          </p>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">4. Who Can See Your Information</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>Only you (your own tickets and profile)</li>
            <li>Staff at the service/office you are visiting (only your ticket number and name – not email or phone)</li>
            <li>Our technical team (only when fixing problems)</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">5. How We Protect Your Data</h2>
          <p>
            We use encryption, secure servers, and strong passwords. We regularly check for security problems. However, no system is 100% safe — we will notify you if we ever have a serious breach.
          </p>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">6. Your Rights</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>You can delete your account at any time (contact support)</li>
            <li>You can ask to see what data we have about you</li>
            <li>You can ask us to correct or delete your information</li>
          </ul>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">7. Cookies & Tracking</h2>
          <p>
            We use small files (cookies) to remember you are logged in and improve your experience. You can turn off cookies in your browser, but some features may not work.
          </p>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">8. Changes to This Policy</h2>
          <p>
            We may update this policy. We will tell you about big changes via email or in the app.
          </p>

          <h2 className="text-3xl font-semibold mt-12 mb-6 text-slate-900">9. Contact Us</h2>
          <p>
            Questions about privacy? Email us at: privacy@queueless.et
          </p>

          <p className="mt-12 text-center text-slate-500 italic">
            Thank you for trusting QueueLess with your information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;