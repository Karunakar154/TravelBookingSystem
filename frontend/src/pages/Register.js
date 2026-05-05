import { useState } from "react";
import API from "../services/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const res = await API.post("/auth/register", {
        email: email.trim(),
        password: password.trim(),
      });

      alert(res.data.message || "Registered successfully");

      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl w-96 text-white">

        <h1 className="text-2xl text-blue-400 mb-6 text-center">
          Register
        </h1>

        {/* EMAIL */}
        <input
          className="w-full p-3 mb-3 bg-gray-700 rounded text-white"
          placeholder="Email"
          value={email}   // ✅ IMPORTANT FIX
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          className="w-full p-3 mb-4 bg-gray-700 rounded text-white"
          type="password"
          placeholder="Password"
          value={password}  // ✅ IMPORTANT FIX
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* REGISTER BUTTON */}
        <button
          onClick={register}
          className="w-full bg-green-500 p-3 rounded"
        >
          Create Account
        </button>

        {/* BACK LINK */}
        <p className="text-center mt-4 text-sm text-gray-300">
          Already have an account?{" "}
          <a href="/" className="text-blue-400 underline">
            Login
          </a>
        </p>

      </div>
    </div>
  );
}

export default Register;