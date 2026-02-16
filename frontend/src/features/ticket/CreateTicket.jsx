import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTicket, clearTicketMessages } from "./ticketSlice.js";
import { Ticket, Building2, ListChecks, Sparkles } from "lucide-react";
const CreateTicket = () =>{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { offices, services, isLoading, error, successMsg, currentTicket } = useSelector((state) => state.ticket);
    const { user } = useSelector((state) => state.auth);
    const [form, setForm] = useState({ office_id: "", service_id: "" });

const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTicket(form));
  };
  useEffect(() => {
    if (currentTicket) {
      const timer = setTimeout(() => {
        navigate("/tickets");
      }, 2800);
      return () => clearTimeout(timer);
    }
  }, [currentTicket, navigate]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Glass Card */}
        <div className="bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#ffffff20_0%,transparent_50%)]" />
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
                <Ticket className="w-9 h-9" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-4xl font-semibold tracking-tighter">Get your ticket</h1>
                <p className="text-emerald-100 mt-1">Skip the line. Instant service.</p>
              </div>
            </div>
          </div>

          <div className="p-10">
            {successMsg && currentTicket && (
              <div className="text-center py-12">
                <div className="mx-auto w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <Sparkles className="w-12 h-12 text-emerald-600" />
                </div>
                <h2 className="text-5xl font-bold text-emerald-700 tracking-tighter">
                  #{currentTicket.ticketNumber}
                </h2>
                <p className="text-emerald-600 mt-2 text-lg">You're in the queue!</p>
                <p className="text-gray-500 mt-8">Redirecting to your tickets...</p>
              </div>
            )}

            {!currentTicket && (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Office */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                    <Building2 className="w-4 h-4" />
                    Choose Office
                  </label>
                  <select
                    value={form.office_id}
                    onChange={(e) => setForm({ ...form, office_id: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500 transition text-lg"
                    required
                  >
                    <option value="">Select an office</option>
                    {offices.map((office) => (
                      <option key={office.id} value={office.id}>
                        {office.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Service */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
                    <ListChecks className="w-4 h-4" />
                    Choose Service
                  </label>
                  <select
                    value={form.service_id}
                    onChange={(e) => setForm({ ...form, service_id: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500 transition text-lg"
                    required
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-xl py-5 rounded-2xl transition-all duration-300 active:scale-[0.985] shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-3 disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating your ticket...
                    </>
                  ) : (
                    "Get My Ticket Now"
                  )}
                </button>

                {error && (
                  <div className="text-red-600 text-center bg-red-50 py-3 rounded-2xl text-sm font-medium">
                    {error}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-8">
          Powered by instant queue system • {user?.name}
        </p>
      </div>
    </div>
  );

}

export default CreateTicket;
