// pages/api/products.ts
import axios from "axios";

export default async function handler(req, res) {
  try {
    const url = process.env.ORDERS_URL;

    if (!req.body.products || req.body.products.length === 0) {
      return res
        .status(400)
        .json({ error: "No products provided in the request body" });
    }

    if (!url) {
      return res.status(500).json({ error: "ORDERS_URL env variable not set" });
    }

    console.log("Request body:", req.body);
    const response = await axios.post(`${url}/create`, req.body, {
      headers: { Accept: "application/json" },
      timeout: 10000,
    });

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Fetch error:", error.message);
    return res
      .status(500)
      .json({ error: "Failed to create order", message: error.message });
  }
}
