import { useState } from "react";
import API from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const sendReset = async () => {
    try {
      await API.post("/auth/forgot-password", { email });
      alert("Reset link sent (demo)");
    } catch (err) {
      alert("Error sending reset");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded w-96">

        <h2 className="text-xl mb-4">Forgot Password</h2>

        <input
          className="w-full p-2 mb-3"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={sendReset}
          className="w-full bg-blue-500 p-2 rounded"
        >
          Send Reset
        </button>
      </div>
    </div>
  );
}

export default ForgotPassword;