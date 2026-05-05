import { Link } from "react-router-dom";

function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-gray-800">
      <h1 className="text-blue-400 text-2xl font-bold">
        WanderWise
      </h1>

      <div className="space-x-4">
        <Link className="text-white" to="/destinations">
          Destinations
        </Link>

        <Link className="text-white" to="/bookings">
          My Bookings
        </Link>

        <button
          onClick={logout}
          className="text-red-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;