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
} from '@chakra-ui/react';
import { supabase } from '../supabase';
import CheckAndTitle from '../components/CheckAndTitle';


export default function Profile() {

    // Variables ----------------------------------------------------------------------

    // set up state variables for the name modal and user name input fields
    const [showNameModal, setShowNameModal] = useState(false);
    const [person, setPerson] = useState({ name: '', username: '', biography: '', avatarurl: '', userid: '' });

    // UseEffects ----------------------------------------------------------------------

    // get the user's information from Supabase and update the person state
    useEffect(() => {
        const getProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('userid', user?.id)
                .single();

            if (error) {
                console.log(error);
            } else {
                // console.log(data);
                setPerson({
                    name: data.name,
                    username: data.username,
                    biography: data.biography,
                    avatarurl: data.avatarurl,
                    userid: data.userid,
                });
            }
        };
        getProfile();
    }, []);


    // Functions ----------------------------------------------------------------------

    // update the user's name in the user_profile table
    const handleNameSubmit = async () => {
        // get the user's information
        const { data: { user } } = await supabase.auth.getUser()
        console.log(user);

        const { data, error } = await supabase
            .from('profiles')
            .update({
                name: person.name,
                biography: person.biography,
                avatarurl: person.avatarurl,
            })
            .eq('userid', user?.id);

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
            <Stack
                direction={['column', null, 'row']}
                mt={12}
            >
                <Box ml={["auto", 12]} mt={6} mr={["auto", 12]}>
                    <Avatar boxSize={300} name={person.name} src={person.avatarurl} />
                    <Heading as="h1" size="xl" mt={4}>
                        {person.username}
                    </Heading>
                    <Text fontSize="lg" color="gray.500">
                        {person.name}
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
                                        <FormLabel>Full name</FormLabel>
                                        <Input
                                            placeholder="Uppercase and lowercase letters only"
                                            value={person.name}
                                            onInput={(e) => {
                                                e.currentTarget.value = e.currentTarget.value.replace(/[^a-zA-Z ]/g, '');
                                            }}
                                            onChange={(e) => setPerson((prev) => ({ ...prev, name: e.target.value }))}
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

                <Box pt={12} pl={4} pr={4} w={'full'}>
                    <Heading as="h1" size="xl" mb={4} >
                        Settings
                    </Heading>

                </Box>
            </Stack>
        // </CheckAndTitle>
    );
}