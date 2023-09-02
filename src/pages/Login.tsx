import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../supabase";
import {
  Box,
  Button,
  Center,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  chakra,
  useColorMode,
  useToast,
  Image,
  VStack,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaUserAlt, FaLock } from "react-icons/fa";
import Canvas from "../components/Beta/Canvas";
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

export default function Login() {
  // navigates to calendar page if authenticated
  const navigate = useNavigate();

  //For Supabase
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Showing Password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);

  //ChakraUI
  const toast = useToast();
  const { colorMode } = useColorMode();

  const handleSubmit = async function (event: React.SyntheticEvent) {
    event.preventDefault();
    console.log("Submitting");
    toast.closeAll(); //Closes all previous opened toasts (makes spam clicking submit be less annoying)
    if (email === "" || password === "") {
      //Can limit what is/isn't acceptable for a password (use methods for comparisons for more complicated checks)
      toast({
        title: "Seems that you forgot to enter your email or password!",
        position: "bottom",
        status: "error",
        duration: 5000,
        isClosable: false,
      });
      return;
    }
    try {
      const { data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      console.log(data);
      if (data.session) {
        // Successfully logged in
        const { data: user_info, error } = await supabase
          .from("user_profile")
          .select()
          .eq("auth_id", data?.user?.id);

        // console.log('user info')
        // console.log(user_info)

        let user = user_info ? user_info[0] : null;
        if (!user.first_name) {
          navigate("/setup");
        } else {
          navigate("/home");
        }
        //user_info[0]?.first_name ? navigate('/setup') : navigate('/session');
      } else {
        toast({
          title: "Please check your information or sign up!",
          position: "bottom",
          status: "error",
          duration: 5000,
          isClosable: false,
        });
      }
    } catch (err) {
      toast({
        title: (err as Error).message,
        position: "bottom",
        status: "error",
        duration: 3000,
        isClosable: false,
      });
      console.log(err);
    }
  };

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      color="white"
    >
      <Canvas />
      <Box
        bgColor="gray.800"
        position="fixed"
        borderRadius="9px"
        color="black"
        mt={"25vh"}
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Box>
            <form onSubmit={handleSubmit}>
              <Stack spacing={4} p="10px">
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.50" />}
                    />
                    {/* Email */}
                    <Input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                      backgroundColor={"gray.700"}
                      color={"white"}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <CFaLock color="gray.50" />
                    </InputLeftElement>
                    {/* Password */}
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                      backgroundColor={"gray.700"}
                      color={"white"}
                    />
                    <InputRightElement width="4.5rem">
                      <Button
                        h="1.75rem"
                        size="sm"
                        onClick={handleShowClick}
                        bg={"whiteAlpha.300"}
                        _hover={{ backgroundColor: "whiteAlpha.400" }}
                      >
                        {showPassword ? "hide" : "show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormHelperText textAlign="right">
                    <Link to="/resetpassword">Forgot password?</Link>
                  </FormHelperText>
                </FormControl>
                <Button
                  borderRadius={5}
                  type="submit"
                  variant="solid"
                  width="full"
                >
                  Login
                </Button>
                <Button
                  w={"full"}
                  maxW={"md"}
                  variant={"solid"}
                  leftIcon={<FcGoogle />}
                  bg={"black"}
                  _hover={{ bg: "grey" }}
                  color="white"
                >
                  <Center>
                    <Text>Sign in with Google</Text>
                  </Center>
                </Button>
              </Stack>
              <Center>
                <VStack>
                  <Box color="white">
                    New Here?{" "}
                    <u>
                      <Link to="/signup">Sign Up</Link>
                    </u>
                  </Box>
                </VStack>
              </Center>
            </form>
          </Box>
        </Stack>
      </Box>
      <Image
        src="logo_padding.png"
        alt="Logo"
        boxSize={["35vh", "30vh"]}
        position={"absolute"}
        top="5vh"
      />
    </Flex>
  );
}
