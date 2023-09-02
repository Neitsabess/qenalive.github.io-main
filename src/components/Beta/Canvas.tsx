import { Box } from "@chakra-ui/react";

export default function BetaCover() {
    
    return (
        <Box
            className="session"
            p={4}
            style={{
                backgroundColor: "rgb(20, 20, 20)",
                backgroundImage:
                    "radial-gradient(rgb(140, 140, 140) 2px, transparent 2px), radial-gradient(rgb(90, 90, 90) 2px, transparent 2px)",
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