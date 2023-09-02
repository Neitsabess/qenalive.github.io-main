import { Flex } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/react";
import Layout from "../components/Layout/Layout";
import { Outlet } from "react-router";

function Displaying() {
  return (
    <Flex>
      <Outlet />
    </Flex>
  );
}

function Main() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <Flex
      w="100%"
      h="100%"
    >
      <Layout isMobile={isMobile} Screen={Displaying} />
    </Flex>
  );
}

export default Main;
