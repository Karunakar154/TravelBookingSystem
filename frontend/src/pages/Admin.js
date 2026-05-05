import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Admin() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    price: "",
  });

  const fetchData = async () => {
    const res = await API.get("/destinations?page=1&limit=20");
    setList(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const add = async () => {
    await API.post("/admin/destinations", form);
    alert("Added!");
    fetchData();
  };

  const del = async (id) => {
    await API.delete(`/admin/destinations/${id}`);
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      <h1 className="text-3xl text-center text-blue-400 mt-6">
        Admin Dashboard
      </h1>

      {/* FORM */}
      <div className="p-6 flex gap-2 justify-center">
        <input
          className="p-2 bg-gray-800"
          placeholder="Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="p-2 bg-gray-800"
          placeholder="Location"
          onChange={(e) =>
            setForm({ ...form, location: e.target.value })
          }
        />

        <input
          className="p-2 bg-gray-800"
          placeholder="Price"
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
        />

        <button
          onClick={add}
          className="bg-blue-500 px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* LIST */}
      <div className="grid grid-cols-3 gap-4 p-6">
        {list.map((d) => (
          <div
            key={d.id}
            className="bg-gray-800 p-4 rounded"
          >
            <h2>{d.name}</h2>
            <p>{d.location}</p>
            <p>₹{d.price}</p>

            <button
              onClick={() => del(d.id)}
              className="bg-red-500 px-3 py-1 mt-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;