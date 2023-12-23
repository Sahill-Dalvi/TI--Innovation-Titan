import React from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Tag,
  Divider,
  Flex,
} from "@chakra-ui/react";

import NewJobForm from "./NewJobForm";

const JobCard = ({ job, onDelete, onEdit }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      <Heading size="md" display="inline">
        {job.name}
      </Heading>
      <Text>
        {job.companyName} <Tag>Job Id: {job.jobId}</Tag>
      </Text>
      <Box borderWidth="1px" borderRadius="lg" p={4} mt={4} mb={4}>
        <Text>{job.jobDescription}</Text>
      </Box>

      <Box mt={2}>
        {job.tags.map((tag, index) => (
          <Tag
            key={index}
            mr={2}
            display="inline"
            variant="solid"
            colorScheme="cyan"
            size="md"
          >
            {tag}
          </Tag>
        ))}
      </Box>

      <Flex mt={4} justifyContent="flex-end">
        <NewJobForm onSubmit={onEdit} editMode={true} initialFormData={job} />
        <Button colorScheme="red" ml={2} onClick={() => onDelete(job.jobId)}>
          Delete
        </Button>
      </Flex>
    </Box>
  );
};

export default JobCard;
