// src/pages/HowItWorks.jsx
import { useEffect, useRef } from 'react';
import { 
  UserPlus, Ticket, Smartphone, Bell, 
  Users, ListChecks, PhoneCall, CheckCircle2, 
  ArrowRight, ArrowDownToLine 
} from 'lucide-react';

const customerSteps = [
  {
    icon: UserPlus,
    number: "01",
    title: "Sign Up or Log In",
    description: "Create a free account in seconds using your phone number or email. No complicated forms.",
    color: "from-emerald-500 to-teal-600"
  },
  {
    icon: Ticket,
    number: "02",
    title: "Choose Service & Office",
    description: "Pick the service you need (ATM, National ID, Hospital, University clearance, etc.) and the nearest location.",
    color: "from-green-500 to-emerald-600"
  },
  {
    icon: Smartphone,
    number: "03",
    title: "Get Your Digital Ticket",
    description: "Instantly receive a ticket number. No paper, no waiting in line to register.",
    color: "from-cyan-500 to-teal-600"
  },
  {
    icon: Bell,
    number: "04",
    title: "Wait Comfortably",
    description: "Track your position in real-time. Get notified when your turn is close  stay at home or run errands.",
    color: "from-blue-500 to-cyan-600"
  },
  {
    icon: CheckCircle2,
    number: "05",
    title: "Get Served",
    description: "Arrive when called. Fast, fair, and stress-free service.",
    color: "from-emerald-600 to-green-700"
  }
];

const staffSteps = [
  {
    icon: Users,
    number: "01",
    title: "Log In as Staff",
    description: "Use your assigned credentials to access the staff dashboard.",
    color: "from-indigo-500 to-violet-600"
  },
  {
    icon: ListChecks,
    number: "02",
    title: "See Live Queue",
    description: "View waiting customers, current serving number, and estimated wait time in real-time.",
    color: "from-violet-500 to-purple-600"
  },
  {
    icon: PhoneCall,
    number: "03",
    title: "Call Next Customer",
    description: "Click 'Call Next'  the system automatically advances the queue and updates the next ticket to 'serving'.",
    color: "from-purple-500 to-pink-600"
  },
  {
    icon: CheckCircle2,
    number: "04",
    title: "Serve & Complete",
    description: "Help the customer, then mark the ticket as completed. The next person is automatically ready.",
    color: "from-pink-500 to-rose-600"
  }
];

const HowItWorks = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-12');
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/30 pt-24 pb-32">
      <div className="max-w-5xl mx-auto px-6 text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6">
          How QueueLess Works
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto">
          Simple, fast, and fair for customers and service providers alike.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <div className="inline-block bg-green-100 text-green-700 px-6 py-2 rounded-full text-lg font-medium mb-4">
            For Customers
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Get Service Without Waiting
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {customerSteps.map((step, idx) => (
            <div
              key={idx}
              ref={(el) => (sectionsRef.current[idx] = el)}
              className="relative bg-white rounded-3xl p-8 shadow-lg border border-slate-100 
                         opacity-0 translate-y-12 transition-all duration-700 ease-out hover:shadow-2xl hover:-translate-y-2"
              style={{ transitionDelay: `${idx * 150}ms` }}
            >

              <div className="absolute -top-5 -right-5 w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                {step.number}
              </div>

              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${step.color} text-white shadow-lg transform transition-transform group-hover:scale-110`}>
                <step.icon size={44} strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 flex justify-center mb-32">
        <div className="h-1 w-32 bg-gradient-to-r from-green-400 to-emerald-600 rounded-full" />
      </div>


      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center mb-16">
          <div className="inline-block bg-indigo-100 text-indigo-700 px-6 py-2 rounded-full text-lg font-medium mb-4">
            For Service Providers & Staff
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Manage Queues Effortlessly
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {staffSteps.map((step, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-3xl p-8 shadow-lg border border-slate-100 
                         hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
            >
 
              <div className="absolute -top-5 -right-5 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center text-xl font-bold shadow-lg">
                {step.number}
              </div>

              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 bg-gradient-to-br ${step.color} text-white shadow-lg`}>
                <step.icon size={44} strokeWidth={1.5} />
              </div>

              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;