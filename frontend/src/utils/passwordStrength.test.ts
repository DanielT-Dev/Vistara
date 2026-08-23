import { evaluatePassword } from "./passwordStrength";

describe("evaluatePassword", () => {
    // -------------------------------------------------------------------------
    // EMPTY PASSWORD
    // -------------------------------------------------------------------------

    it("returns the default state for an empty password", () => {
        const result = evaluatePassword("");

        expect(result).toEqual({
            score: 0,
            label: "",
            color: "gray.300",
            progress: 0,
            isStrong: false,
            nextRequirement: null,
        });
    });

    // -------------------------------------------------------------------------
    // PASSWORD REQUIREMENTS
    // -------------------------------------------------------------------------

    it("returns score 3 and Fair for three requirements", () => {
        const result = evaluatePassword("Abcdefgh");

        expect(result.score).toBe(3);
        expect(result.label).toBe("Fair");
        expect(result.progress).toBe(60);
        expect(result.isStrong).toBe(false);
        expect(result.nextRequirement).toBe(
            "Add a number"
        );
    });

    it("returns score 4 and Good for four requirements", () => {
        const result = evaluatePassword("Abcdefg1");

        expect(result.score).toBe(4);
        expect(result.label).toBe("Good");
        expect(result.progress).toBe(80);
        expect(result.isStrong).toBe(false);
        expect(result.nextRequirement).toBe(
            "Add a special character"
        );
    });

    // -------------------------------------------------------------------------
    // STRONG PASSWORD
    // -------------------------------------------------------------------------

    it("returns Strong for a password satisfying all requirements", () => {
        const result = evaluatePassword("Password1!");

        expect(result).toEqual({
            score: 5,
            label: "Strong",
            color: "green.400",
            progress: 100,
            isStrong: true,
            nextRequirement: null,
        });
    });

    // -------------------------------------------------------------------------
    // NEXT REQUIREMENT
    // -------------------------------------------------------------------------

    it("returns the first missing requirement", () => {
        const result = evaluatePassword("password");

        expect(result.nextRequirement).toBe(
            "Add an uppercase letter"
        );
    });

    it("returns null when all requirements are satisfied", () => {
        const result = evaluatePassword("Password1!");

        expect(result.nextRequirement).toBeNull();
    });

    // -------------------------------------------------------------------------
    // PROGRESS
    // -------------------------------------------------------------------------

    it("calculates progress correctly", () => {
        const result = evaluatePassword("Abcdefg1");

        expect(result.progress).toBe(80);
    });
});