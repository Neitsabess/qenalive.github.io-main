import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, useToast, useColorModeValue } from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { supabase } from "../supabase";
import { useToastError, useToastSuccess, useToastCloseAll } from "../assets/Utilities";

export default function ForgotPass() {

    const [email, setEmail] = useState('');
    const toast = useToast();

    const ForgotPassword = async function () {
        useToastCloseAll(); //Closes all previous opened toasts (makes spam clicking submit be less annoying)
        
        if (email === "") { //Can limit what is/isn't acceptable for a password (use methods for comparisons for more complicated checks)
            toast({
                title: "Please enter your email to reset your password!",
                position: 'bottom',
                status: 'error',
                duration: 5000,
                isClosable: false,
            })
            return
        }

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: '/updatepass',
        });

        if (error) {
            toast({
                title: error.message,
                position: 'bottom',
                status: 'error',
                duration: 3000,
                isClosable: false,
            })
        }

        toast({
            title: "Password reset email sent!",
            position: 'bottom',
            status: 'success',
            duration: 5000,
            isClosable: false,
        })


    }

    // function setEmail(value: any) {
    //     throw new Error("Function not implemented.");
    // }

    function handleSubmit(event: FormEvent<HTMLFormElement>): void {
        throw new Error("Function not implemented.");
    }

    return (
        <Flex
            width="100vw"
            height="100vh"
            align="center"
            justifyContent="center"
        >
            <Flex direction="column" background={useColorModeValue("gray.100", "gray.700")} p={12} rounded={6}>
                <Box textAlign="center">
                    <Heading>Forgot Password</Heading>
                </Box>
                <Box my={4} textAlign="left">
                    <form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <Button width="full" mt={4} type="submit">
                            Reset Password
                        </Button>
                    </form>
                </Box>
            </Flex>
        </Flex>
    )
}