import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export default function GeometricBackground() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;

            const x = (e.clientX / window.innerWidth - 0.5) * 15;
            const y = (e.clientY / window.innerHeight - 0.5) * 15;

            ref.current.style.transform = `translate(${x}px, ${y}px)`;
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <Box
            ref={ref}
            position="absolute"
            inset={0}
            pointerEvents="none"
            transition="transform 0.25s ease-out"
        >
            {/* circles */}
            <Box sx={circle1} />
            <Box sx={circle2} />
            <Box sx={circle3} />
            <Box sx={circle4} />
            <Box sx={circle5} />

            {/* squares */}
            <Box sx={square1} />
            <Box sx={square2} />
            <Box sx={square3} />
            <Box sx={square4} />

            {/* triangles */}
            <Box sx={triangle1} />
            <Box sx={triangle2} />
            <Box sx={triangle3} />
        </Box>
    );
}

/* ---------- BASE ---------- */

const base = {
    position: "absolute",
    opacity: 0.16,
    pointerEvents: "none",
};

/* ---------- CIRCLES ---------- */

const circle1 = {
    ...base,
    top: "10%",
    left: "10%",
    w: { base: "50px", md: "70px" },
    h: { base: "50px", md: "70px" },
    bg: "blue.400",
    borderRadius: "50%",
    style: { animation: "float1 18s ease-in-out infinite" },
};

const circle2 = {
    ...base,
    top: "55%",
    right: "8%",
    w: { base: "80px", md: "110px" },
    h: { base: "80px", md: "110px" },
    bg: "purple.400",
    borderRadius: "50%",
    style: { animation: "float2 22s ease-in-out infinite" },
};

const circle3 = {
    ...base,
    bottom: "10%",
    left: "35%",
    w: { base: "45px", md: "60px" },
    h: { base: "45px", md: "60px" },
    bg: "orange.300",
    borderRadius: "50%",
    style: { animation: "float3 16s ease-in-out infinite" },
};

const circle4 = {
    ...base,
    top: "30%",
    left: "55%",
    w: { base: "35px", md: "45px" },
    h: { base: "35px", md: "45px" },
    bg: "yellow.300",
    borderRadius: "50%",
    style: { animation: "float2 20s ease-in-out infinite" },
};

const circle5 = {
    ...base,
    bottom: "35%",
    right: "35%",
    w: { base: "25px", md: "35px" },
    h: { base: "25px", md: "35px" },
    bg: "red.300",
    borderRadius: "50%",
    style: { animation: "float1 26s ease-in-out infinite" },
};

/* ---------- SQUARES ---------- */

const square1 = {
    ...base,
    top: "20%",
    right: "25%",
    w: { base: "45px", md: "60px" },
    h: { base: "45px", md: "60px" },
    bg: "teal.400",
    transform: "rotate(15deg)",
    style: { animation: "float2 20s ease-in-out infinite" },
};

const square2 = {
    ...base,
    bottom: "25%",
    left: "10%",
    w: { base: "60px", md: "80px" },
    h: { base: "60px", md: "80px" },
    bg: "pink.400",
    transform: "rotate(-20deg)",
    style: { animation: "float1 24s ease-in-out infinite" },
};

const square3 = {
    ...base,
    top: "70%",
    left: "70%",
    w: { base: "40px", md: "50px" },
    h: { base: "40px", md: "50px" },
    bg: "red.300",
    transform: "rotate(25deg)",
    style: { animation: "float3 19s ease-in-out infinite" },
};

const square4 = {
    ...base,
    top: "5%",
    right: "15%",
    w: { base: "25px", md: "30px" },
    h: { base: "25px", md: "30px" },
    bg: "orange.400",
    transform: "rotate(45deg)",
    style: { animation: "float1 28s ease-in-out infinite" },
};

/* ---------- TRIANGLES ---------- */

const triangleBase = {
    width: 0,
    height: 0,
    position: "absolute",
    opacity: 0.16,
    pointerEvents: "none",
};

const triangle1 = {
    ...triangleBase,
    top: "5%",
    right: "40%",
    borderLeft: "35px solid transparent",
    borderRight: "35px solid transparent",
    borderBottom: "60px solid #63b3ed",
    style: { animation: "float3 19s ease-in-out infinite" },
};

const triangle2 = {
    ...triangleBase,
    bottom: "10%",
    right: "15%",
    borderLeft: "30px solid transparent",
    borderRight: "30px solid transparent",
    borderBottom: "55px solid #f6ad55",
    style: { animation: "float1 21s ease-in-out infinite" },
};

const triangle3 = {
    ...triangleBase,
    top: "45%",
    left: "20%",
    borderLeft: "25px solid transparent",
    borderRight: "25px solid transparent",
    borderBottom: "45px solid #fc8181",
    style: { animation: "float2 23s ease-in-out infinite" },
};