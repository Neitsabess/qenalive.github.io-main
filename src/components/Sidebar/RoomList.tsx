import { Button, Center, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

type Room = {
    roomCode: string,
    roomName: string,
}

type Props = {
    joinedRooms: Array<Room>,
}

// The component lists all of the users current rooms. The passed parameter is the list of rooms joined
// It gets updated by the room finder modal
function RoomList({joinedRooms}: Props) {

    return (
        <Stack
            w='100%'
            h='100%'
            direction='column'
            justifyContent="center"
            alignItems="center"
            spacing="40px"
            overflowY="scroll"
            padding={2}
        >
            {
                joinedRooms.map((room) => {
                    return (
                        <Center w='100%'>
                            <Button 
                                width='90%'
                                key={room.roomCode}
                                variant="outline" 
                                size="lg"
                            >
                                <Link
                                    to={`/room/${room.roomCode}`} 
                                    key={room.roomCode}
                                >
                                    {room.roomName}
                                </Link>
                            </Button>
                        </Center>
                    );
                })
            }
        </Stack>

    );
}

export default RoomList;