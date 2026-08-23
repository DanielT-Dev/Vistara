import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
} from "./userApi";

// -----------------------------------------------------------------------------
// GET ALL USERS
// -----------------------------------------------------------------------------

describe("getUsers", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns users when the request succeeds", async () => {
        const mockUsers = [
            {
                id: "1",
                username: "john",
                email: "john@example.com",
            },
            {
                id: "2",
                username: "alice",
                email: "alice@example.com",
            },
        ];

        // Mock a successful fetch response.
        globalThis.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockUsers),
        });

        const result = await getUsers();

        expect(result).toEqual(mockUsers);

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:5000/api/users"
        );
    });

    it("throws when the request fails", async () => {
        globalThis.fetch = jest.fn().mockResolvedValue({
            ok: false,
        });

        await expect(getUsers()).rejects.toThrow(
            "Failed to fetch users"
        );
    });
});

// -----------------------------------------------------------------------------
// GET SINGLE USER
// -----------------------------------------------------------------------------

describe("getUserById", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("returns a user when the request succeeds", async () => {
        const mockUser = {
            id: "123",
            username: "john",
            email: "john@example.com",
        };

        globalThis.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockUser),
        });

        const result = await getUserById("123");

        expect(result).toEqual(mockUser);

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:5000/api/users/123"
        );
    });

    it("throws when the user is not found", async () => {
        globalThis.fetch = jest.fn().mockResolvedValue({
            ok: false,
        });

        await expect(
            getUserById("999")
        ).rejects.toThrow("User not found");
    });
});

// -----------------------------------------------------------------------------
// CREATE USER
// -----------------------------------------------------------------------------

describe("createUser", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("creates a user successfully", async () => {
        const mockUser = {
            id: "123",
            username: "john",
            email: "john@example.com",
        };

        globalThis.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockUser),
        });

        const result = await createUser(
            "john",
            "john@example.com",
            "password123"
        );

        expect(result).toEqual(mockUser);

        // Verify that the frontend sends exactly what the backend expects.
        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:5000/api/users",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: "john",
                    email: "john@example.com",
                    password: "password123",
                }),
            }
        );
    });

    it("throws the backend error message", async () => {
        globalThis.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: jest.fn().mockResolvedValue({
                message: "Username or email already exists",
            }),
        });

        await expect(
            createUser(
                "john",
                "john@example.com",
                "password123"
            )
        ).rejects.toThrow(
            "Username or email already exists"
        );
    });
});

// -----------------------------------------------------------------------------
// UPDATE USER
// -----------------------------------------------------------------------------

describe("updateUser", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("updates a user successfully", async () => {
        const mockUser = {
            id: "123",
            username: "john_updated",
            email: "john@example.com",
        };

        globalThis.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockUser),
        });

        const result = await updateUser(
            "123",
            "john_updated"
        );

        expect(result).toEqual(mockUser);

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:5000/api/users/123",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: "john_updated",
                }),
            }
        );
    });

    it("throws the backend error message", async () => {
        globalThis.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: jest.fn().mockResolvedValue({
                message: "User not found",
            }),
        });

        await expect(
            updateUser("999", "john")
        ).rejects.toThrow("User not found");
    });
});

// -----------------------------------------------------------------------------
// DELETE USER
// -----------------------------------------------------------------------------

describe("deleteUser", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("deletes a user successfully", async () => {
        const response = {
            message: "User deleted successfully",
        };

        globalThis.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(response),
        });

        const result = await deleteUser("123");

        expect(result).toEqual(response);

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:5000/api/users/123",
            {
                method: "DELETE",
            }
        );
    });

    it("throws the backend error message", async () => {
        globalThis.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: jest.fn().mockResolvedValue({
                message: "User not found",
            }),
        });

        await expect(
            deleteUser("999")
        ).rejects.toThrow("User not found");
    });
});

// -----------------------------------------------------------------------------
// LOGIN USER
// -----------------------------------------------------------------------------

describe("loginUser", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("logs in successfully", async () => {
        const mockResponse = {
            message: "Login successful",
            token: "fake-jwt-token",
            user: {
                id: "123",
                username: "john",
                email: "john@example.com",
            },
        };

        globalThis.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue(mockResponse),
        });

        const result = await loginUser(
            "john@example.com",
            "password123"
        );

        expect(result).toEqual(mockResponse);

        expect(fetch).toHaveBeenCalledWith(
            "http://localhost:5000/api/users/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: "john@example.com",
                    password: "password123",
                }),
            }
        );
    });

    it("throws the backend error message", async () => {
        globalThis.fetch = jest.fn().mockResolvedValue({
            ok: false,
            json: jest.fn().mockResolvedValue({
                message: "Invalid email or password",
            }),
        });

        await expect(
            loginUser(
                "john@example.com",
                "wrongpassword"
            )
        ).rejects.toThrow(
            "Invalid email or password"
        );
    });
});