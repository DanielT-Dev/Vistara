const API_URL = "http://localhost:5000/api/categories";

// GET ALL CATEGORIES
export async function getCategories() {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}