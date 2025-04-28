import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React, { useState } from "react";

const LoginPage = () => {
  const { login } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(formData.email, formData.password)
      .then(() => {
        console.log("Login successful");
        router.push("/");
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
    console.log("Login data:", formData);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Username:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default LoginPage;
