import { Box, Stack, Text, Button, Image, Heading, Flex } from '@chakra-ui/react';
import Canvas from '../components/Beta/Canvas';
import { Link, useNavigate } from 'react-router-dom';

export default function BetaPage() {
  const navigate = useNavigate();

  return (
    <Box position="relative" w="100vw">
      {/* 1st Page --------------------------------------------------------------------------------*/}
      <Canvas />
      <Stack
        position="absolute"
        top={0}
        left={0}
        justifyContent={'center'}
        h={'100vh'}
        w={'100vw'}
        pl={5}
        pr={5}
      >
        <Box
          fontSize={['60px', '80px', '120px']}
          fontWeight="700"
          lineHeight="1.1"
          textColor="white"
        >
          Engage Students
        </Box>
        <Box lineHeight="1.7" textColor="white">
          We aim to get students to collaborate and learn and make learning fun
        </Box>
      </Stack>
      
      {/* 2nd page --------------------------------------------------------------------------------*/}
      <Stack direction="row" p={"25px"}>
        <Box
          width={['100vw', '100vw', '30vw']}
        >
          <Image
            src="logo_padding.png"
            alt="QenA Logo"
            display="block"
            mx="auto"
          />

          <Text fontSize={'12px'} pb={"20px"}>
            We aim to enhance the classroom experience by providing a platform
            for collaboration and communication between students and teachers.
            We want to make learning fun and easy by providing study services at
            no cost. We run entirely on donations and ad revenue
          </Text>
          <Link to={'privatepolicy'} style={{ fontWeight: 'bold' }}>
            Private Policy
          </Link>
        </Box>
        <Box  width={['100vw', '100vw', '70vw']} p={'35px'}>
          <Text>Report any bugs to the discord bugs channel<br /><br />TODO: write some other stuff</Text>
        </Box>
      </Stack>
      {/* 3rd page --------------------------------------------------------------------------------*/}
      {/* Banner Image */}
      <a
        href="https://husky-developers.github.io"
        className="Banner_Image_Container"
        style={{ position: 'relative' } as React.CSSProperties}
      >
        <Heading
          fontSize={['30px', '45px', '45px']}
          position={'absolute'}
          top={'50px'}
          left={'50px'}
        >
          Made by Husky Developers
          <Text fontSize={['10px', '12px']}>(click for more info)</Text>
        </Heading>
        <Box
          textAlign="center"
          // bgColor="#212529"
          height="100vh"
          style={{
            backgroundImage: 'url(banner.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></Box>
      </a>
      {/* Button to Login (must be rendered last to be on top) ----------------------------------*/}
      <Button
        as={Link}
        to="/login"
        position="fixed"
        top={4}
        right={120}
        style={{ opacity: 0.8, backgroundColor: 'rgba(0,0,0)' }}
        textColor="white"
      >
        Login
      </Button>
      <Button
        as={Link}
        to="/signup"
        position="fixed"
        top={4}
        right={4}
        style={{ opacity: 0.8, backgroundColor: 'rgba(0,0,0)' }}
        textColor="white"
      >
        Sign Up
      </Button>
    </Box>
  );
}