import backgroundImage from "../Assets/login_page_image.svg";
import React from "react";
import { Flex, Image, ChakraProvider, HStack } from "@chakra-ui/react";
import Login from "../Components/Login/login";

const LoginPage = () => {
  return (
    <ChakraProvider mt={8}>
      <HStack spacing={4} justify="center" align="stretch" w="100%" mt={4}>
        <Image
          src={backgroundImage}
          alt="Background"
          width="650px"
          height="500px"
          objectFit="cover"
          borderRadius="md"
          // mr={20}
          alignSelf="center"
        />

        <Login />
      </HStack>
    </ChakraProvider>
  );
};

export default LoginPage;
