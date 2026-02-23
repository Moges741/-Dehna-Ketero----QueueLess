// src/components/Footer.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Twitter, Facebook, Instagram, Linkedin, 
  ArrowUp, Mail, Send, Heart 
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-slate-900 to-black text-white pt-24 pb-12 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-emerald-600/20 to-transparent pointer-events-none">
        <svg
          className="absolute bottom-0 w-full h-32"
          preserveAspectRatio="none"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 60C240 20 480 100 720 60C960 20 1200 100 1440 60V120H0V60Z"
            fill="#065f46"
            fillOpacity="0.4"
          />
          <path
            d="M0 80C240 40 480 120 720 80C960 40 1200 120 1440 80V120H0V80Z"
            fill="#047857"
            fillOpacity="0.3"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          <div>
            <Link to="/" className="text-3xl font-bold tracking-tight inline-block mb-6">
              Queue<span className="text-emerald-400">Less</span>
            </Link>
            <p className="text-slate-300 leading-relaxed mb-8">
              Skip waiting lines. Get instant digital tickets and manage services effortlessly.
            </p>
            <div className="flex gap-5">
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-transform hover:scale-110">
                <Twitter size={22} />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-transform hover:scale-110">
                <Facebook size={22} />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-transform hover:scale-110">
                <Instagram size={22} />
              </a>
              <a href="#" className="text-slate-400 hover:text-emerald-400 transition-transform hover:scale-110">
                <Linkedin size={22} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
            <ul className="space-y-4">
              {[
                { to: "/how-it-works", label: "How It Works" },
                { to: "/benefits", label: "Why QueueLess" },
                { to: "/services", label: "Services & Partners" },
                { to: "/dashboard", label: "Dashboard" },
                { to: "/contact", label: "Contact Us" }
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-slate-300 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                  >
                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 -ml-6 group-hover:ml-0 transition-all" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">For Everyone</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/create-ticket" className="text-slate-300 hover:text-emerald-400 transition">
                  Create Ticket
                </Link>
              </li>
              <li>
                <Link to="/queue" className="text-slate-300 hover:text-emerald-400 transition">
                  Live Queue (Staff)
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-slate-300 hover:text-emerald-400 transition">
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-300 hover:text-emerald-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-300 hover:text-emerald-400 transition">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Stay Updated</h3>
            <p className="text-slate-300 mb-6">
              Subscribe to get news about new services, features, and tips to skip queues.
            </p>

            <form onSubmit={handleSubscribe} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-5 py-4 text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30 transition"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-xl transition"
              >
                {subscribed ? <CheckCircle size={20} /> : <Send size={20} />}
              </button>
            </form>

            {subscribed && (
              <p className="text-emerald-400 text-sm mt-3 animate-pulse">
                Thank you! You've been subscribed.
              </p>
            )}
          </div>
        </div>

        <div className="border-t border-slate-800 mt-16 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400">
          <p>
            © {new Date().getFullYear()} QueueLess. Made with <Heart size={16} className="inline text-red-500 fill-red-500" /> in Ethiopia.
          </p>
          <div className="flex gap-8">
            <Link to="/privacy" className="hover:text-emerald-400 transition">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-emerald-400 transition">
              Terms
            </Link>
            <Link to="/contact" className="hover:text-emerald-400 transition">
              Contact
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-emerald-600 hover:bg-emerald-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 z-50"
        aria-label="Back to top"
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;