// import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
// import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

// const CandidateJobsTable = ({ jobData }) => {
//   return (
//     <Table variant="simple">
//       <Thead>
//         <Tr>
//           <Th>Jsob ID</Th>
//           <Th>Job Name</Th>
//           <Th>Shortlisted</Th>
//           <Th>Interviewed</Th>
//           <Th>Offer</Th>
//           <Th>Status</Th>
//         </Tr>
//       </Thead>
//       <Tbody>
//         {jobData.map((job) => (
//           <Tr key={job.jobId}>
//             <Td>{job.jobId}</Td>
//             <Td>{job.jobName}</Td>
//             <Td>
//               {job.isShortlisted ? (
//                 <CheckIcon color="green" />
//               ) : (
//                 <CloseIcon color="red" />
//               )}
//             </Td>
//             <Td>
//               {job.isInterviewed ? (
//                 <CheckIcon color="green" />
//               ) : (
//                 <CloseIcon color="red" />
//               )}
//             </Td>
//             <Td>
//               {job.isSelected ? (
//                 <CheckIcon color="green" />
//               ) : (
//                 <CloseIcon color="red" />
//               )}
//             </Td>
//             <Td>
//               {job.isShortlisted && !job.isInterviewed && !job.isSelected ? (
//                 <Button
//                   colorScheme="blue"
//                   size="sm"
//                   onClick={() => scheduleInterview(job.jobId)}
//                 >
//                   Schedule Interview
//                 </Button>
//               ) : (
//                 "N/A"
//               )}
//             </Td>
//           </Tr>
//         ))}
//       </Tbody>
//     </Table>
//   );
// };

// export default CandidateJobsTable;
