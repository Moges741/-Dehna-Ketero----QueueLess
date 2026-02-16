import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  getAllOffices, 
  createOffice, 
  updateOffice, 
  toggleOfficeStatus,
  clearOfficeMessages 
} from "./officeSlice.js";
import { Building2, MapPin, Phone, Edit3, Power, Plus, Search } from "lucide-react";

const Offices = () => {
  const dispatch = useDispatch();
  const { offices, isLoading, error, successMsg } = useSelector((state) => state.office);

  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingOffice, setEditingOffice] = useState(null);

  const [form, setForm] = useState({
    name: "",
    city: "",
    address: "",
    phone: "",
  });

  // Fetch offices
  useEffect(() => {
    dispatch(getAllOffices());
    return () => dispatch(clearOfficeMessages());
  }, [dispatch]);

  // Refetch after mutations
  useEffect(() => {
    if (successMsg) {
      dispatch(getAllOffices());
      setTimeout(() => dispatch(clearOfficeMessages()), 2000);
    }
  }, [successMsg, dispatch]);

  const filteredOffices = offices.filter(office =>
    office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    office.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (office = null) => {
    setEditingOffice(office);
    setForm(office || { name: "", city: "", address: "", phone: "" });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingOffice(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingOffice) {
      dispatch(updateOffice({ id: editingOffice.id, officeData: form }));
    } else {
      dispatch(createOffice(form));
    }
    closeModal();
  };

  const handleToggle = (id, currentStatus) => {
    dispatch(toggleOfficeStatus({ id, is_active: !currentStatus }));
  };

  return (
    <div className="mt-20 min-h-screen bg-gradient-to-br from-zinc-50 to-emerald-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-semibold tracking-tighter text-zinc-900">Offices</h1>
            <p className="text-zinc-500 mt-1">Manage all service locations</p>
          </div>

          <button
            onClick={() => openModal()}
            className="flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-4 rounded-3xl font-semibold text-lg shadow-xl shadow-emerald-500/30 hover:scale-105 transition-all active:scale-95"
          >
            <Plus className="w-6 h-6" />
            New Office
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-10">
          <Search className="absolute left-6 top-4 w-6 h-6 text-zinc-400" />
          <input
            type="text"
            placeholder="Search offices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-zinc-200 rounded-3xl pl-16 py-4 text-lg focus:outline-none focus:border-emerald-500 transition"
          />
        </div>

        {/* Offices Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredOffices.map((office) => (
              <div
                key={office.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-emerald-100"
              >
                <div className="h-2 bg-gradient-to-r from-emerald-500 to-teal-500" />

                <div className="p-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-semibold text-zinc-900">{office.name}</h3>
                      <p className="text-emerald-600 font-medium flex items-center gap-2 mt-2">
                        <MapPin className="w-5 h-5" />
                        {office.city}
                      </p>
                    </div>

                    <div
                      className={`px-5 py-1.5 rounded-2xl text-sm font-semibold transition-all ${
                        office.is_active
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {office.is_active ? "Active" : "Inactive"}
                    </div>
                  </div>

                  <div className="mt-8 space-y-4 text-zinc-600">
                    <div className="flex items-start gap-4">
                      <Building2 className="w-5 h-5 mt-0.5" />
                      <p className="leading-snug">{office.address}</p>
                    </div>
                    {office.phone && (
                      <div className="flex items-center gap-4">
                        <Phone className="w-5 h-5" />
                        <p>{office.phone}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4 mt-10">
                    <button
                      onClick={() => openModal(office)}
                      className="flex-1 flex items-center justify-center gap-2 bg-zinc-100 hover:bg-zinc-200 transition py-4 rounded-2xl font-medium"
                    >
                      <Edit3 className="w-5 h-5" />
                      Edit
                    </button>

                    <button
                      onClick={() => handleToggle(office.id, office.is_active)}
                      className={`flex-1 flex items-center justify-center gap-2 transition py-4 rounded-2xl font-medium ${
                        office.is_active
                          ? "bg-red-50 hover:bg-red-100 text-red-600"
                          : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      <Power className="w-5 h-5" />
                      {office.is_active ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {error && <div className="mt-8 text-red-600 bg-red-50 p-4 rounded-2xl text-center">{error}</div>}
      </div>

      {/* Apple-style Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xl">
          <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden border border-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-10 text-white">
              <h2 className="text-3xl font-semibold tracking-tight">
                {editingOffice ? "Edit Office" : "New Office"}
              </h2>
              <p className="text-emerald-100 mt-2">Fill in the details below</p>
            </div>

            <form onSubmit={handleSubmit} className="p-10 space-y-8">
              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-2">Office Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-2xl border border-zinc-200 px-6 py-4 focus:border-emerald-500 focus:ring-0 text-lg"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">City</label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="w-full rounded-2xl border border-zinc-200 px-6 py-4 focus:border-emerald-500 focus:ring-0 text-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-600 mb-2">Phone</label>
                  <input
                    type="text"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full rounded-2xl border border-zinc-200 px-6 py-4 focus:border-emerald-500 focus:ring-0 text-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-600 mb-2">Full Address</label>
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full rounded-3xl border border-zinc-200 px-6 py-4 focus:border-emerald-500 focus:ring-0 text-lg h-28 resize-y"
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
                  {editingOffice ? "Save Changes" : "Create Office"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Offices;