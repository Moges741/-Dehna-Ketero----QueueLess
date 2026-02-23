
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createTicket, clearTicketMessages } from "./ticketSlice.js";
import { getAllOffices } from "../office/officeSlice.js";
import { getAllServices } from "../service/serviceSlice.js"; 
import { Ticket, Building2, ListChecks, CheckCircle2 } from "lucide-react";

const CreateTicket = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const { offices } = useSelector((state) => state.office);
  const { services } = useSelector((state) => state.service);
  const {  isLoading, error, successMsg, currentTicket } = useSelector((state) => state.ticket);
  const { user } = useSelector((state) => state.auth);

  const [selectedOffice, setSelectedOffice] = useState("");
  const [selectedService, setSelectedService] = useState("");

  useEffect(() => {
    dispatch(getAllOffices());
    dispatch(getAllServices()); 
    return () => dispatch(clearTicketMessages());
  }, [dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedOffice || !selectedService) return;

    dispatch(createTicket({
      office_id: selectedOffice,
      service_id: selectedService
    }));
  };

  useEffect(() => {
    if (currentTicket && successMsg) {
      const timer = setTimeout(() => {
        navigate("/dashboard"); 
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentTicket, successMsg, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-6 pt-24">
      <div className="w-full max-w-2xl">
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/60 overflow-hidden">

          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-12 text-white relative">
            <div className="absolute inset-0 bg-[radial-gradient(at_top_right,#ffffff20_0%,transparent_60%)]" />
            <div className="relative z-10 flex items-center gap-5">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30">
                <Ticket className="w-9 h-9" strokeWidth={1.5} />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Get Your Ticket</h1>
                <p className="text-emerald-100 mt-2 text-lg">Skip the line  instantly.</p>
              </div>
            </div>
          </div>

          <div className="p-10 md:p-12">
            {successMsg && currentTicket ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle2 className="w-14 h-14 text-emerald-600" />
                </div>
                <h2 className="text-5xl md:text-6xl font-bold text-emerald-700 tracking-tighter mb-4">
                  #{currentTicket.ticketNumber}
                </h2>
                <p className="text-2xl text-emerald-600 font-medium mb-6">
                  Your ticket is booked!
                </p>
                <p className="text-zinc-600 text-lg">
                  Redirecting to your tickets...
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
             
                <div>
                  <label className="flex items-center gap-3 text-lg font-medium text-zinc-700 mb-3">
                    <Building2 className="w-6 h-6 text-emerald-600" />
                    Choose Location / Office
                  </label>
                  <select
                    value={selectedOffice}
                    onChange={(e) => {
                      setSelectedOffice(e.target.value);
                      setSelectedService(""); 
                    }}
                    className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
                    required
                  >
                    <option value="">Select an office</option>
                    {offices.map((office) => (
                      <option key={office.id} value={office.id}>
                        {office.name} — {office.city}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="flex items-center gap-3 text-lg font-medium text-zinc-700 mb-3">
                    <ListChecks className="w-6 h-6 text-emerald-600" />
                    Choose Service
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full bg-white border border-zinc-200 rounded-2xl px-6 py-5 text-lg focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
                    disabled={!selectedOffice}
                    required
                  >
                    <option value="">Select a service</option>
                   {services && Array.isArray(services) && services.length > 0 ? (
  services
    .filter(s => !selectedOffice || s.office_id === Number(selectedOffice))
    .map((service) => (
      <option key={service.id} value={service.id}>
        {service.name} {service.avg_duration_minutes && `(~${service.avg_duration_minutes} min)`}
      </option>
    ))
) : (
  <option value="" disabled>
    {services ? "No services available" : "Loading services..."}
  </option>
)}
                  </select>
                </div>

              
                <button
                  type="submit"
                  disabled={isLoading || !selectedOffice || !selectedService}
                  className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xl py-6 rounded-2xl transition-all duration-300 active:scale-[0.98] shadow-xl shadow-emerald-500/30 flex items-center justify-center gap-4 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin h-7 w-7 text-white" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Creating Ticket...
                    </>
                  ) : (
                    "Get My Ticket Now"
                  )}
                </button>

                {error && (
                  <div className="text-red-600 bg-red-50 p-5 rounded-2xl text-center font-medium mt-4">
                    {error}
                  </div>
                )}
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-zinc-500 mt-10 text-sm">
          Powered by QueueLess • {user?.name || "Welcome"}
        </p>
      </div>
    </div>
  );
};

export default CreateTicket;