import { validateAuth } from "./authValidation";

describe("validateAuth", () => {
    // -------------------------------------------------------------------------
    // VALID INPUT
    // -------------------------------------------------------------------------

    it("returns no errors for valid credentials", () => {
        const result = validateAuth(
            "john@example.com",
            "Password1!"
        );

        expect(result).toEqual({});
    });

    // -------------------------------------------------------------------------
    // EMAIL
    // -------------------------------------------------------------------------

    describe("email validation", () => {
        it("requires an email", () => {
            const result = validateAuth(
                "",
                "Password1!"
            );

            expect(result.email).toBe(
                "Email is required."
            );
        });

        it("rejects an email without @", () => {
            const result = validateAuth(
                "johnexample.com",
                "Password1!"
            );

            expect(result.email).toBe(
                "Please enter a valid email address (example: name@mail.com)."
            );
        });

        it("rejects an email without a dot", () => {
            const result = validateAuth(
                "john@examplecom",
                "Password1!"
            );

            expect(result.email).toBe(
                "Please enter a valid email address (example: name@mail.com)."
            );
        });

        it("rejects an email longer than 254 characters", () => {
            const email = "a".repeat(250) + "@a.com";

            const result = validateAuth(
                email,
                "Password1!"
            );

            expect(result.email).toBe(
                "Email is too long."
            );
        });
    });

    // -------------------------------------------------------------------------
    // PASSWORD
    // -------------------------------------------------------------------------

    describe("password validation", () => {
        it("requires a password", () => {
            const result = validateAuth(
                "john@example.com",
                ""
            );

            expect(result.password).toBe(
                "Password is required."
            );
        });

        it("requires at least 6 characters", () => {
            const result = validateAuth(
                "john@example.com",
                "A1!"
            );

            expect(result.password).toBe(
                "Password must be at least 6 characters long."
            );
        });

        it("rejects passwords longer than 64 characters", () => {
            const password =
                "A1!" + "a".repeat(62);

            const result = validateAuth(
                "john@example.com",
                password
            );

            expect(result.password).toBe(
                "Password must be under 64 characters."
            );
        });

        it("requires an uppercase letter", () => {
            const result = validateAuth(
                "john@example.com",
                "password1!"
            );

            expect(result.password).toBe(
                "Add at least one uppercase letter."
            );
        });

        it("requires a number", () => {
            const result = validateAuth(
                "john@example.com",
                "Password!"
            );

            expect(result.password).toBe(
                "Add at least one number."
            );
        });

        it("requires a special character", () => {
            const result = validateAuth(
                "john@example.com",
                "Password1"
            );

            expect(result.password).toBe(
                "Add at least one special character (!@#$%^&*)."
            );
        });
    });

    // -------------------------------------------------------------------------
    // MULTIPLE ERRORS
    // -------------------------------------------------------------------------

    it("returns both email and password errors", () => {
        const result = validateAuth("", "");

        expect(result).toEqual({
            email: "Email is required.",
            password: "Password is required.",
        });
    });
});