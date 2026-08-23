export function validateLogin(
  email: string,
  password: string
) {
  const errors: Record<string, string> = {};

  if (!email.trim()) {
    errors.email = "Email is required";
  }

  if (!password.trim()) {
    errors.password = "Password is required";
  }

  return errors;
}