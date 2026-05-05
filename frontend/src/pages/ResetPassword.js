import { useState } from "react";
import API from "../services/api";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const reset = async () => {
    try {
      await API.post("/auth/reset-password", {
        email,
        newPassword,
      });

      alert("Password updated");
      window.location.href = "/";
    } catch (err) {
      alert("Reset failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-6 rounded w-96">

        <h2 className="text-xl mb-4">Reset Password</h2>

        <input
          className="w-full p-2 mb-3"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 mb-4"
          type="password"
          placeholder="New Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button
          onClick={reset}
          className="w-full bg-blue-500 p-2 rounded"
        >
          Reset Password
        </button>
      </div>
    </div>
  );
}

export default ResetPassword;