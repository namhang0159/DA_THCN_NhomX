import { useState } from "react";
import { LoginApi } from "../util/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await LoginApi(username, password);
    const data = res.data ?? res;
    console.log(res);
    if (!data?.user.access_token) {
      alert(data.error || "Sai username hoặc password");
      return;
    }

    localStorage.setItem("access_token", data.user.access_token);
    window.location.href = "/";
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <input
            type="text"
            className="border rounded w-full px-3 py-2 focus:ring focus:ring-blue-200"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Password</label>
          <input
            type="password"
            className="border rounded w-full px-3 py-2 focus:ring focus:ring-blue-200"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
