const API_URL = "http://localhost:5000/api/users";

// -----------------------------------------------------------------------------
// GET ALL USERS
// -----------------------------------------------------------------------------

export async function getUsers() {
    const res = await fetch(API_URL);

    if (!res.ok) {
        throw new Error("Failed to fetch users");
    }

    return res.json();
}

// -----------------------------------------------------------------------------
// GET SINGLE USER BY ID
// -----------------------------------------------------------------------------

export async function getUserById(id: string) {
    const res = await fetch(`${API_URL}/${id}`);

    if (!res.ok) {
        throw new Error("User not found");
    }

    return res.json();
}

// -----------------------------------------------------------------------------
// CREATE USER
// -----------------------------------------------------------------------------

export async function createUser(
    username: string,
    email: string,
    password: string
) {
    const res = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email,
            password,
        }),
    });

    if (!res.ok) {
        const data = await res.json();

        throw new Error(
            data.message || "Failed to create user"
        );
    }

    return res.json();
}

// -----------------------------------------------------------------------------
// UPDATE USER
// -----------------------------------------------------------------------------

export async function updateUser(
    id: string,
    username?: string,
    email?: string,
    password?: string
) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ...(username !== undefined && { username }),
            ...(email !== undefined && { email }),
            ...(password !== undefined && { password }),
        }),
    });

    if (!res.ok) {
        const data = await res.json();

        throw new Error(
            data.message || "Failed to update user"
        );
    }

    return res.json();
}

// -----------------------------------------------------------------------------
// DELETE USER
// -----------------------------------------------------------------------------

export async function deleteUser(id: string) {
    const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        const data = await res.json();

        throw new Error(
            data.message || "Failed to delete user"
        );
    }

    return res.json();
}

// -----------------------------------------------------------------------------
// LOGIN USER
// -----------------------------------------------------------------------------

export async function loginUser(
    email: string,
    password: string
) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(
            data.message || "Login failed"
        );
    }

    return data;
}