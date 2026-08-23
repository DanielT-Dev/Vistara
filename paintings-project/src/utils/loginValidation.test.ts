import { validateLogin } from "./loginValidation";

describe("validateLogin", () => {
    // -------------------------------------------------------------------------
    // VALID INPUT
    // -------------------------------------------------------------------------

    it("returns no errors for valid input", () => {
        const result = validateLogin(
            "john@example.com",
            "password123"
        );

        expect(result).toEqual({});
    });

    // -------------------------------------------------------------------------
    // EMAIL
    // -------------------------------------------------------------------------

    it("requires an email", () => {
        const result = validateLogin(
            "",
            "password123"
        );

        expect(result).toEqual({
            email: "Email is required",
        });
    });

    it("rejects an email containing only whitespace", () => {
        const result = validateLogin(
            "   ",
            "password123"
        );

        expect(result).toEqual({
            email: "Email is required",
        });
    });

    // -------------------------------------------------------------------------
    // PASSWORD
    // -------------------------------------------------------------------------

    it("requires a password", () => {
        const result = validateLogin(
            "john@example.com",
            ""
        );

        expect(result).toEqual({
            password: "Password is required",
        });
    });

    it("rejects a password containing only whitespace", () => {
        const result = validateLogin(
            "john@example.com",
            "   "
        );

        expect(result).toEqual({
            password: "Password is required",
        });
    });

    // -------------------------------------------------------------------------
    // MULTIPLE ERRORS
    // -------------------------------------------------------------------------

    it("returns both errors when both fields are empty", () => {
        const result = validateLogin("", "");

        expect(result).toEqual({
            email: "Email is required",
            password: "Password is required",
        });
    });
});