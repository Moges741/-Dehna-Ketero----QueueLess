import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllServices,
} from "../features/service/serviceSlice";
import {
  getQueueStatus,
  callNextTicket,
  getWaitingCount,
  getEstimatedTime,
  clearTicketMessages,
} from "../features/ticket/ticketSlice";
import { Ticket, Users, Clock, ArrowRight, RefreshCw } from "lucide-react";

const QueueManagement = () => {
  const dispatch = useDispatch();

  const { services, isLoading: servicesLoading } = useSelector((state) => state.service);
  const {
    currentQueueStatus,
    waitingCount,
    estimatedTime,
    lastCalledTicket,
    successMsg,
    error,
    isLoading,
  } = useSelector((state) => state.ticket);

  const { user } = useSelector((state) => state.auth);

  const [selectedService, setSelectedService] = useState(null);
  const [selectedOfficeId, setSelectedOfficeId] = useState(null); // Needed for call-next
  const [refreshing, setRefreshing] = useState(false);

  // Load services
  useEffect(() => {
    dispatch(getAllServices());
    return () => dispatch(clearTicketMessages());
  }, [dispatch]);

  // Load queue data when service changes
  useEffect(() => {
    if (!selectedService) return;

    const service = services.find((s) => s.id === selectedService);
    if (service) setSelectedOfficeId(service.office_id);

    const loadData = () => {
      dispatch(getQueueStatus(selectedService));
      dispatch(getWaitingCount(selectedService));
      dispatch(getEstimatedTime(selectedService));
    };

    loadData();

    // Auto-refresh every 10 seconds
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, [selectedService, dispatch, services]);

  const handleCallNext = () => {
    if (!selectedService || !selectedOfficeId) return;

    dispatch(
      callNextTicket({
        serviceId: selectedService,
        officeId: selectedOfficeId,
      })
    );
  };

  const handleRefresh = async () => {
    if (!selectedService) return;
    setRefreshing(true);
    await Promise.all([
      dispatch(getQueueStatus(selectedService)),
      dispatch(getWaitingCount(selectedService)),
      dispatch(getEstimatedTime(selectedService)),
    ]);
    setRefreshing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-emerald-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-semibold tracking-tighter text-zinc-900">Queue Control</h1>
            <p className="text-zinc-500 mt-1">Call next customer and monitor real-time status</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing || isLoading}
            className="flex items-center gap-2 bg-white border border-zinc-200 px-6 py-3 rounded-3xl font-medium hover:bg-zinc-50 transition disabled:opacity-50"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Service Selector */}
        {servicesLoading ? (
          <div className="flex justify-center py-12">
            <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-3 mb-10 shadow-sm border border-zinc-100">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
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
        )}

        {!selectedService ? (
          <div className="bg-white rounded-3xl p-20 text-center border border-zinc-100">
            <Ticket className="w-20 h-20 mx-auto text-zinc-300" />
            <p className="text-zinc-400 mt-8 text-2xl">Select a service to manage its queue</p>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Current Serving */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-500 font-medium">Now Serving</p>
                    <p className="text-6xl font-bold text-emerald-700 tracking-tighter mt-2">
                      {currentQueueStatus?.current_ticket_number || 0}
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center">
                    <ArrowRight className="w-8 h-8 text-emerald-600" />
                  </div>
                </div>
                {lastCalledTicket && (
                  <p className="text-sm text-emerald-600 mt-4">
                    Last called: #{lastCalledTicket}
                  </p>
                )}
              </div>

              {/* Waiting Count */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-500 font-medium">Waiting</p>
                    <p className="text-6xl font-bold text-amber-700 tracking-tighter mt-2">
                      {waitingCount || 0}
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center">
                    <Users className="w-8 h-8 text-amber-600" />
                  </div>
                </div>
              </div>

              {/* Estimated Time */}
              <div className="bg-white rounded-3xl p-8 shadow-sm border border-zinc-100 hover:shadow-xl transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-500 font-medium">Est. Wait Time</p>
                    <p className="text-6xl font-bold text-teal-700 tracking-tighter mt-2">
                      {estimatedTime || 0} min
                    </p>
                  </div>
                  <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center">
                    <Clock className="w-8 h-8 text-teal-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Call Next Button */}
            <div className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-3xl p-12 text-center text-white shadow-2xl">
              <h2 className="text-4xl font-semibold mb-6">Ready for the next customer?</h2>

              <button
                onClick={handleCallNext}
                disabled={isLoading || !waitingCount}
                className="bg-white text-emerald-700 hover:bg-emerald-50 text-3xl font-bold px-16 py-8 rounded-3xl shadow-xl transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-4 mx-auto"
              >
                <Ticket className="w-10 h-10" />
                CALL NEXT
                {isLoading && (
                  <svg className="animate-spin h-8 w-8 text-emerald-700" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
              </button>

              {successMsg && (
                <p className="mt-8 text-xl font-medium bg-white/20 backdrop-blur-sm px-8 py-4 rounded-2xl inline-block">
                  {successMsg}
                </p>
              )}
              {error && (
                <p className="mt-6 text-xl bg-red-500/30 backdrop-blur-sm px-8 py-4 rounded-2xl inline-block">
                  {error}
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QueueManagement;