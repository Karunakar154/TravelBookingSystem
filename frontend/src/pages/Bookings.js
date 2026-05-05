import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Bookings() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------- FETCH BOOKINGS ----------------
  const fetchBookings = async () => {
    try {
      const userString = localStorage.getItem("user");

      if (!userString || userString === "undefined") {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      const user = JSON.parse(userString);

      if (!user?.id) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      const res = await API.get(`/bookings?user_id=${user.id}`);

      setData(res.data?.data || []);
    } catch (err) {
      console.log(err);
      setError("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- DELETE BOOKING ----------------
  const deleteBooking = async (id) => {
    try {
      await API.delete(`/bookings/${id}`);
      setData((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      alert("Failed to delete booking");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <h1 className="text-center text-3xl mt-6 text-blue-400">
        My Bookings
      </h1>

      {loading && (
        <p className="text-center mt-6">Loading...</p>
      )}

      {error && (
        <p className="text-center mt-6 text-red-400">{error}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {data.map((b) => (
          <div
            key={b.id}
            className="bg-gray-800 p-5 rounded-xl shadow-lg"
          >
            <h2 className="text-blue-400 font-bold">
              {b.destination}
            </h2>

            <p>{b.location}</p>
            <p className="text-green-400">₹{b.price}</p>

            <button
              onClick={() => deleteBooking(b.id)}
              className="mt-3 w-full bg-red-500 p-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bookings;