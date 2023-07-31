import { Box, Stack, VStack, Text, Button, Image, useColorModeValue, IconButton } from "@chakra-ui/react";
import Canvas from "../components/Beta/Canvas";
import { Link, useNavigate } from "react-router-dom";
import {
    FaDiscord,
    FaFacebookSquare,
    FaInstagram,
    FaTwitter,
    FaYoutube,
    FaTiktok,
} from 'react-icons/fa';

// edit this file to change the content of the beta page
import { useEffect } from 'react';
import { supabase } from '../supabase';

export default function BetaPage() {
    // failsafe redirect to login if not authenticated
    const navigate = useNavigate();

    useEffect(() => {
        const getUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            // console.log(data);
            if (data.user != null);
        };
        getUser();
    }, []);


    // Define keyframes outside of the style object
    const keyframes = 
        // `@keyframes moveDots {
        //     0% {
        //         background-position: 0 0, 50px 25px;
        //     }
        //     100% {
        //         background-position: 50px 0, 0 25px;
        //     }
        // }`
        `@keyframes moveDots {
            0% {
              background-position: 0 0, 50px 25px;
            }
            100% {
              background-position: calc(25px * var(--x)) 0, calc(25px * var(--y)) calc(25px * var(--z));
            }
          }`;

    // Add the keyframes to the head of the document
    const style = document.createElement("style");
    style.type = "text/css";
    style.appendChild(document.createTextNode(keyframes));
    document.head.appendChild(style);


    return (
        <Box position="relative" bgColor="#65727e" w="100vw">

            {/* 1st Page */}
            <Canvas />
            <Stack position="absolute" top={0} left={0} justifyContent={'center'} h={'100vh'} w={'100vw'} pl={5} pr={5}>
                <Box fontSize={["60px", "80px", "120px"]} fontWeight='700' lineHeight='1.1' textColor='white'>
                    Make Learning Fun
                </Box>
                <Box lineHeight='1.7' textColor='white'>
                    Insert an isometric logo and other icons background here
                </Box>

            </Stack>
            <Box h="100vh"></Box> {/*keep this to allow the first page to actually take space*/}

            {/* 2nd page */}
            <Stack
                direction={['column', null, 'row']}
                p={2}
            >
                <VStack
                    height="100vh"
                    alignItems={['center', null, 'flex-start']}
                    justifyContent="center"
                    textAlign={['center', null, 'left']}
                    p={4}
                >
                    <Image src="qena192 text.png" alt="QenA Logo" display="block" mx="auto" w={'150px'}/>
                    <Box fontSize={['30px', '4xl']} fontWeight='700' lineHeight='1.1'>
                        What does QenA do
                    </Box>
                    <Text>
                        yes
                    </Text>
                </VStack>

                <VStack spacing='2rem' pt='2rem' pb='2rem'>
                    yes
                </VStack>
            </Stack>


            {/* 3rd page */}

            {/* Banner Image */}
            <a href="https://husky-developers.github.io" className="Banner_Image_Container">
            <Box
                gap='2rem'
                textAlign='center'
                bgColor="#212529"
            >
                <img src="husky_developer_banner.png" alt="Husky Developers Banner" className="Banner_Image"></img>
            </Box>
            </a>

            {/* Footer */}
            <Stack direction={['column', null, 'row']} p={2}>

                <Stack direction={'row'} mt={4} ml={4} mr={4}>
                    <IconButton as="a" href="https://discord.gg/T3BUHPFUr2" target="_blank" rel="noopener noreferrer" aria-label="Discord" icon={<FaDiscord />} mr={2} />7
                </Stack>

                <Box p={4} ml={'auto'}>
                    <Text>Copyright 2023. All Rights Reserved.</Text>
                    <Link to={'privatepolicy'} style={{ fontWeight: 'bold' }}>Private Policy</Link>
                </Box>

            </Stack>


            {/* Button to Login (must be rendered last to be on top)*/}
            <Button as={Link} to="/login" position="fixed" top={4} right={120} style={{ opacity: 0.8, backgroundColor: 'rgba(0,0,0)' }} textColor='white'>Login</Button>
            <Button as={Link} to="/signup" position="fixed" top={4} right={4} style={{ opacity: 0.8, backgroundColor: 'rgba(0,0,0)' }} textColor='white'>Sign Up</Button>
        </Box >
    );
}