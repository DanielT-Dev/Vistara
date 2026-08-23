const API_URL = "http://localhost:5000/api/paintings";

// -----------------------------------------------------------------------------
// GET ALL PAINTINGS (with optional category + search filter)
// -----------------------------------------------------------------------------

export async function getPaintings(category?: string, search?: string) {
    const params = new URLSearchParams();

    if (category) params.append("category", category);
    if (search) params.append("search", search);

    const url = `${API_URL}?${params.toString()}`;

    const res = await fetch(url);

    if (!res.ok) {
        throw new Error("Failed to fetch paintings");
    }

    return res.json();
}

// -----------------------------------------------------------------------------
// GET SINGLE PAINTING BY ID
// -----------------------------------------------------------------------------

export async function getPaintingById(id: string) {
    const res = await fetch(`${API_URL}/${id}`);

    if (!res.ok) {
        throw new Error("Painting not found");
    }

    return res.json();
}