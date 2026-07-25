import { useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  initializeAuth,
  finishAuthInitialization,
} from "../store/authSlice";


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

      try {

        dispatch(
          initializeAuth({
            token,
            user: JSON.parse(user),
          })
        );

      } catch (error) {

        console.error(
          "Failed to restore authentication",
          error
        );

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        dispatch(
          finishAuthInitialization()
        );

      }

    } else {

      dispatch(
        finishAuthInitialization()
      );

    }

  }, [dispatch]);


  return children;
}