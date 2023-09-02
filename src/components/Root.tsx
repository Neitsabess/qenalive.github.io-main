import { HStack, VStack } from '@chakra-ui/react';
import { Outlet, useNavigate } from 'react-router';
import { supabase } from '../supabase';

export default function Root() {
  let navigate = useNavigate();
  async function out(){
    const { error } = await supabase.auth.signOut()
    navigate('/')
    console.log(error)
    localStorage.removeItem("sb-vwtqojpmqrvrowwsrwci-auth-token")
  }
  return (
    <HStack>
      <div className='test'>
        <VStack>
          <button className='test_2' onClick={(e) => navigate('/settings')}>Settings</button>
          <button className='test_2' onClick={(e) => navigate('/session')}>Sessions</button>
          <button className='test_2' onClick={(e) => out()}>Sign out</button>
        </VStack>
      </div>
      <Outlet />
    </HStack>
  );
}
