export interface PasswordStrengthResult {
    score: number;
    label: string;
    color: string;
    progress: number;
    isStrong: boolean;
    nextRequirement: string | null;
}

const requirements = [
    {
        label: "Use at least 8 characters",
        test: (password: string) => password.length >= 8,
    },
    {
        label: "Add an uppercase letter",
        test: (password: string) => /[A-Z]/.test(password),
    },
    {
        label: "Add a lowercase letter",
        test: (password: string) => /[a-z]/.test(password),
    },
    {
        label: "Add a number",
        test: (password: string) => /\d/.test(password),
    },
    {
        label: "Add a special character",
        test: (password: string) => /[^A-Za-z0-9]/.test(password),
    },
];

export function evaluatePassword(
    password: string
): PasswordStrengthResult {

    if (!password) {
        return {
            score: 0,
            label: "",
            color: "gray.300",
            progress: 0,
            isStrong: false,
            nextRequirement: null,
        };
    }

    const passed = requirements.filter((r) =>
        r.test(password)
    ).length;

    const nextRequirement =
        requirements.find(
            (r) => !r.test(password)
        )?.label ?? null;

    let label = "Weak";
    let color = "red.400";

    if (passed >= 2) {
        label = "Fair";
        color = "orange.400";
    }

    if (passed >= 4) {
        label = "Good";
        color = "blue.400";
    }

    if (passed === 5) {
        label = "Strong";
        color = "green.400";
    }

    return {
        score: passed,
        label,
        color,
        progress: (passed / 5) * 100,
        isStrong: passed === 5,
        nextRequirement,
    };
}