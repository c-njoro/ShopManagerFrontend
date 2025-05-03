// pages/api/products.ts
import axios from "axios";

export default async function handler(req, res) {
  try {
    const url = process.env.PRODUCTS_URL;

    const { productId, newStock } = req.body;

    if (!productId || !newStock) {
      return res
        .status(400)
        .json({ error: "Product id and new stock are needed" });
    }

    if (!url) {
      return res
        .status(500)
        .json({ error: "PRODUCTS_URL env variable not set" });
    }

    console.log("Request body:", req.body);
    const response = await axios.put(
      `${url}/update/${productId}`,
      {
        quantity: newStock,
      },
      {
        headers: { Accept: "application/json" },
        timeout: 10000,
      }
    );

    return res.status(200).json(response.data);
  } catch (error) {
    console.error("Update error:", error.message);
    return res.status(500).json({
      error: "Failed to update stock, from the API route of next js",
      message: error.message,
    });
  }
}
