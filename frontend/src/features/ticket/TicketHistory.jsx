import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyTickets } from "./ticketSlice.js";
import { Ticket, Clock, CheckCircle2, XCircle } from "lucide-react";

const TicketHistory = () => {
  const dispatch = useDispatch();
  const { tickets, isLoading } = useSelector((state) => state.ticket);

  useEffect(() => {
    dispatch(getMyTickets());
  }, [dispatch]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "waiting":
        return <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium">Waiting</span>;
      case "serving":
        return <span className="bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium">Now Serving</span>;
      case "completed":
        return <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Completed</span>;
      case "cancelled":
        return <span className="bg-red-100 text-red-700 px-4 py-1.5 rounded-full text-sm font-medium"><XCircle className="w-4 h-4" /> Cancelled</span>;
      default:
        return <span className="bg-gray-100 text-gray-600 px-4 py-1.5 rounded-full text-sm font-medium">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-semibold tracking-tighter text-gray-900">Your Tickets</h1>
            <p className="text-gray-500 mt-1">All your queue numbers in one place</p>
          </div>
          <div className="text-emerald-600">
            <Ticket className="w-10 h-10" strokeWidth={1.2} />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin w-8 h-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full" />
          </div>
        ) : tickets.length === 0 ? (
          <div className="bg-white rounded-3xl p-16 text-center">
            <Ticket className="w-16 h-16 mx-auto text-gray-300" strokeWidth={1} />
            <p className="text-gray-400 mt-6 text-lg">No tickets yet</p>
            <p className="text-gray-500 mt-2">Create your first ticket to get started</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 group border border-transparent hover:border-emerald-100"
              >
                <div className="flex items-start gap-8">
                  {/* Big Ticket Number */}
                  <div className="w-28 h-28 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center flex-shrink-0 shadow-inner">
                    <div className="text-center">
                      <div className="text-white/70 text-xs tracking-[3px] uppercase font-mono">TICKET</div>
                      <div className="text-5xl font-bold text-white tracking-tighter">#{ticket.ticket_number}</div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center justify-between">
                      {getStatusBadge(ticket.status)}
                      <div className="text-xs text-gray-400 font-mono">
                        {new Date(ticket.queue_date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <div className="flex items-center gap-3 text-gray-600">
                        <Building2 className="w-5 h-5" />
                        <span>Office #{ticket.office_id}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-600">
                        <ListChecks className="w-5 h-5" />
                        <span>Service #{ticket.service_id}</span>
                      </div>
                    </div>

                    <div className="mt-8 text-xs uppercase tracking-widest text-emerald-600 font-medium flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      Created • {new Date(ticket.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketHistory;