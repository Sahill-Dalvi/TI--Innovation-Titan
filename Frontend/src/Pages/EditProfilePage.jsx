
import React from 'react';
import { Flex } from "@chakra-ui/react";
import EditProfile from "../Components/EditProfile/editprofile";

const EditProfilePage = () => {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <EditProfile />
    </Flex>
  );
};

export default EditProfilePage;
