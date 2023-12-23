import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Tag,
  HStack,
  Box,
} from "@chakra-ui/react";

// Your Base64 encoded image string
const iconVerifiedBase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAACxAAAAsQHGLUmNAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAkRJREFUSIntlF1IU2EYx3/vzraz5uYsGWlqSFKE5giqiwqs6IPARRloKyloQUoQBEHUTXgVfVwEXtWMgiiKLaSuIi2EIhCCCGI4KqIPbUpE09Q62845XdTQrbOdQUE3Pnfv/3ne3//9el6Yi38eAxutvD5aWmy5MK3oC2ymytMEvCSZrkXXTyFbHWi00Bjq+zuD+4FaSu1DlDkcBlkFCIMYBi1MQ88LI4Q1L/zxAR82SzduuxEcQAb2gw6I3cDy4nfwaN8tvCUBJPMT/B069tRCll77nJuwGJZbpK3FwB3Chvi1RkHSFiEWXFScgdAmzeA73D7iy85zoyqYkTagWe+ZG/QHmnHJiwE65zcRqe6gXCqZ8UZw2uvnbs0RyiQn8fT4zFydilxc9iXrXRaevLnKPKsAaHY14nf7qLR62PL+IjYhcb3qILvcK1HRODHWy4Uvs1+quF3YgC4dtf17ZtQZv8mgo4b1zjoi1YdZYvdSL1fyVZ1m78gVHkxGc3DaHyeSLQh0Uql2JpIqwEg6wfYP3STUafxuH/VyJa+SY6x7d84ADiBaChsAbAs/RUl9zAyjyifahkNMaQp3Jp6z+u0ZYsqoARxAjOUqeRrNkvXX9E8N4YkdQ0XLAwYEvch6MFc2fqYpLYSSTs+WCsJBQ0keoi40npvI300DrRVgv0S5c6d504lBGi6vNcoY7wBgU2QUVetg/Me3PBUJ4CyI46DvyWttsjR42L6GBfIqZEuUhFKLJJ3EZXMCbazoeWY6fy7+e/wEPhqmFnORt4sAAAAASUVORK5CYII=";

const JobTable = ({ jobs, onRowClick, rowClassName }) => (
  <TableContainer>
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Job ID</Th>
          <Th>Name</Th>
          <Th>Company Name</Th>
          <Th>HR Name</Th>
          <Th>Tags</Th>
        </Tr>
      </Thead>
      <Tbody>
        {jobs.map((job) => (
          <Tr
            key={job.jobId}
            onClick={() => onRowClick(job)}
            className={rowClassName}
          >
            <Td>{job.jobId}</Td>
            <Td>
              <Box display="flex" alignItems="center">
                {job.name}
                {job.verified && (
                  <img src={iconVerifiedBase64} alt="Verified" />
                )}
              </Box>
            </Td>
            <Td>{job.companyName}</Td>
            <Td>{job.hrName}</Td>
            <Td>
              <HStack spacing={2}>
                {job.tags.map((tag, index) => (
                  <Tag size="md" key={index} variant="solid" colorScheme="teal">
                    {tag}
                  </Tag>
                ))}
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  </TableContainer>
);

export default JobTable;
