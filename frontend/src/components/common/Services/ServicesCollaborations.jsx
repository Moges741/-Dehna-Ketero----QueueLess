
import { useState, useEffect } from 'react';
import { 
  Building2, Hospital, University, Landmark, 
  CreditCard, Phone, FileText, ShieldCheck, 
  ArrowRight, Users, Clock, CheckCircle 
} from 'lucide-react';

const organizations = [
  {
    name: "Commercial Bank of Ethiopia",
    icon: Landmark,
    color: "from-blue-600 to-blue-800",
    description: "ATM, account services, loan clearance",
    logoStyle: "bg-gradient-to-br from-blue-500 to-blue-700"
  },
  {
    name: "Ethio Telecom",
    icon: Phone,
    color: "from-green-600 to-emerald-700",
    description: "SIM registration, bill payment, service requests",
    logoStyle: "bg-gradient-to-br from-green-500 to-emerald-600"
  },
  {
    name: "Hospitals & Clinics",
    icon: Hospital,
    color: "from-red-500 to-rose-600",
    description: "Appointment booking, lab results, pharmacy queue",
    logoStyle: "bg-gradient-to-br from-red-500 to-rose-600"
  },
  {
    name: "Universities & Colleges",
    icon: University,
    color: "from-indigo-600 to-violet-700",
    description: "Student ID, clearance, exam registration, dormitory",
    logoStyle: "bg-gradient-to-br from-indigo-500 to-violet-600"
  },
  {
    name: "National ID / Kebele",
    icon: FileText,
    color: "from-amber-500 to-orange-600",
    description: "ID renewal, birth certificate, residence proof",
    logoStyle: "bg-gradient-to-br from-amber-500 to-orange-600"
  }
];

const specificServices = [
  { icon: CreditCard, title: "ATM & Banking Services", org: "Banks", desc: "Withdraw, deposit, statement printing without long queues" },
  { icon: FileText, title: "National ID & Passport", org: "Immigration / Vital Events", desc: "Application, renewal, status checking" },
  { icon: Hospital, title: "Hospital & Clinic Appointments", org: "Hospitals", desc: "Book doctor, lab, pharmacy queue" },
  { icon: University, title: "University Clearance & Student ID", org: "Universities", desc: "Registration, dormitory, exam hall entry" },
  { icon: ShieldCheck, title: "Police Clearance Certificate", org: "Federal Police", desc: "Employment & visa purposes" },
  { icon: Phone, title: "Ethio Telecom Services", org: "Ethio Telecom", desc: "SIM swap, package change, complaint registration" },
  { icon: Building2, title: "Government Office Services", org: "Various Ministries", desc: "Tax clearance, business license, land certificate" },
  { icon: Clock, title: "Priority & VIP Queues", org: "All Partners", desc: "Elderly, pregnant women, people with disabilities" }
];

const ServicesCollaboration = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % organizations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-emerald-50/40 pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Services & Collaborations
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto font-light">
            QueueLess is proud to partner with major institutions across Ethiopia to bring fast, digital, and fair queue management.
          </p>
        </div>
        <div className="relative h-[480px] md:h-[520px] mb-24 overflow-hidden rounded-3xl shadow-2xl">
          {organizations.map((org, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out
                ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            >
              <div className={`w-full h-full bg-gradient-to-br ${org.color} flex items-center justify-center p-10 md:p-16`}>
                <div className="text-center text-white max-w-3xl">
                  <div className={`w-28 h-28 md:w-36 md:h-36 mx-auto rounded-3xl flex items-center justify-center mb-8 shadow-2xl transform transition-transform duration-700
                    ${index === currentSlide ? 'scale-110 rotate-6' : 'scale-90'}`}>
                    <org.icon size={80} strokeWidth={1.5} />
                  </div>
                  <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                    {org.name}
                  </h2>
                  <p className="text-xl md:text-2xl opacity-90 mb-10">
                    {org.description}
                  </p>
                  <div className="flex justify-center gap-4">
                    <button className="bg-white text-slate-900 px-10 py-4 rounded-2xl font-semibold hover:bg-opacity-90 transition text-lg">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4">
            {organizations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white scale-125 shadow-lg' 
                    : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-slate-800">
            Everyday Services Made Faster
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {specificServices.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div
                  key={idx}
                  className="group bg-white rounded-3xl p-8 shadow-lg border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white mb-6 transform group-hover:scale-110 transition-transform">
                    <Icon size={32} strokeWidth={1.8} />
                  </div>

                  <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {service.desc}
                  </p>

                  <div className="flex items-center gap-2 text-emerald-600 font-medium">
                    <span className="text-sm">Available at</span>
                    <span className="text-sm font-semibold">{service.org}</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesCollaboration;