export type AuthErrors = {
  email?: string;
  password?: string;
};

export function validateAuth(email: string, password: string): AuthErrors {
  const errors: AuthErrors = {};

  // EMAIL RULES
  if (!email) {
    errors.email = "Email is required.";
  } else if (!email.includes("@") || !email.includes(".")) {
    errors.email = "Please enter a valid email address (example: name@mail.com).";
  } else if (email.length > 254) {
    errors.email = "Email is too long.";
  }

  // PASSWORD RULES
  if (!password) {
    errors.password = "Password is required.";
  } else {
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    } else if (password.length > 64) {
      errors.password = "Password must be under 64 characters.";
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Add at least one uppercase letter.";
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Add at least one number.";
    } else if (!/[!@#$%^&*]/.test(password)) {
      errors.password = "Add at least one special character (!@#$%^&*).";
    }
  }

  return errors;
}