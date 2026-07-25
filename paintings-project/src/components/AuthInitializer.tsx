import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { initializeAuth } from "../store/authSlice";

export default function AuthInitializer({
  children,
}: {
  children: React.ReactNode;
}) {

  const dispatch = useAppDispatch();


  useEffect(() => {

    const token =
      localStorage.getItem("token");

    const user =
      localStorage.getItem("user");


    if (token && user) {

      dispatch(
        initializeAuth({
          token,
          user: JSON.parse(user),
        })
      );

    }

  }, [dispatch]);


  return children;
}