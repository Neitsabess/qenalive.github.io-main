import { Box, Button, Center, HStack, VStack } from '@chakra-ui/react';
import { GradeChart } from '../components/Chart';

export function ClassDashboard() {
  return (
    <HStack bgColor="#65727e" height={'100vh'} width={'100vw'}>
      <div className="ChartContainer">
        <Center>
          <VStack>
            <VStack padding={'3%'} bgColor="white" borderRadius={'9px'}>
              <GradeChart />
            </VStack>
            <Button marginTop={'20%'}>Join Session</Button>
          </VStack>
        </Center>
      </div>
      <Box
        w={'60%'}
        h={'90%'}
        bgColor="white"
        borderRadius={'9px'}
        padding={'10px'}
      >
        <h1>lo</h1>
      </Box>
    </HStack>
  );
}
