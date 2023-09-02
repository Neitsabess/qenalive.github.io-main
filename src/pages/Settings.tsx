import { useState, useEffect } from 'react';
import {
    Avatar,
    Heading,
    Text,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    Stack,
    Box,
    FormControl,
    FormLabel,
    ModalFooter,
    Input,
HStack,
    VStack,
} from '@chakra-ui/react';
import { supabase } from '../supabase';
import CheckAndTitle from '../components/CheckAndTitle';


export default function Profile() {

    // Variables ----------------------------------------------------------------------
let user_id = JSON.parse(localStorage.getItem("sb-vwtqojpmqrvrowwsrwci-auth-token")).user.id
    console.log(user_id);
    // set up state variables for the name modal and user name input fields
    const [showNameModal, setShowNameModal] = useState(false);
    const [person, setPerson] = useState({ first_name: '', last_name: '', userid: '' });

    // UseEffects ----------------------------------------------------------------------

    // get the user's information from Supabase and update the person state
    useEffect(() => {
        const getProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            const { data, error } = await supabase
                .from('user_profile')
                .select()
                .eq('auth_id', user_id)
                
            if (error) {
                console.log(error);
            } else {
                // console.log(data);
                setPerson({
                    first_name: data[0]?.first_name,
                    last_name: data[0]?.last_name,
                    userid: data[0]?.auth_id,
                });
            }
        };
        getProfile();
    }, []);

console.log(person);


    // Functions ----------------------------------------------------------------------

    // update the user's name in the user_profile table
    const handleNameSubmit = async () => {
        // get the user's information
        const { data: { user } } = await supabase.auth.getUser()
        console.log(user);

        const { data, error } = await supabase
            .from('user_profile')
            .update({
                first_name: person.first_name,
                last_name: person.last_name,
            })
            .eq('auth_id', user_id);

        if (error) {
            console.log(error);
        } else {
            console.log(data);
            setShowNameModal(false);
        }
    };



    const handleEditProfile = () => {
        setShowNameModal(true);
    };



    return (
        // <CheckAndTitle title='Settings'>
            <HStack
                direction={['column', null, 'row']}
                mt={12}
w="80vw"
            >
                <Box ml={["auto", 12]} mr={["auto", 12]} mb="30vh">
                    <Avatar boxSize={300} name={person.first_name} src={person.avatarurl} />
                    <Heading as="h1" size="xl" mt={4}>
                        {person.last_name}
                    </Heading>
                    <Text fontSize="lg" color="gray.500">
                        {person.first_name}
                    </Text>
                    <Button mt={4} onClick={handleEditProfile} w={"full"}>
                        Edit Profile
                    </Button>
                    {/* modal for name and username */}
                    {showNameModal && (
                        <Modal isOpen={showNameModal} onClose={() => setShowNameModal(false)}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader>Edit Profile Information</ModalHeader>
                                <ModalBody>
                                    <FormControl>
                                        <FormLabel>Fist Name</FormLabel>
                                        <Input
                                            placeholder="Uppercase and lowercase letters only"
                                            value={person.first_name}
                                            onInput={(e) => {
                                                e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z ]/g, '');
                                            }}
                                            onChange={(e) => setPerson((prev) => ({ ...prev, first_name: e.target.value }))}
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Last Name</FormLabel>
                                        <Input
                                            placeholder="Uppercase and lowercase letters only"
                                            value={person.last_name}
                                            onInput={(e) => {
                                                e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z ]/g, '');
                                            }}
                                            onChange={(e) => setPerson((prev) => ({ ...prev, last_name: e.target.value }))}
                                        />
                                    </FormControl>
                                    <FormControl mt={4}>
                                        <FormLabel>Avatar</FormLabel>
                                        <Input
                                            placeholder="put a url here"
                                            value={person.avatarurl}
                                            onChange={(e) => setPerson((prev) => ({ ...prev, avatarurl: e.target.value }))}
                                        />
                                    </FormControl>
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme="blue" mr={3} onClick={handleNameSubmit}>
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    )}
                </Box>

                <VStack pt={12} pl={4} pr={4} w="100vw" pos="relative" bottom="25vh">
                    <ul className='settings'>
                        <li>
                            <span className="material-symbols-outlined">key</span>
                            <p>Manage Password</p>
                            <i className="material-symbols-outlined">navigate_next</i>
                        </li>
                        {/* <li>
                            <span className="material-symbols-outlined">mail</span>
                            <p>Change Email</p>
                            <i className="material-symbols-outlined">navigate_next</i>
                        </li> */}
                        <li>
                            <span className="material-symbols-outlined">smartphone</span>
                            <p>Phone</p>
                            <i className="material-symbols-outlined">navigate_next</i>
                        </li>
                    </ul>

                </VStack>
            </HStack>
        // </CheckAndTitle>
    );
}