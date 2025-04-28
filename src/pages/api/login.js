// This is a Next.js API route that handles user login requests.
import axios from "axios";

export default async function handler(req, res) {
  const { method } = req;
  const userDetails = req.body;

  if (method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!process.env.USERS_URL) {
    return res.status(500).json({ error: "USERS_URL is not defined" });
  }

  if (!userDetails.email || !userDetails.password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    console.log("trying sign");
    const response = await axios.post(
      `${process.env.USERS_URL}/login`,
      userDetails
    );
    return res.status(201).json(response.data);
  } catch (error) {
    if (error.response.status === 404) {
      return res.status(404).json({
        message: "User not found",
        error: error.response.data,
      });
    }

    if (error.response.status === 500) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.response.data,
      });
    }
    if (error.response.status === 401) {
      return res.status(401).json({
        message: "Invalid credentials, email and password do not match!! ",
        error: error.response.data,
      });
    }
  }
}
