import { Flex, HStack, Stack, VStack } from '@chakra-ui/react';
import Canvas from '../components/Beta/Canvas';
import { color } from 'chart.js/helpers';

export function SetupPage() {
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Canvas
        style={{
          width: '100vw',
          height: '100vh',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: -1,
        }}
      />
      <Stack position="fixed" bgColor="white" borderRadius='5px'  borderColor='rgb(7, 118, 230)' borderTopWidth="9px">
        <div className='setup_box'>
          <h2>Finish setting up your account</h2>
          <button>Next</button>
        </div>
      </Stack>
    </Flex>
  );
}
