import React, { useState } from "react";
import axios from "axios";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Divider,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { GET_USER_BY_ID } from "../../util/backendEndpoints";
import { useToast } from "@chakra-ui/react";

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async () => {
    try {
      if (!userEmail || !password) {
        toast({
          title: "Error",
          description: "Please enter both email and password",
          status: "error",
          isClosable: true,
        });
        return;
      }

      const formData = new FormData();
      // Add relevant file data to formData

      formData.append("email", userEmail);
      formData.append("password", password);

      const response = await axios.get(GET_USER_BY_ID + `/${userEmail}`);

      console.log(response.data);
      if (response.data.length == 0) {
        toast({
          title: "Error",
          description: "User Not Found",
          status: "error",
          isClosable: true,
        });
        return;
      } else if (response.data[0].password != password) {
        toast({
          title: "Error",
          description: "Wrong Password",
          status: "error",
          isClosable: true,
        });
        return;
      }

      localStorage.setItem("userEmail", response.data[0].email);
      localStorage.setItem("firstName", response.data[0].firstName);
      localStorage.setItem("lastName", response.data[0].lastName);
      localStorage.setItem("role", response.data[0].role);

      toast({
        title: "Signin Successful",
        description: `Welcome back ${response.data[0].firstName}!`,
        status: "success",
        isClosable: true,
      });

      setTimeout(() => {
        if (response.data[0].role == "employer") {
          localStorage.setItem("isEmployer", true);
          localStorage.setItem("isAdmin", false);
          navigate("/employer-dashboard");
        } else if (response.data[0].role == "admin") {
          localStorage.setItem("isEmployer", false);
          localStorage.setItem("isAdmin", true);
          navigate("/verify");
        } else {
          localStorage.setItem("isEmployer", false);
          localStorage.setItem("isAdmin", false);
          navigate("/JobListings");
        }
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error during login, please try again later",
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Login
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Logging in"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                New user?{" "}
                <Link color={"blue.400"} onClick={handleSignupClick}>
                  Sign up
                </Link>
              </Text>
            </Stack>
          </Stack>
          <Stack spacing="6" paddingTop="10px">
            <HStack>
              <Divider />

              <Divider />
            </HStack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
