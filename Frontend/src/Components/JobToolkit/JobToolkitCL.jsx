import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Text,
  ChakraProvider,
  VStack,
  HStack,
  Image,
  Flex,
} from "@chakra-ui/react";
import { UPLOAD_TOOLKIT, GET_TOOLKIT } from "../../util/backendEndpoints";
import axios from "axios";
import { useState, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { Buffer } from "buffer";
import no_cover_letter from "../../Assets/no_cover_letter.svg";
import { useToast } from "@chakra-ui/react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const JobToolkitCL = () => {
  const [coverLetter, setCoverLetter] = useState(null);
  const toast = useToast();

  const upadteCoverLetter = (file) => {
    // debugger;
    setCoverLetter(file);
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    // Fetch job data when the component mounts
    const fetchData = async () => {
      try {
        const response = await axios.get(GET_TOOLKIT + `/${userEmail}`);
        // debugger;
        // console.log(response.data.resume.data);

        const bufferCL = Buffer.from(response.data?.coverLetter?.data);
        const base64StringCL = bufferCL?.toString("base64");
        // console.log(base64String);
        response.data.coverLetter.data = base64StringCL;

        upadteCoverLetter(response.data.coverLetter);
      } catch (error) {
        console.error("Error fetching CL data:", error);
      }
    };

    fetchData();
  }, []);

  const onDrop = async (acceptedFiles) => {
    // debugger;
    const file = acceptedFiles[0];
    const userEmail = localStorage.getItem("userEmail");
    // upadteFileUrl(file);

    const formData = new FormData();
    formData.append("userId", userEmail);
    formData.append("coverLetter", file);

    if (file.type != "application/pdf") {
      toast({
        title: "Error",
        description: "Document type is not Pdf.",
        status: "success",
        isClosable: true,
      });
      toast({
        title: "Tip:",
        description: "Only Pdf is supported for Cover Letter",
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
        description: "Cover Letter uploaded Successfully!!",
        status: "success",
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Error uploading cover letter",
        status: "error",
        isClosable: true,
      });
      console.error("Error uploading file:", error);
    }

    try {
      const response = await axios.get(GET_TOOLKIT + `/${userEmail}`);
      // debugger;
      console.log(response.data.coverLetter.data);
      const buffer = Buffer.from(response.data.coverLetter.data);
      const base64String = buffer.toString("base64");
      // console.log(base64String);
      response.data.coverLetter.data = base64String;

      upadteCoverLetter(response.data.coverLetter);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  var { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".pdf", // Specify the accepted file types
  });

  return (
    <VStack spacing={4} align="stretch" w="60%">
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
              ? "Drop the Cover Letter PDF file here..."
              : "Upload Cover Letter"}
          </Text>
        </Box>
      </center>
      {coverLetter && (
        <embed
          height={500}
          src={`data:application/pdf;base64,${coverLetter.data}`}
        />
      )}
      {!coverLetter && (
        <Flex height="50vh" alignItems="center" justifyContent="center">
          <Image
            mt={20}
            src={no_cover_letter}
            alt="Upload Cover Letter"
            width="500px"
            objectFit="cover"
            borderRadius="md"
            // mr={20}
            alignSelf="center"
          />
        </Flex>
      )}
    </VStack>
  );
};

export default JobToolkitCL;
