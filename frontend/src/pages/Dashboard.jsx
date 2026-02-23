import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, clearMessages } from "../features/auth/authSlice";
import { getMyTickets } from "../features/ticket/ticketSlice";
import { getAllServices } from "../features/service/serviceSlice";
import { getAllOffices } from "../features/office/officeSlice";
import { Ticket, Users, Building2, ListChecks, Clock, LogOut, RefreshCw } from "lucide-react";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, token, isLoading } = useSelector((state) => state.auth);
  const { myTickets } = useSelector((state) => state.ticket);
  const { services } = useSelector((state) => state.service);
  const { offices } = useSelector((state) => state.office);

  const role = user?.role || "user";


  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    dispatch(getMyTickets());
    dispatch(getAllServices());
    dispatch(getAllOffices());


    dispatch(clearMessages());
  }, [dispatch, token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const activeOffices = offices.filter(o => o.is_active).length;
  const activeServices = services.filter(s => s.is_active).length;
  const waitingTickets = myTickets.filter(t => t.status === "waiting").length;

  const currentTicket = myTickets.find(t => ["waiting", "serving"].includes(t.status));

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-50 to-emerald-50">
        <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-br from-zinc-50 to-emerald-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-semibold tracking-tighter text-zinc-900">
              Welcome, {user.name}
            </h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium capitalize">
                {role}
              </span>
              {role !== "user" && (
                <span className="px-4 py-1.5 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                  Staff Access
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition text-red-600 font-medium"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>

        {role === "user" ? (
          <div className="space-y-12">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-10 text-white">
                <h2 className="text-3xl font-semibold">Your Current Ticket</h2>
                <p className="text-emerald-100 mt-2">Real-time status</p>
              </div>

              <div className="p-10">
                {currentTicket ? (
                  <div className="text-center">
                    <div className="text-8xl font-bold text-emerald-700 tracking-tighter">
                      #{currentTicket.ticket_number}
                    </div>
                    <p className="text-2xl text-zinc-700 mt-4 font-medium">
                      {currentTicket.status === "serving" ? "Now Being Served" : "In Queue"}
                    </p>
                    <p className="text-zinc-500 mt-6">
                      Service ID: {currentTicket.service_id} • Office ID: {currentTicket.office_id}
                    </p>
                    <p className="text-emerald-600 mt-2 font-medium">
                      Joined: {new Date(currentTicket.created_at).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <Ticket className="w-24 h-24 mx-auto text-zinc-300" />
                    <p className="text-2xl text-zinc-500 mt-6">No active ticket</p>
                    <button
                      onClick={() => navigate("/services")} 
                      className="mt-8 bg-emerald-600 text-white px-10 py-4 rounded-2xl font-semibold hover:bg-emerald-700 transition"
                    >
                      Create New Service
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-lg">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-semibold">Your Tickets</h3>
                <button className="text-emerald-600 hover:text-emerald-800 font-medium flex items-center gap-2">
                  <RefreshCw className="w-5 h-5" /> Refresh
                </button>
              </div>

              {myTickets.length === 0 ? (
                <div className="text-center py-12 text-zinc-500">
                  No tickets yet. Create one to get started.
                </div>
              ) : (
                <div className="grid gap-6">
                  {myTickets.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between p-6 bg-zinc-50 rounded-2xl border border-zinc-100 hover:border-emerald-200 transition"
                    >
                      <div>
                        <div className="text-xl font-semibold">#{ticket.ticket_number}</div>
                        <div className="text-sm text-zinc-600 mt-1">
                          {ticket.status.toUpperCase()} • {new Date(ticket.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <span
                        className={`px-6 py-2 rounded-full text-sm font-medium ${
                          ticket.status === "waiting"
                            ? "bg-blue-100 text-blue-700"
                            : ticket.status === "serving"
                            ? "bg-amber-100 text-amber-700"
                            : ticket.status === "completed"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : role === "admin" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Admin Stats Cards */}
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition">
              <Users className="w-12 h-12 text-emerald-600 mb-4" />
              <div className="text-4xl font-bold">{user ? "Loading..." : "N/A"}</div> {/* Replace with real count */}
              <p className="text-zinc-600 mt-2">Total Users</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition">
              <Ticket className="w-12 h-12 text-emerald-600 mb-4" />
              <div className="text-4xl font-bold">{myTickets?.length || 0}</div>
              <p className="text-zinc-600 mt-2">Tickets Today</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition">
              <Building2 className="w-12 h-12 text-emerald-600 mb-4" />
              <div className="text-4xl font-bold">{activeOffices}</div>
              <p className="text-zinc-600 mt-2">Active Offices</p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition">
              <ListChecks className="w-12 h-12 text-emerald-600 mb-4" />
              <div className="text-4xl font-bold">{activeServices}</div>
              <p className="text-zinc-600 mt-2">Active Services</p>
            </div>

            {/* Quick Links */}
            <div className="col-span-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <button
                onClick={() => navigate("/offices")}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 rounded-3xl text-xl font-semibold hover:brightness-110 transition"
              >
                Manage Offices
              </button>
              <button
                onClick={() => navigate("/services")}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 rounded-3xl text-xl font-semibold hover:brightness-110 transition"
              >
                Manage Services
              </button>
              <button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-8 rounded-3xl text-xl font-semibold hover:brightness-110 transition">
                Manage Users (Coming Soon)
              </button>
            </div>
          </div>
        ) : (
          // Staff / Manager View
          <div className="space-y-12">
            <div className="bg-white rounded-3xl p-10 shadow-xl">
              <h2 className="text-3xl font-semibold mb-8">Live Queues Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service) => (
                  <div key={service.id} className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold">{service.name}</h3>
                        <p className="text-zinc-600 mt-1">Office #{service.office_id}</p>
                      </div>
                      <button
                        onClick={() => navigate(`/queue?service=${service.id}`)} // or your queue route
                        className="bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition"
                      >
                        View Queue
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Call Next (if you want inline) */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-3xl p-12 text-center shadow-2xl">
              <PhoneCall className="w-16 h-16 mx-auto mb-6" />
              <h3 className="text-4xl font-bold mb-4">Ready to Call Next?</h3>
              <p className="text-xl mb-8">Go to your queue dashboard to serve the next customer</p>
              <button
                onClick={() => navigate("/queue")}
                className="bg-white text-amber-600 px-12 py-5 rounded-2xl text-xl font-semibold hover:bg-gray-100 transition"
              >
                Open Queue Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;