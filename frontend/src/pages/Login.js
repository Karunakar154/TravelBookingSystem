import { useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      const user = res.data?.user;

      if (!user) {
        alert("Login failed");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(user));

      window.location.href = "/destinations";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-xl w-96 text-white">

        {/* TITLE */}
        <h1 className="text-2xl text-blue-400 mb-6 text-center">
          Login
        </h1>

        {/* EMAIL */}
        <input
          className="w-full p-3 mb-3 bg-gray-700 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          className="w-full p-3 mb-4 bg-gray-700 rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* LOGIN BUTTON */}
        <button
          onClick={login}
          className="w-full bg-blue-500 p-3 rounded"
        >
          Login
        </button>

        {/* 🔥 LINKS SECTION (FIXED) */}
        <div className="text-center mt-4 text-sm text-gray-300">

          <p>
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-400 underline">
              Create Account
            </a>
          </p>

          <p className="mt-2">
            <a href="/forgot-password" className="text-blue-400 underline">
              Forgot Password?
            </a>
          </p>

        </div>

      </div>
    </div>
  );
}

export default Login;