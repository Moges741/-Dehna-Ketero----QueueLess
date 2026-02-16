import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  getAllServices, 
  createService, 
  updateService, 
  toggleServiceStatus,
  clearServiceMessages 
} from "../features/service/serviceSlice";
import { getAllOffices } from "../features/office/officeSlice"; // ← we reuse offices
import { Scissors, Clock, Building2, Edit3, Power, Plus, Search } from "lucide-react";

const Services = () => {
  const dispatch = useDispatch();
  
  const { services, isLoading, error, successMsg } = useSelector((state) => state.service);
  const { offices } = useSelector((state) => state.office);

  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [form, setForm] = useState({
    office_id: "",
    name: "",
    description: "",
    avg_duration_minutes: 10,
  });

  // Fetch both offices + services
  useEffect(() => {
    dispatch(getAllOffices());
    dispatch(getAllServices());
    return () => dispatch(clearServiceMessages());
  }, [dispatch]);

  // Refetch after success
  useEffect(() => {
    if (successMsg) {
      dispatch(getAllServices());
      setTimeout(() => dispatch(clearServiceMessages()), 2000);
    }
  }, [successMsg, dispatch]);

  const officeMap = useMemo(() => {
    return offices.reduce((acc, office) => {
      acc[office.id] = office.name;
      return acc;
    }, {});
  }, [offices]);

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const openModal = (service = null) => {
    setEditingService(service);
    setForm(service ? {
      office_id: service.office_id,
      name: service.name,
      description: service.description || "",
      avg_duration_minutes: service.avg_duration_minutes || 10,
    } : { office_id: "", name: "", description: "", avg_duration_minutes: 10 });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingService(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingService) {
      dispatch(updateService({ id: editingService.id, serviceData: form }));
    } else {
      dispatch(createService(form));
    }
    closeModal();
  };

  const handleToggle = (id, currentStatus) => {
    dispatch(toggleServiceStatus({ id, is_active: !currentStatus }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-emerald-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-semibold tracking-tighter text-zinc-900">Services</h1>
            <p className="text-zinc-500 mt-1">Manage all available services across offices</p>
          </div>

          <button
            onClick={() => openModal()}
            className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-3xl font-semibold text-lg shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all active:scale-95"
          >
            <Plus className="w-6 h-6" />
            New Service
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-10">
          <Search className="absolute left-6 top-4 w-6 h-6 text-zinc-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-zinc-200 rounded-3xl pl-16 py-4 text-lg focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        {/* Services Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-emerald-100"
              >
                <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />

                <div className="p-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-semibold text-zinc-900">{service.name}</h3>
                      <p className="text-emerald-600 font-medium flex items-center gap-2 mt-2">
                        <Building2 className="w-5 h-5" />
                        {officeMap[service.office_id] || `Office #${service.office_id}`}
                      </p>
                    </div>

                    <div
                      className={`px-5 py-1.5 rounded-2xl text-sm font-semibold transition-all ${
                        service.is_active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {service.is_active ? "Active" : "Inactive"}
                    </div>
                  </div>

                  {service.description && (
                    <p className="mt-6 text-zinc-600 line-clamp-3 text-[15px]">
                      {service.description}
                    </p>
                  )}

                  <div className="mt-6 flex items-center gap-2 text-zinc-500 text-sm">
                    <Clock className="w-4 h-4" />
                    Avg. {service.avg_duration_minutes} minutes
                  </div>

                  <div className="flex gap-4 mt-10">
                    <button
                      onClick={() => openModal(service)}
                      className="flex-1 flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 transition py-4 rounded-2xl font-medium"
                    >
                      <Edit3 className="w-5 h-5" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleToggle(service.id, service.is_active)}
                      className={`flex-1 flex items-center justify-center gap-2 transition py-4 rounded-2xl font-medium ${
                        service.is_active
                          ? "bg-red-50 hover:bg-red-100 text-red-600"
                          : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      <Power className="w-5 h-5" />
                      {service.is_active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && <div className="mt-8 text-red-600 bg-red-50 p-4 rounded-2xl text-center">{error}</div>}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl">
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-white">
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-10 text-white">
              <h2 className="text-3xl font-semibold tracking-tight">
                {editingService ? "Edit Service" : "New Service"}
              </h2>
              <p className="text-emerald-100 mt-2">Configure the service details</p>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              {/* Office Select */}
              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-2">Office</label>
                <select
                  value={form.office_id}
                  onChange={(e) => setForm({ ...form, office_id: e.target.value })}
                  className="w-full rounded-2xl border border-zinc-200 px-6 py-4 focus:border-emerald-500 text-lg"
                  required
                >
                  <option value="">Select Office</option>
                  {offices.map((office) => (
                    <option key={office.id} value={office.id}>
                      {office.name} — {office.city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-2">Service Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-2xl border border-zinc-200 px-6 py-4 focus:border-emerald-500 focus:ring-0 text-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-2">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full rounded-3xl border border-zinc-200 px-6 py-4 focus:border-emerald-500 focus:ring-0 text-lg h-24 resize-y"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-2">Average Duration (minutes)</label>
                <input
                  type="number"
                  value={form.avg_duration_minutes}
                  onChange={(e) => setForm({ ...form, avg_duration_minutes: parseInt(e.target.value) })}
                  className="w-full rounded-2xl border border-zinc-200 px-6 py-4 focus:border-emerald-500 focus:ring-0 text-lg"
                  min="1"
                  required
                />
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 py-4 text-zinc-600 font-semibold rounded-2xl hover:bg-zinc-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold py-4 rounded-2xl hover:brightness-110 transition"
                >
                  {editingService ? "Save Changes" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;