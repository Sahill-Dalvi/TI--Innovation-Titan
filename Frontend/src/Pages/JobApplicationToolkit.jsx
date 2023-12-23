import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Text, ChakraProvider, VStack, HStack } from "@chakra-ui/react";
import { UPLOAD_TOOLKIT, GET_TOOLKIT } from "../util/backendEndpoints";
import axios from "axios";
import { useState, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { Buffer } from "buffer";
import JobToolkitResume from "../Components/JobToolkit/JobToolkitResume";
import JobToolkitCL from "../Components/JobToolkit/JobToolkitCL";
import { useNavigate } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const JobApplicationToolkit = () => {
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);

  const navigate = useNavigate();

  const upadteResume = (file) => {
    // debugger;
    setResume(file);
  };

  const upadteCoverLetter = (file) => {
    // debugger;
    setCoverLetter(file);
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
    }
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

        const bufferCL = Buffer.from(response.data?.coverLetter?.data);
        const base64StringCL = bufferCL?.toString("base64");
        // console.log(base64String);
        response.data.coverLetter.data = base64StringCL;

        upadteResume(response.data.resume);
        upadteCoverLetter(response.data.coverLetter);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    fetchData();
  }, []);

  const onDropResume = async (acceptedFiles) => {
    // debugger;
    const file = acceptedFiles[0];
    const userEmail = localStorage.getItem("userEmail");
    // upadteFileUrl(file);

    const formData = new FormData();
    formData.append("userId", userEmail);
    formData.append("resume", file);

    try {
      await axios.post(UPLOAD_TOOLKIT, formData, {
        headers: {
          "Contetnt-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
    }

    try {
      const response = await axios.get(GET_TOOLKIT + `/${userEmail}`);
      // debugger;
      console.log(response.data.resume.data);
      const buffer = Buffer.from(response.data.resume.data);
      const base64String = buffer.toString("base64");
      // console.log(base64String);
      response.data.resume.data = base64String;

      upadteResume(response.data.resume);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  const onDropCoverLetter = async (acceptedFiles) => {
    // debugger;
    const file = acceptedFiles[0];
    const userEmail = localStorage.getItem("userEmail");
    // upadteFileUrl(file);

    const formData = new FormData();
    formData.append("userId", userEmail);
    formData.append("coverLetter", file);

    try {
      await axios.post(UPLOAD_TOOLKIT, formData, {
        headers: {
          "Contetnt-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded successfully!");
    } catch (error) {
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
    onDropResume,
    accept: ".pdf", // Specify the accepted file types
  });

  const getRootPropsResume = getRootProps;
  const getInputPropsResume = getInputProps;
  const isDragActiveResume = isDragActive;

  ({ getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropCoverLetter,
    accept: ".pdf", // Specify the accepted file types
  }));

  const getRootPropsCL = getRootProps;
  const getInputPropsCL = getInputProps;
  const isDragActiveCL = isDragActive;

  return (
    <ChakraProvider mt={8}>
      <HStack spacing={4} justify="center" align="stretch" w="100%" mt={8}>
        <JobToolkitResume />
        <JobToolkitCL />
      </HStack>
    </ChakraProvider>
  );
};

export default JobApplicationToolkit;
