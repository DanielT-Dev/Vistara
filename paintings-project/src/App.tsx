import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Landing from "./pages/Landing";
import Gallery from "./pages/Gallery";
import GraphView from "./pages/GraphView";
import PaintingDetails from "./pages/PaintingDetails";
import PageTransition from "./components/PageTransition";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/useAppDispatch";
import ProtectedRoute from "./components/ProtectedRoute";
import { initializeAuth } from "./store/authSlice";

export default function App() {
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) return;

        try {
            const payload = JSON.parse(
                atob(token.split(".")[1])
            );

            dispatch(
                initializeAuth({
                    token,
                    user: {
                        id: payload.id,
                        username: payload.username,
                        email: payload.email,
                    },
                })
            );
        } catch (err) {
            console.error("Invalid token");

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }, [dispatch]);

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route
                    path="/"
                    element={
                        <PageTransition>
                            <Landing />
                        </PageTransition>
                    }
                />

                <Route
                    path="/gallery"
                    element={
                        <ProtectedRoute>
                            <PageTransition>
                                <Gallery />
                            </PageTransition>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/graph"
                    element={
                        <ProtectedRoute>
                            <PageTransition>
                                <GraphView />
                            </PageTransition>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/painting/:id"
                    element={
                        <ProtectedRoute>
                            <PageTransition>
                                <PaintingDetails />
                            </PageTransition>
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <PageTransition>
                            <Login />
                        </PageTransition>
                    }
                />

                <Route
                    path="/signup"
                    element={
                        <PageTransition>
                            <SignUp />
                        </PageTransition>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}