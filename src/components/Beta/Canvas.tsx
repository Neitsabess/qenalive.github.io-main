import { Box } from "@chakra-ui/react";

export default function BetaCover() {
    
    return (
        <Box
            className="session"
            p={4}
            style={{
                backgroundColor: "black",
                backgroundImage:
                    "radial-gradient(rgb(240, 240, 240) 2px, transparent 2px), radial-gradient(rgb(240, 240, 240) 2px, transparent 2px)",
                backgroundSize: "30px 30px",
                backgroundPosition: "0 0, 15px 15px",
                height: "100vh",
                width: "100vw",
                animation: "moveDots 10s linear infinite alternate",
            }}
        >
        </Box>
    );
};