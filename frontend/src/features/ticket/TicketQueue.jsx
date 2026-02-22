import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  getTicketsByService, 
  updateTicketStatus, 
  clearTicketMessages,
  setCurrentService 
} from "./ticketSlice.js";
import { getAllServices } from "../service/serviceSlice.js";
import { Ticket, User, Clock, CheckCircle2, RefreshCw, PhoneCall } from "lucide-react";

const TicketQueue = () => {
  const dispatch = useDispatch();
  
  const { currentQueue, isLoading, error, successMsg, currentServiceId } = useSelector((state) => state.ticket);
  const { services } = useSelector((state) => state.service);
  const { user } = useSelector((state) => state.auth);

  const [selectedService, setSelectedService] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // Load services & initial queue
  useEffect(() => {
    dispatch(getAllServices());
    return () => dispatch(clearTicketMessages());
  }, [dispatch]);

  // Auto-load queue when service changes
  useEffect(() => {
    if (selectedService) {
      dispatch(getTicketsByService(selectedService));
      dispatch(setCurrentService(selectedService));
    }
  }, [selectedService, dispatch]);

  // Live refresh every 8 seconds
  useEffect(() => {
    if (!selectedService) return;
    const interval = setInterval(() => {
      dispatch(getTicketsByService(selectedService));
    }, 8000);
    return () => clearInterval(interval);
  }, [selectedService, dispatch]);

  const handleStatusUpdate = (ticketId, newStatus) => {
    dispatch(updateTicketStatus({ ticketId, status: newStatus }));
  };

  const handleRefresh = async () => {
    if (!selectedService) return;
    setRefreshing(true);
    await dispatch(getTicketsByService(selectedService));
    setRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "waiting": return "bg-blue-100 text-blue-700";
      case "serving": return "bg-amber-100 text-amber-700";
      case "completed": return "bg-emerald-100 text-emerald-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getActionButtons = (ticket) => {
    if (ticket.status === "waiting") {
      return (
        <>
          <button
            onClick={() => handleStatusUpdate(ticket.id, "serving")}
            className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition"
          >
            <PhoneCall className="w-5 h-5" />
            Call Next
          </button>
          <button
            onClick={() => handleStatusUpdate(ticket.id, "cancelled")}
            className="flex-1 bg-red-100 text-red-600 py-3 rounded-2xl font-semibold hover:bg-red-200 transition"
          >
            Cancel
          </button>
        </>
      );
    }
    if (ticket.status === "serving") {
      return (
        <>
          <button
            onClick={() => handleStatusUpdate(ticket.id, "completed")}
            className="flex-1 bg-emerald-600 text-white py-3 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition"
          >
            <CheckCircle2 className="w-5 h-5" />
            Complete
          </button>
          <button
            onClick={() => handleStatusUpdate(ticket.id, "cancelled")}
            className="flex-1 bg-red-100 text-red-600 py-3 rounded-2xl font-semibold hover:bg-red-200 transition"
          >
            Cancel
          </button>
        </>
      );
    }
    return null;
  };

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-br from-zinc-50 to-emerald-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-semibold tracking-tighter text-zinc-900">Live Queue</h1>
            <p className="text-zinc-500 mt-1">Manage customers in real time</p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 bg-white border border-zinc-200 px-6 py-3 rounded-3xl font-medium hover:bg-zinc-50 transition"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Service Selector */}
        <div className="bg-white rounded-3xl p-2 mb-10 shadow-sm">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`px-8 py-4 rounded-2xl font-semibold whitespace-nowrap transition-all flex items-center gap-3 ${
                  selectedService === service.id
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl shadow-emerald-500/30"
                    : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                }`}
              >
                <Ticket className="w-5 h-5" />
                {service.name}
              </button>
            ))}
          </div>
        </div>

        {/* Queue */}
        {isLoading && !currentQueue.length ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          </div>
        ) : !selectedService ? (
          <div className="bg-white rounded-3xl p-20 text-center">
            <Ticket className="w-20 h-20 mx-auto text-zinc-300" />
            <p className="text-zinc-400 mt-8 text-2xl">Select a service to view the queue</p>
          </div>
        ) : currentQueue.length === 0 ? (
          <div className="bg-white rounded-3xl p-20 text-center">
            <div className="text-emerald-600 text-6xl mb-4">🎉</div>
            <p className="text-zinc-400 text-2xl">Queue is empty</p>
            <p className="text-zinc-500 mt-2">No one waiting right now</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {currentQueue.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-emerald-100 group"
              >
                <div className="h-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500" />

                <div className="p-8">
                  {/* Big Ticket */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-zinc-900 to-black rounded-3xl flex items-center justify-center relative">
                      <div className="text-center">
                        <div className="text-[10px] text-emerald-400 font-mono tracking-[2px] uppercase">NOW</div>
                        <div className="text-6xl font-bold text-white tracking-[-2px] -mt-1">#{ticket.ticket_number}</div>
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-2 border-white">
                        <span className="text-[10px] text-white font-bold">LIVE</span>
                      </div>
                    </div>

                    <div className={`px-6 py-2 rounded-2xl text-sm font-semibold ${getStatusColor(ticket.status)}`}>
                      {ticket.status.toUpperCase()}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center gap-3 text-zinc-600">
                      <User className="w-5 h-5" />
                      <span>Customer #{ticket.user_id}</span>
                    </div>
                    <div className="flex items-center gap-3 text-zinc-600">
                      <Clock className="w-5 h-5" />
                      <span>Queued {new Date(ticket.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-10 flex gap-3">
                    {getActionButtons(ticket)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && <div className="mt-10 text-red-600 bg-red-50 p-5 rounded-3xl text-center">{error}</div>}
        {successMsg && <div className="mt-10 text-emerald-600 bg-emerald-50 p-5 rounded-3xl text-center font-medium">{successMsg}</div>}
      </div>
    </div>
  );
};

export default TicketQueue;