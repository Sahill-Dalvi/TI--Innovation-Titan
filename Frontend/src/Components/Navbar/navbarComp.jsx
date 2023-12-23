import React from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const Links = ["Jobs", "Quiz", "Option 3"];

const NavLink = (props) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={props.href}
    >
      {children}
    </Box>
  );
};

export default function NavbarComp() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isEmployer =
    localStorage.getItem("isEmployer") == "true" ? true : false;
  const isAdmin = localStorage.getItem("isAdmin") == "true" ? true : false;
  const firstName = localStorage.getItem("firstName");

  const navigate = useNavigate();
  const userEmail = localStorage.getItem("userEmail");
  if (!userEmail) {
    navigate("/login");
  }

  const handleLogout = () => {
    localStorage.clear();
    console.log("User logged out");
    navigate("/login");
  };
  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>Talent Trek</Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {isAdmin ? (
                <></>
              ) : isEmployer ? (
                <>
                  <NavLink key="Jobs" href="/employer-dashboard">
                    Dashboard
                  </NavLink>
                  <NavLink key="Jobs" href="/job-posting">
                    Jobs
                  </NavLink>
                  <NavLink key="Jobs" href="/reviews">
                    Review
                  </NavLink>
                  <NavLink key="Jobs" href="/newsfeed">
                    News
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink key="Jobs" href="/JobListings">
                    Jobs
                  </NavLink>
                  <NavLink key="Jobs" href="/quiz">
                    Quiz
                  </NavLink>
                  <NavLink key="Jobs" href="/newsfeed">
                    News
                  </NavLink>
                  <NavLink key="Jobs" href="/intprep">
                    Prepare
                  </NavLink>
                  <NavLink key="Jobs" href="/reviews">
                    Reviews
                  </NavLink>
                </>
              )}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar size={"sm"} name={firstName?.[0]} bg={"blue.800"} />
              </MenuButton>
              <MenuList>
                {isAdmin ? (
                  <></>
                ) : (
                  <>
                    {isEmployer ? (
                      <>
                        <MenuItem as={Link} to="/employer-dashboard">
                          Dashboard
                        </MenuItem>
                      </>
                    ) : (
                      <>
                        <MenuItem as={Link} to="/toolkit">
                          Documents
                        </MenuItem>
                        <MenuItem as={Link} to="/applied-jobs">
                          Applied Jobs
                        </MenuItem>
                      </>
                    )}
                    <MenuItem as={Link} to="/web-feedback">
                      Feedback
                    </MenuItem>
                  </>
                )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {isAdmin ? (
                <></>
              ) : isEmployer ? (
                <>
                  <NavLink key="Jobs" href="/employer-dashboard">
                    Dashboard
                  </NavLink>
                  <NavLink key="Jobs" href="/job-posting">
                    Jobs
                  </NavLink>
                  <NavLink key="Jobs" href="/reviews">
                    Revires
                  </NavLink>
                  <NavLink key="Jobs" href="/newsfeed">
                    News
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink key="Jobs" href="/JobListings">
                    Jobs
                  </NavLink>
                  <NavLink key="Jobs" href="/quiz">
                    Quiz
                  </NavLink>
                  <NavLink key="Jobs" href="/newsfeed">
                    News
                  </NavLink>
                  <NavLink key="Jobs" href="/intprep">
                    Prepare
                  </NavLink>
                  <NavLink key="Jobs" href="/reviews">
                    Reviews
                  </NavLink>
                </>
              )}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
