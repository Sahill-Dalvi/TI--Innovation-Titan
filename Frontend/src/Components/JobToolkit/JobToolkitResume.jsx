import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Text, VStack, Image, Flex } from "@chakra-ui/react";
import { UPLOAD_TOOLKIT, GET_TOOLKIT } from "../../util/backendEndpoints";
import axios from "axios";
import { useState, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { Buffer } from "buffer";
import resume_uploaded from "../../Assets/resume_uploaded.svg";
import no_resume from "../../Assets/no_resume.svg";
import { useToast } from "@chakra-ui/react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const JobToolkitResume = ({ isSignup, signupEmail, setIsResumeUploaded }) => {
  const [resume, setResume] = useState(null);
  const toast = useToast();

  const upadteResume = (file) => {
    // debugger;
    setResume(file);
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    // Fetch job data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_TOOLKIT + `/${userEmail}`);
        // debugger;
        // console.log(response.data.resume.data);
        const bufferResume = Buffer.from(response.data?.resume?.data);
        const base64StringResume = bufferResume?.toString("base64");
        // console.log(base64String);
        response.data.resume.data = base64StringResume;

        upadteResume(response.data.resume);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    if (!isSignup) {
      fetchData();
    }
  }, []);

  const onDrop = async (acceptedFiles) => {
    // debugger;
    const file = acceptedFiles[0];
    const userEmail = isSignup
      ? signupEmail
      : localStorage.getItem("userEmail");
    // upadteFileUrl(file);

    const formData = new FormData();
    formData.append("userId", userEmail);
    formData.append("resume", file);

    if (file.type != "application/pdf") {
      toast({
        title: "Error",
        description: "Document type is not Pdf.",
        status: "success",
        isClosable: true,
      });
      toast({
        title: "Tip:",
        description: "Only Pdf is supported for Resume",
        status: "info",
        isClosable: true,
      });
      return;
    }

    try {
      await axios.post(UPLOAD_TOOLKIT, formData, {
        headers: {
          "Contetnt-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Success",
        description: "Resume Uploaded Successfully!",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error uploading Resume",
        status: "error",
        isClosable: true,
      });
      console.error("Error uploading file:", error);
    }

    try {
      const response = await axios.get(GET_TOOLKIT + `/${userEmail}`);
      // debugger;
      // console.log(response.data.resume.data);
      const buffer = Buffer.from(response.data.resume.data);
      const base64String = buffer.toString("base64");
      // console.log(base64String);
      response.data.resume.data = base64String;

      upadteResume(response.data.resume);
      setIsResumeUploaded(true);
    } catch (error) {
      console.error("Error fetching resume data:", error);
    }
  };

  var { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".pdf", // Specify the accepted file types
  });

  return (
    <VStack spacing={4} align="stretch" w={isSignup ? "100%" : "60%"}>
      <center>
        <Box
          {...getRootProps()}
          w="400px"
          p="4"
          borderWidth="2px"
          borderRadius="lg"
          textAlign="center"
          cursor="pointer"
          borderColor={isDragActive ? "blue.500" : "gray.200"}
          bg={isDragActive ? "blue.100" : "white"}
        >
          <input {...getInputProps()} />
          <Text fontSize="lg">
            {isDragActive
              ? "Drop the Resume PDF file here..."
              : "Upload Resume"}
          </Text>
        </Box>
      </center>
      {resume &&
        (!isSignup ? (
          <embed
            height={500}
            src={`data:application/pdf;base64,${resume.data}`}
          />
        ) : (
          <Flex height="50vh" alignItems="center" justifyContent="center">
            <Image
              src={resume_uploaded}
              alt="Resume Uploaded"
              width="300px"
              objectFit="cover"
              borderRadius="md"
              // mr={20}
              alignSelf="center"
            />
          </Flex>
        ))}
      {!resume &&
        (!isSignup ? (
          <Flex height="50vh">
            <Image
              mt={20}
              src={no_resume}
              alt="Upload Resume"
              width="400px"
              objectFit="cover"
              borderRadius="md"
              // mr={20}
              alignSelf="center"
            />
          </Flex>
        ) : (
          <></>
        ))}
    </VStack>
  );
};

export default JobToolkitResume;
