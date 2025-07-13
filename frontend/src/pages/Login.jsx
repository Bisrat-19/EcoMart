import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // ✅ import AuthContext

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth(); // ✅ get login() from context

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData);

      const { token, userId, name, email } = res.data;

      // ✅ Save login state to context and localStorage
      login({ token, userId, name, email });

      alert("✅ Login successful!");
      navigate("/dashboard"); // or any authenticated page
    } catch (err) {
      alert("❌ Login failed. Please check credentials.");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        value={formData.email}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        value={formData.password}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
