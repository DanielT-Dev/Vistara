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
import { login } from "./store/authSlice";

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
                login({
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
                        <PageTransition>
                            <Gallery />
                        </PageTransition>
                    }
                />

                <Route
                    path="/painting/:id"
                    element={
                        <PageTransition>
                            <PaintingDetails />
                        </PageTransition>
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

                <Route
                    path="/graph"
                    element={
                        <PageTransition>
                            <GraphView />
                        </PageTransition>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}