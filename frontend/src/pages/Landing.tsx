import { Box } from "@chakra-ui/react";
import GeometricBackground from "../components/GeometricBackground";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Carousel from "../components/Carousel";
import FeatureCards from "../components/FeatureCards";
import NoiseOverlay from "../components/NoiseOverlay";

export default function Landing() {

    return (
        <Box minH="100vh" position="relative" overflow="hidden">

            {/* BASE LIGHTING */}
            <Box
                position="fixed"
                inset={0}
                bg="radial-gradient(circle at top, #ffffff 0%, #edf2f7 45%, #f7fafc 100%)"
                zIndex={0}
            />

            {/* MOVING AMBIENT GLOW */}
            <Box
                position="fixed"
                inset={0}
                zIndex={0}
                opacity={0.7}
                background="radial-gradient(circle at 20% 30%, rgba(99,179,237,0.25), transparent 40%),
                            radial-gradient(circle at 80% 70%, rgba(246,173,85,0.18), transparent 45%),
                            radial-gradient(circle at 50% 90%, rgba(252,129,129,0.15), transparent 50%)"
                animation="float1 20s ease-in-out infinite"
            />

            <NoiseOverlay />

            <Box position="relative" zIndex={1}>
                <Navbar />

                {/* HERO */}
                <Box position="relative" overflow="hidden">
                    <GeometricBackground />
                    <Hero />
                </Box>

                {/* CAROUSEL */}
                <Carousel />

                {/* FEATURES */}
                <FeatureCards />
            </Box>
        </Box>
    );
}