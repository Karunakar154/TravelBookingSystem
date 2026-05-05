import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Destinations() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const limit = 6;

  // ---------------- FETCH DESTINATIONS ----------------
  const fetchData = async (pageNum) => {
    try {
      const res = await API.get(
        `/destinations?page=${pageNum}&limit=${limit}`
      );

      setData(res.data.data);
      setTotal(res.data.total);
      setPage(pageNum);
    } catch (err) {
      console.log(err);
      alert("Fetch error");
    }
  };

  // ---------------- BOOK DESTINATION (FIXED) ----------------
  const book = async (id) => {
    try {
      const userString = localStorage.getItem("user");

      if (!userString || userString === "undefined") {
        alert("User not logged in");
        return;
      }

      const user = JSON.parse(userString);

      if (!user?.id) {
        alert("User not logged in");
        return;
      }

      await API.post("/bookings", {
        user_id: user.id,
        destination_id: id,
      });

      alert("Booking successful");
    } catch (err) {
      console.log(err);
      alert("Booking failed");
    }
  };

  useEffect(() => {
    fetchData(1);
  }, []);

  const filtered = data.filter((d) =>
    (d.name || "").toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* HEADER */}
      <div className="text-center p-6">
        <h1 className="text-3xl text-blue-400">Destinations</h1>

        <input
          className="mt-4 p-2 text-black rounded"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {filtered.map((d) => (
          <div key={d.id} className="bg-gray-800 p-4 rounded">
            <h2 className="text-lg font-bold">{d.name}</h2>
            <p>{d.location}</p>
            <p className="text-green-400">₹{d.price}</p>

            <button
              onClick={() => book(d.id)}
              className="bg-blue-500 mt-2 w-full p-2 rounded"
            >
              Book
            </button>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-4 p-4">
        <button
          disabled={page === 1}
          onClick={() => fetchData(page - 1)}
          className="bg-gray-700 px-3 py-1 rounded"
        >
          Prev
        </button>

        <span>
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => fetchData(page + 1)}
          className="bg-gray-700 px-3 py-1 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Destinations;
