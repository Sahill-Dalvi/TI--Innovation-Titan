import ReactDOM from "react-dom/client";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import TestPage from "./Pages/prep";
import Quiz from "./Pages/AssessmentQuiz";
import AppliedJobs from "./Pages/appliedJobsPage";
import LandingPage from "./Pages/landingPage";
import WebsiteFeedback from "./Pages/websiteFeedback";
import App from "./app";
import JobListings from "./Pages/JobListinigs";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import EditProfilePage from "./Pages/EditProfilePage";
import JobPosting from "./Pages/jobPosting";
import JobApplicationToolkit from "./Pages/JobApplicationToolkit";
import EmployerReviews from "./Pages/EmployerReviews";
import JobVerify from "./Pages/JobVerify";
import EmployerAppliedJobs from "./Pages/EmployerAppliedJobs";
import NewsFeed from "./Pages/NewsFeed";
import SkillFetcher from "./Pages/prep";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />}>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/quiz" element={<Quiz />} />
        <Route exact path="/web-feedback" element={<WebsiteFeedback />} />
        <Route exact path="/test" element={<TestPage />} />
        <Route exact path="/job-posting" element={<JobPosting />} />
        <Route exact path="/JobListings" element={<JobListings />} />
        <Route exact path="/toolkit" element={<JobApplicationToolkit />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/editprofile" element={<EditProfilePage />} />
        <Route path="/reviews" element={<EmployerReviews />} />
        <Route path="/verify" element={<JobVerify />} />
        <Route path="/employer-dashboard" element={<EmployerAppliedJobs />} />
        <Route exact path="/newsfeed" element={<NewsFeed />} />
        <Route exact path="/intprep" element={<SkillFetcher />} />
        <Route exact path="/applied-jobs" element={<AppliedJobs />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
