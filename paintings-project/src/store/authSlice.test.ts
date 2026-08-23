import reducer, {
    login,
    initializeAuth,
    finishAuthInitialization,
    logout,
} from "./authSlice";

describe("authSlice", () => {
    // Test data reused across multiple tests.
    const mockUser = {
        id: "123",
        username: "john",
        email: "john@example.com",
    };

    const mockToken = "fake-jwt-token";

    beforeEach(() => {
        localStorage.clear();
    });

    // -------------------------------------------------------------------------
    // INITIAL STATE
    // -------------------------------------------------------------------------

    it("returns the initial state", () => {
        const state = reducer(undefined, { type: "unknown" });

        expect(state).toEqual({
            user: null,
            token: null,
            isAuthenticated: false,
            authInitialized: false,
        });
    });

    // -------------------------------------------------------------------------
    // LOGIN
    // -------------------------------------------------------------------------

    describe("login", () => {
        it("authenticates the user and stores credentials in localStorage", () => {
            const state = reducer(
                undefined,
                login({
                    user: mockUser,
                    token: mockToken,
                })
            );

            expect(state).toEqual({
                user: mockUser,
                token: mockToken,
                isAuthenticated: true,
                authInitialized: true,
            });

            expect(localStorage.getItem("token"))
                .toBe(mockToken);

            expect(localStorage.getItem("user"))
                .toBe(JSON.stringify(mockUser));
        });
    });

    // -------------------------------------------------------------------------
    // INITIALIZE AUTH
    // -------------------------------------------------------------------------

    describe("initializeAuth", () => {
        it("restores an authenticated user", () => {
            const state = reducer(
                undefined,
                initializeAuth({
                    user: mockUser,
                    token: mockToken,
                })
            );

            expect(state).toEqual({
                user: mockUser,
                token: mockToken,
                isAuthenticated: true,
                authInitialized: true,
            });
        });
    });

    // -------------------------------------------------------------------------
    // FINISH AUTH INITIALIZATION
    // -------------------------------------------------------------------------

    describe("finishAuthInitialization", () => {
        it("marks authentication initialization as complete", () => {
            const state = reducer(
                undefined,
                finishAuthInitialization()
            );

            expect(state).toEqual({
                user: null,
                token: null,
                isAuthenticated: false,
                authInitialized: true,
            });
        });
    });

    // -------------------------------------------------------------------------
    // LOGOUT
    // -------------------------------------------------------------------------

    describe("logout", () => {
        it("clears authentication state and localStorage", () => {
            // Start with an authenticated user.
            localStorage.setItem("token", mockToken);
            localStorage.setItem(
                "user",
                JSON.stringify(mockUser)
            );

            const authenticatedState = {
                user: mockUser,
                token: mockToken,
                isAuthenticated: true,
                authInitialized: true,
            };

            const state = reducer(
                authenticatedState,
                logout()
            );

            expect(state).toEqual({
                user: null,
                token: null,
                isAuthenticated: false,
                authInitialized: true,
            });

            expect(localStorage.getItem("token"))
                .toBeNull();

            expect(localStorage.getItem("user"))
                .toBeNull();
        });
    });
});