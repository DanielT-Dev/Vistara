import { useState } from "react";

export function useAuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const reset = () => {
    setEmail("");
    setPassword("");
    setErrors({});
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    setLoading,
    errors,
    setErrors,
    reset,
  };
}