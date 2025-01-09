import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const response = await fetch(
      `https://api.printify.com/v1/shops/19732715/products.json`,
      {
        method: "GET",
        headers: {
          "Cache-Control": "no-cache",
          Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching products:", error.message);
    } else {
      console.error("Error fetching products:", error);
    }
    res.status(500).json({ message: "Error fetching products" });
  }
}

// pages/api/products.ts

export async function fetchProduct(id: string) {
  const response = await fetch(
    `https://api.printify.com/v1/shops/19732715/products/${id}.json`,
    {
      method: "GET",
      headers: {
        "Cache-Control": "no-cache",
        Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) throw new Error("Product not found");

  return response.json();
}

// pages/api/products.ts

import { Product } from "@/types/types";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.PRINTIFY_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await response.json();
  return data.data || [];
}
