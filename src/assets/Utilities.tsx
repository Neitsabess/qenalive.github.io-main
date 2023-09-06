import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useToast } from '@chakra-ui/react';

// TOASTS ----------------------------------------------------------------------

export function useToastError() {
    const toast = useToast();

    return (title: string, description: string) => {
        toast({
            title: title,
            description: description,
            status: 'error',
            duration: 5000,
            isClosable: true,
        });
    };
}

export function useToastSuccess() {
    const toast = useToast();

    return (title: string, description: string) => {
        toast({
          title: title,
          description: description,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      };
}

export function useToastCloseAll() {
    const toast = useToast();
    toast.closeAll();
}

// AUTH ------------------------------------------------------------------------

export function useMyId() {
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUserId() {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                useToastError()('Error', 'not logged in');
                return;
            }
            setUserId(data?.user?.id ?? null);
        }

        fetchUserId();
    }, []);

    return userId;
}

// SUPABASE --------------------------------------------------------------------
// pass in uuid of any user and get their profile data 
export function useUserProfile(uuid: string) {
    const [userProfile, setUserProfile] = useState<any>(null);

    useEffect(() => {
        async function fetchUserProfile() {
            const { data, error } = await supabase.from('profiles').select('*').eq('userid', uuid).single();
            if (error) {
                useToastError()('Error', 'user not found');
                return;
            }
            setUserProfile(data);
        }

        fetchUserProfile();
    }, [uuid]);

    return userProfile;
}