// pages/api/products.ts
import axios from "axios";

export default async function handler(req, res) {
  try {
    const url = process.env.ORDERS_URL;

    if (!url) {
      return res.status(500).json({ error: "ORDERS_URL env variable not set" });
    }

    const response = await axios.get(url, {
      headers: { Accept: "application/json" },
      timeout: 10000,
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Fetch error:", error.message);
    return res
      .status(500)
      .json({ error: "Failed to fetch orders", message: error.message });
  }
}
