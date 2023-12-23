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
  Select,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { NEW_USER, GET_USER_BY_ID } from "../../util/backendEndpoints";
import JobToolkitResume from "../JobToolkit/JobToolkitResume";
import { useToast } from "@chakra-ui/react";

export default function SignupCard({ step, setStep }) {
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("employer");
  const [passwrod, setPassword] = useState("");
  const [isResumeUploaded, setIsResumeUploaded] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  let bgColor = useColorModeValue("white", "gray.700");

  const validateInputs = () => {
    // Simple regex for checking if the input contains only letters
    const nameRegex = /^[a-zA-Z]+$/;

    if (!firstName.match(nameRegex)) {
      toast({
        title: "Error",
        description: "First name must contain only letters",
        status: "error",
        isClosable: true,
      });
      return false;
    }

    if (!lastName.match(nameRegex)) {
      toast({
        title: "Error",
        description: "Last name must contain only letters",
        status: "error",
        isClosable: true,
      });
      return false;
    }

    // Basic email format validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userEmail.match(emailRegex)) {
      toast({
        title: "Error",
        description: "Invalid email format",
        status: "error",
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  const handleNext = async (e) => {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    }

    const response = await axios.get(GET_USER_BY_ID + `/${userEmail}`);

    console.log(response.data);
    if (response.data.length != 0) {
      toast({
        title: "Error",
        description: "Email already in use",
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (role != "jobseeker") {
      handleSignup();
    } else {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSignup = async (e) => {
    if (role == "jobseeker") {
      e.preventDefault();

      if (!isResumeUploaded) {
        toast({
          title: "No Resume",
          description: "Please upload resume to signup",
          status: "info",
          isClosable: true,
        });
        return;
      }
    }

    try {
      // Handle form data directly from state

      const formData = new FormData();
      // Add relevant file data to formData

      formData.append("email", userEmail);
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("role", role);
      formData.append("password", passwrod);

      const response = await axios.post(NEW_USER, formData);

      if (!response.ok) {
        console.error("Error Creating New Profile", response.statusText);
      }

      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("role", role);

      toast({
        title: "Signup Success",
        description: `Hello, ${firstName}.. Lets work hard together.`,
        status: "success",
        isClosable: true,
      });

      setTimeout(() => {
        if (role == "employer") {
          localStorage.setItem("isEmployer", true);
          localStorage.setItem("isAdmin", false);
          navigate("/job-posting");
        } else if (role == "admin") {
          localStorage.setItem("isEmployer", false);
          localStorage.setItem("isAdmin", true);
          navigate("/verify");
        } else {
          localStorage.setItem("isEmployer", false);
          localStorage.setItem("isAdmin", false);
          navigate("/toolkit");
        }
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Error during signup, Please try again later",
        status: "error",
        isClosable: true,
      });
    }
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      {step === 1 ? (
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Sign up
            </Heading>
          </Stack>
          <Box rounded={"lg"} bg={bgColor} boxShadow={"lg"} p={8}>
            <form onSubmit={handleNext}>
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName" isRequired>
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="role" isRequired>
                  <FormLabel>Role</FormLabel>
                  <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="employer">Employer</option>
                    <option value="jobseeker">Jobseeker</option>
                  </Select>
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
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
                    type="submit"
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    {role == "jobseeker" ? "Next" : "Signup"}
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user?{" "}
                    <Link color={"blue.400"} onClick={handleLoginClick}>
                      Login
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </form>
            <Stack spacing="6" paddingTop="10px">
              <HStack>
                <Divider />
                <Divider />
              </HStack>
            </Stack>
          </Box>
        </Stack>
      ) : (
        <Stack>
          <JobToolkitResume
            isSignup={true}
            signupEmail={userEmail}
            setIsResumeUploaded={setIsResumeUploaded}
          />
          <HStack spacing={10} pt={2}>
            <Button
              onClick={handleBack}
              loadingText="Submitting"
              size="lg"
              flex="40%"
              bg={"red.400"}
              color={"white"}
              _hover={{
                bg: "red.500",
              }}
            >
              Back
            </Button>

            <Button
              onClick={handleSignup}
              loadingText="Submitting"
              size="lg"
              flex="40%"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
            >
              Sign Up
            </Button>
          </HStack>
        </Stack>
      )}
    </Flex>
  );
}
