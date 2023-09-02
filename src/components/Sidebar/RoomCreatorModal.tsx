import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Icon,
    Input,
    Center,
    Flex,
} from '@chakra-ui/react';
import { VscAdd } from 'react-icons/vsc';
import { useState, useEffect } from 'react';

type ModalProps = {
    isCollapsed: boolean,
}

type Room = {
    roomName: string,
    roomCode: string,
}

type RoomProps = {
    roomName: string,
    roomCode: string,
    rooms: Array<Room>,
    updateRooms: Function,
}


// The modal that pops up when the user click the create room button
function CreateRoomModal({ isCollapsed }: ModalProps) {
    // Function creates a room using the name. Stores it in local storage until it gets merged to the supabase stuff
    // Room for lots of error checking here before creating such as duplicates
    function CreateRoom({roomName, roomCode, rooms, updateRooms}: RoomProps) {
        // Create the room object
        const newRoom = {
            roomName,
            roomCode
        };

        // Update the rooms state variable. This method makes the useEffect trigger when rooms changes
        updateRooms([...rooms, newRoom]);

        // Close the modal
        CloseModal();
    }

    // Simple function that clears the inputs before closing
    function CloseModal() {
        setRoomName('');
        setRoomCode('');
        onClose();
    }

    // React state variable to use as storage for the rooms.
    // Rooms is an array of rooms where each element is an object with a field for the name and the room code
    // The function in the useState fetches the variable we stored in local storage and sets rooms to it whenever the function reloads
    const [rooms, updateRooms] = useState(() => {
        const data = window.localStorage.getItem('ROOMS_LIST');
        return data !== null ? JSON.parse(data) : [];
      });

    // A function that triggers whenever rooms changes which stores it in local storage
    useEffect(() => {
        localStorage.setItem('ROOMS_LIST', JSON.stringify(rooms));
    }, [rooms]);

    // Another useEffect hook that runs anytime anything changes which will pull the latest rooms from local storage
    // useEffect(() => {
    //     const data = window.localStorage.getItem('ROOMS_LIST');
    //     if ( data !== null ) updateRooms(JSON.parse(data));
    //   }, []);

    const { isOpen, onOpen, onClose } = useDisclosure()

    // Variables to store the input data, idk if right
    const [roomName, setRoomName] = useState('')
    const [roomCode, setRoomCode] = useState('')

    return (
        <>
            {/* 
                The actual button a user clicks that removes the font when collapse/mobile 
                Wrapping this in a Center keeps the button always center in the box
                and setting the center to a width of 100% inside a flex makes it so the
                button will have a static width of 182px but shrink as the sidebar gets smaller
            */}
            <Center 
                width='100%'
            >
                <Button onClick={onOpen} w='182px'>
                    <Icon as={VscAdd} fontSize='2xl' ml={!isCollapsed ? 5 : 0} />
                    {!isCollapsed ? "Create room" : undefined}
                </Button>
            </Center>

            {/* The actual modal popup */}
            <Modal
                isCentered
                onClose={onClose}
                isOpen={isOpen}
                motionPreset='scale'
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create a New Room</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Pretty basic at the moment but will be expanded later */}
                        Room Name:
                        <Input
                            placeholder='Course XYZ'
                            value={roomName}
                            onChange={(e) => { setRoomName(e.target.value) }}
                        />

                        Room Code:
                        <Input
                            placeholder='ABCD-1234'
                            value={roomCode}
                            onChange={(e) => { setRoomCode(e.target.value) }}
                        />
                    </ModalBody>
                    <ModalFooter>
                        {/* On click of this button, create the room */}
                        <Button colorScheme='gray' mr={3} onClick={() => CreateRoom({roomName, roomCode, rooms, updateRooms})}>
                            Create
                        </Button>
                        {/* This button closes the modal */}
                        <Button colorScheme='blue' mr={3} onClick={() => CloseModal()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateRoomModal;