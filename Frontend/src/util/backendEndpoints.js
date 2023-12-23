export const BASE_URL = "http://localhost:3001/";

export const CONTACT_EMPLOYER = BASE_URL + "api/sendQuery";
export const SCHEDULEINTERVIEW = BASE_URL + "api/scheduleInterview";
export const GET_JOBS = BASE_URL + "JobListings/jobs";
export const GET_JOB_POSTING = BASE_URL + "JobPosting/getAllJobPostings";
export const ADD_JOB_POSTING = BASE_URL + "JobPosting/createJobPosting";
export const DELETE_JOB_POSTING = BASE_URL + "JobPosting/deleteJobPostingById";
export const EDIT_JOB_POSTING = BASE_URL + "JobPosting/updateJobPostingById";
export const GET_JOB_POSTING_BY_EMPID =
  BASE_URL + "JobPosting/getJobPostingsByEmpId";
export const UPLOAD_TOOLKIT = BASE_URL + "jobToolkit/uploadJobToolkit";
export const GET_TOOLKIT = BASE_URL + "jobToolkit/getJobToolkitById";
export const GET_REVIEW_EMPLOYER = BASE_URL + "employerReview/employers";
export const GET_REVIEWS = BASE_URL + "employerReview/reviews";
export const VERIFY_JOB = BASE_URL + "JobListings/verify";
export const APPLIED_JOBS = BASE_URL + "api/appliedJobs";
export const SHORTLIST_CANDIDATE = BASE_URL + "api/shortlist";
export const REJECT_SHORTLISTED_CANDIDATE = BASE_URL + "api/reject";
export const SELECT_SHORTLISTED_CANDIDATE = BASE_URL + "api/offer";
export const GET_ALL_USER = BASE_URL + "users/getAllUsers";
export const NEW_USER = BASE_URL + "users/createNewUser";
export const GET_USER_BY_ID = BASE_URL + "users/getUserByEmail";
export const UPDATE_CANDIDATE_APPLIED_JOB = BASE_URL + "api/appliedJobs/update";
export const GET_INTERVIEW_DETAILS_OF_JOB = BASE_URL + "JobPosting/getJobInterviewDetailsById";
export const GET_APPLIED_JOBS_BY_CANDIDATE = BASE_URL + "api/candidateAppliedJobs";
export const POST_APPLY_JOB_BY_CANDIDATE = BASE_URL + "api/appliedJobs/applyJob";

export const TAGS = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Design",
  "Full Stack",
  "Data Analysis",
];
