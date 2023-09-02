import { VStack } from "@chakra-ui/react";
import { supabase } from "../../supabase";
import { useNavigate } from "react-router";

export default function Options (){
    let navigate = useNavigate()

    async function out(){
        const { error } = await supabase.auth.signOut()
        navigate('/')
        console.log(error)
        localStorage.removeItem("sb-vwtqojpmqrvrowwsrwci-auth-token")
      }

    return (
        <div className="options">
            <VStack>
                <a href={`/home/settings`}>Settings</a>
                <a onClick={e => out()}>Sign out</a>
            </VStack>
        </div>
    )
}