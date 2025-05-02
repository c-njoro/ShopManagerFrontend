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
  const [message, setMessage] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");

    if (!formData.email || !formData.password) {
      setMessage("Fill out the form correctly");
      return;
    }

    try {
      await login(formData.email, formData.password);
      console.log("Login successful");
      router.push("/");
      setMessage("");
    } catch (error: any) {
      console.error("Login failed:", error);
      setMessage("Login failed, please try again");
    }
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-8">
      <h1 className="font-bold tracking-wider text-2xl">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="card w-2/3 h-1/3 rounded-lg shadow-lg p-4 flex flex-col justify-center items-center gap-5"
      >
        <div className="w-full grid grid-cols-4 place-items-end gap-4 items-center">
          <label
            htmlFor="email"
            className="col-span-1 capitalize tracking-widest "
          >
            email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={handleChange}
            className="input-field col-span-3 border-2 border-gray-300 rounded-full py-1 w-full h-max px-3"
          />
        </div>
        <div className="w-full grid grid-cols-4 place-items-end items-center gap-4">
          <label
            htmlFor="password"
            className="col-span-1 capitalize tracking-widest"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={handleChange}
            className="input-field col-span-3 border-2 border-gray-300 rounded-full px-3 py-1 w-full h-max "
          />
        </div>
        <button
          type="submit"
          className="w-full max-w-3/4  cursor-pointer h-max py-2 px-5 rounded-full input-field uppercase font-semibold text-sm tracking-widest"
        >
          Login
        </button>
      </form>

      {message.length > 0 && (
        <div className="w-full flex flex-row justify-center items-center">
          <p className="uppercase text-sm tracking-widest text-red-500">
            {message}
          </p>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
