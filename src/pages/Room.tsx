// The basis is a room.
// Every room implements a layout giving it some props about the window
// The layout will display the sidebar and the main screen depending on the screen layout
import { Flex, useMediaQuery } from "@chakra-ui/react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";


// This is the room page that gets displayed inside the Screen inside a layout
// This is created here and then passed down through the components to the screen

function RoomPage () {
    const { roomCode } = useParams<{ roomCode: string }>();

    return (
        <Flex>
            <h1>Welcome to Room {roomCode}</h1>
        </Flex>
    )
}

function Room () {
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    return (
        <Flex
            w="100%"
            h="100%"
        >
            <Layout isMobile={isMobile} Screen={RoomPage} />
        </Flex>
    );
}

export default Room;
