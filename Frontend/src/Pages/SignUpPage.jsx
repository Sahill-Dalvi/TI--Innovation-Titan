import React, { useState } from "react";
import { Flex, Image, ChakraProvider, HStack } from "@chakra-ui/react";
import Signup from "../Components/SignUp/signup";
import backgroundImage from "../Assets/signup_page_image.svg";
import resumeImage from "../Assets/upload_resume.svg";

const SignUpPage = () => {
  const [step, setStep] = useState(1);

  return (
    <ChakraProvider mt={8}>
      <HStack spacing={4} justify="center" align="stretch" w="100%" mt={4}>
        <Image
          src={step == 1 ? backgroundImage : resumeImage}
          alt="Background"
          boxSize={step == 1 ? "650px" : "200px"}
          objectFit="cover"
          borderRadius="md"
          mr={20}
          width={step == 1 ? "50%" : "40%"}
          height={step == 1 ? "60%" : "40%"}
          transform={step == 1 ? "scaleX(-1)" : "scaleX(1)"}
          alignSelf="center"
        />

        <Signup step={step} setStep={setStep} />
      </HStack>
    </ChakraProvider>
  );
};

export default SignUpPage;
