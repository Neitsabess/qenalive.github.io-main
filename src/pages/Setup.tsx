import { Flex, HStack, Stack, VStack, useToast } from '@chakra-ui/react';
import Canvas from '../components/Beta/Canvas';
import { useState } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router';

export function SetupPage() {

let token = JSON.parse(localStorage.getItem("sb-vwtqojpmqrvrowwsrwci-auth-token")).user.id
  let toast = useToast()
  let navigate = useNavigate()

  const [state, setState] = useState('Neutral')
  const [first_name, setFirst_Name] = useState()
  const [last_name, setLast_Name] = useState()

  async function SendName() {
    const {error} = await supabase
    .from('user_profile')
    .update({'first_name': first_name, 'last_name': last_name})
    .eq( "auth_id", token )

    if (!error){
      navigate("/home")
    }
  }
  
  function ChangeState(){
    if (state === "Neutral"){
      setState('first')
    }
    else{
      if (!first_name || !last_name){
      toast({
        title: 'Please fll out the following fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    else  {
      SendName()
    }
    }
  }
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
      <Stack position="fixed" bgColor="white" borderRadius='5px'  borderColor='#cbd5e0' borderTopWidth="9px">
        <div className='setup_box' id={state}>
          <VStack alignItems='left'>
          <h2>Finish setting up your account</h2>
          {state === 'first' && (
            <>
              <input placeholder='First Name' value={first_name} onChange={e => setFirst_Name(e.target.value)}></input>
              <input placeholder='Last Name' value={last_name} onChange={e => setLast_Name(e.target.value)}></input>
            </>
            )}
            <button onClick={ChangeState}>Next</button>
          </VStack>
        </div>
      </Stack>
    </Flex>
  );
}
