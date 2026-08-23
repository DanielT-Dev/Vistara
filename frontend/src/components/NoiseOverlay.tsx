import { Box } from "@chakra-ui/react";

export default function NoiseOverlay() {
    return (
        <Box
            position="fixed"
            inset={0}
            zIndex={2}
            opacity={0.04}
            pointerEvents="none"
            bgImage="url('https://www.transparenttextures.com/patterns/noise.png')"
        />
    );
}