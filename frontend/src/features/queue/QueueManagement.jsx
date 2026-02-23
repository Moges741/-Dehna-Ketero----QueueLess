import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  getQueueStatus, 
  callNextTicket, 
  getWaitingCount, 
  getEstimatedTime,
  clearQueueMessages 
} from "./queueSlice.js";
import { getAllServices } from "../service/serviceSlice.js";
import { getTicketsByService } from "../ticket/ticketSlice.js"; 
import { Ticket, Users, Clock, PhoneCall, RefreshCw } from "lucide-react";

const QueueManagement = () => {
  const dispatch = useDispatch();

  const { services } = useSelector((state) => state.service);
  const { currentStatus, waitingCount, estimatedMinutes, successMsg, error } = useSelector((state) => state.queue);
  const { currentQueue } = useSelector((state) => state.ticket); 

  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const selectedService = services.find(s => s.id === selectedServiceId);

  useEffect(() => {
    dispatch(getAllServices());
    return () => dispatch(clearQueueMessages());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedServiceId) return;

    const fetchAll = () => {
      dispatch(getQueueStatus(selectedServiceId));
      dispatch(getWaitingCount(selectedServiceId));
      dispatch(getEstimatedTime(selectedServiceId));
      dispatch(getTicketsByService(selectedServiceId));
    };

    fetchAll();

    const interval = setInterval(fetchAll, 5000); // Live every 5s
    return () => clearInterval(interval);
  }, [selectedServiceId, dispatch]);

  const handleCallNext = () => {
    if (!selectedService) return;
    dispatch(callNextTicket({
      service_id: selectedServiceId,
      office_id: selectedService.office_id
    }));
  };

  const handleRefresh = async () => {
    if (!selectedServiceId) return;
    setRefreshing(true);
    dispatch(getQueueStatus(selectedServiceId));
    dispatch(getWaitingCount(selectedServiceId));
    dispatch(getEstimatedTime(selectedServiceId));
    dispatch(getTicketsByService(selectedServiceId));
    setTimeout(() => setRefreshing(false), 600);
  };

  const nowServing = currentStatus?.current_ticket_number || 0;

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-br from-zinc-50 to-emerald-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h1 className="text-6xl font-semibold tracking-tighter text-zinc-900">Live Queue</h1>
            <p className="text-zinc-500 text-xl mt-2">Manage customers in real time</p>
          </div>
          <button
            onClick={handleRefresh}
            className="flex items-center gap-3 bg-white px-8 py-4 rounded-3xl shadow-sm hover:shadow-md transition"
          >
            <RefreshCw className={`w-6 h-6 ${refreshing ? "animate-spin" : ""}`} />
            <span className="font-medium">Refresh Now</span>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-3 mb-12 shadow-sm flex gap-3 overflow-x-auto pb-4">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedServiceId(service.id)}
              className={`px-10 py-5 rounded-2xl font-semibold text-lg whitespace-nowrap transition-all flex-shrink-0 ${
                selectedServiceId === service.id
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-xl"
                  : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
              }`}
            >
              {service.name}
            </button>
          ))}
        </div>

        {!selectedServiceId ? (
          <div className="bg-white rounded-3xl p-24 text-center">
            <Ticket className="w-24 h-24 mx-auto text-zinc-300" />
            <p className="text-3xl text-zinc-400 mt-8">Select a service to start</p>
          </div>
        ) : (
          <>
            <div className="bg-gradient-to-br from-zinc-900 to-black text-white rounded-3xl p-16 text-center mb-10 relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff15_0%,transparent_70%)]" />
              <p className="uppercase tracking-[4px] text-emerald-400 text-sm font-mono mb-4">NOW SERVING</p>
              <div className="text-[12rem] leading-none font-bold tracking-[-8px] tabular-nums">
                #{nowServing || "—"}
              </div>
              <p className="text-2xl text-emerald-400 mt-4 font-medium">
                {selectedService?.name}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-3xl p-10 shadow-sm">
                <div className="flex items-center gap-4">
                  <Users className="w-10 h-10 text-emerald-600" />
                  <div>
                    <div className="text-6xl font-semibold tabular-nums">{waitingCount}</div>
                    <div className="text-zinc-500 text-lg">Waiting</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-10 shadow-sm">
                <div className="flex items-center gap-4">
                  <Clock className="w-10 h-10 text-amber-600" />
                  <div>
                    <div className="text-6xl font-semibold tabular-nums">{estimatedMinutes}</div>
                    <div className="text-zinc-500 text-lg">Est. Wait (min)</div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleCallNext}
              className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:brightness-110 active:scale-[0.985] text-white text-3xl font-semibold py-16 rounded-3xl shadow-2xl flex items-center justify-center gap-6 mb-12"
            >
              <PhoneCall className="w-12 h-12" />
              CALL NEXT TICKET
            </button>

            <div className="bg-white rounded-3xl p-10">
              <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                <Ticket className="w-7 h-7" /> Waiting List
              </h3>

              {currentQueue.length === 0 ? (
                <div className="text-center py-16 text-zinc-400 text-xl">
                  Queue is empty 🎉
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentQueue.map((ticket) => (
                    <div key={ticket.id} className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8">
                      <div className="text-5xl font-bold text-zinc-900">#{ticket.ticket_number}</div>
                      <div className="text-sm text-zinc-500 mt-6">
                        Joined at {new Date(ticket.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {successMsg && (
          <div className="fixed bottom-8 right-8 bg-emerald-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex gap-3">
            ✅ {successMsg}
          </div>
        )}
        {error && <div className="mt-8 text-red-600 bg-red-50 p-6 rounded-3xl text-center">{error}</div>}
      </div>
    </div>
  );
};

export default QueueManagement;