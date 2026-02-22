// src/pages/Benefits.jsx
import { useState } from 'react';
import { 
  Clock, Smartphone, ShieldCheck, Users, Zap, BarChart3, 
  ArrowRight, CheckCircle2, Ticket 
} from 'lucide-react';

const benefits = [
  {
    icon: Clock,
    title: "Skip the Line Forever",
    description: "No more standing in long queues under the sun. Book your spot digitally and arrive just when it's your turn.",
    color: "from-emerald-500 to-teal-500",
    details: "Save 1–3 hours per visit on average."
  },
  {
    icon: Zap,
    title: "Instant Digital Tickets",
    description: "Get your ticket number in seconds via phone or computer. No paper, no waiting at the counter to register.",
    color: "from-green-500 to-emerald-600",
    details: "Works even with slow internet — lightweight & fast."
  },
  {
    icon: Smartphone,
    title: "Real-Time Updates on Your Phone",
    description: "See exactly when your number is approaching. Get notified when it's almost your turn.",
    color: "from-cyan-500 to-teal-600",
    details: "Push notifications coming soon."
  },
  {
    icon: BarChart3,
    title: "Smart Wait Time Predictions",
    description: "Know in advance how long you'll wait based on real service speed and current queue length.",
    color: "from-blue-500 to-cyan-600",
    details: "More accurate than guessing."
  },
  {
    icon: Users,
    title: "Staff-Friendly Queue Management",
    description: "Staff see live queues, call next customer with one click, and update statuses instantly.",
    color: "from-purple-500 to-indigo-600",
    details: "Reduces confusion and arguments."
  },
  {
    icon: ShieldCheck,
    title: "Secure & Private",
    description: "Your personal information is encrypted and never shared. Only used for your tickets.",
    color: "from-amber-500 to-orange-600",
    details: "GDPR-inspired protection."
  },
  {
    icon: Ticket,
    title: "One System — Many Services",
    description: "Use the same account for passport, ID, banking, hospital, university, and more services.",
    color: "from-pink-500 to-rose-600",
    details: "Future-proof platform."
  }
];

const Benefits = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-emerald-50/30 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-6 text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-6">
          Why Choose <span className="text-green-600">QueueLess</span>
        </h1>
        <p className="text-xl text-zinc-600 max-w-3xl mx-auto">
          Save time, reduce stress, and experience modern queue management designed for Ethiopia.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className={`
                  group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 
                  transition-all duration-500 hover:shadow-2xl hover:-translate-y-2
                  ${isHovered ? 'ring-2 ring-green-400/50' : ''}
                `}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${benefit.color} rounded-t-3xl`} />

                <div className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center mb-6
                  bg-gradient-to-br ${benefit.color} text-white shadow-lg
                  transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6
                `}>
                  <Icon size={32} strokeWidth={1.8} />
                </div>

                <h3 className="text-2xl font-semibold text-zinc-900 mb-4">
                  {benefit.title}
                </h3>

                <p className="text-zinc-600 mb-6 leading-relaxed">
                  {benefit.description}
                </p>

                <div className={`
                  overflow-hidden transition-all duration-500 ease-in-out
                  ${isHovered ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0'}
                `}>
                  <div className="flex items-center gap-2 text-green-600 font-medium">
                    <CheckCircle2 size={18} />
                    <span>{benefit.details}</span>
                  </div>
                </div>

                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="text-green-500" size={24} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 mt-20 text-center">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-3xl p-12 text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">Ready to Skip the Line?</h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands who already save hours every week with QueueLess.
          </p>
          <a
            href="/register"
            className="inline-block bg-white text-green-700 px-12 py-5 rounded-2xl text-xl font-semibold hover:bg-gray-100 transition transform hover:scale-105 shadow-lg"
          >
            Get Started Free
          </a>
        </div>
      </div>
    </div>
  );
};

export default Benefits;