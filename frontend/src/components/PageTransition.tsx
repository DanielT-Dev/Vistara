import { motion } from "framer-motion";

const MotionDiv = motion.div;

export default function PageTransition({ children }: { children: React.ReactNode }) {
    return (
        <MotionDiv
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            style={{ height: "100%" }}
        >
            {children}
        </MotionDiv>
    );
}