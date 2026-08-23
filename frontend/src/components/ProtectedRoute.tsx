import { Navigate } from "react-router-dom";
import { useAppSelector } from "../hooks/useAppDispatch"


export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {

    const {
        isAuthenticated,
        authInitialized,
    } = useAppSelector(
        (state) => state.auth
    );


    if (!authInitialized) {
        return null;
    }


    if (!isAuthenticated) {
        return (
            <Navigate
                to="/login"
                replace
            />
        );
    }


    return children;
}