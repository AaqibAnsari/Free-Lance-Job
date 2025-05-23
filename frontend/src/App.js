import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import FreelancerDashboard from "./pages/Freelancer/Dashboard";
import ProfileCreation from "./pages/Freelancer/ProfileCreation";
import FreelancerProfile from "./pages/Freelancer/Profile";
import PostJob from "./pages/Client/PostJob";
import FindJobs from "./pages/Freelancer/FindJobs.js";
import BiddingSystem from "./pages/Freelancer/BiddingSystem";
import FreelancerReviews from "./pages/Freelancer/Reviews";
import ReviewProposals from "./pages/Client/ReviewProposals";
import Chat from "./components/Chat";
import MyProposals from "./pages/Freelancer/MyProposals"; 
import ManageJobs from "./pages/Client/ManageJobs";
import ManageAdminJobs from "./pages/Admin/ManageJobs";
import ManageUsers from "./pages/Admin/ManageUsers";
import SavedJobs from "./pages/Freelancer/BookmarkedJobs.js";


const App = () => {
  // Store user type (freelancer, client, admin)
  const [userType, setUserType] = useState(null);

  // Simulating user authentication (fetch from localStorage or API)
  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    if (storedUserType) {
      setUserType(storedUserType); // Set user type if found
    }
  }, []);

  return (
    <Router>
      <AppContent userType={userType} setUserType={setUserType} />
    </Router>
  );
};

// Separate component to handle navbar visibility
const AppContent = ({ userType, setUserType }) => {
  const location = useLocation();
  const hideNavbarRoutes = ["/", "/login", "/register"]; // Hide Navbar on these pages

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar userType={userType} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUserType={setUserType} />} />
        <Route path="/register" element={<Register setUserType={setUserType} />} />
        <Route path="/freelancer/dashboard" element={<FreelancerDashboard />} />
        <Route path="/profile-creation" element={<ProfileCreation />} />
        <Route path="/freelancer/profile" element={<FreelancerProfile />} />
        <Route path="/freelancer/reviews" element={<FreelancerReviews />} /> 
        <Route path="/client/post-job" element={<PostJob />} />        
        <Route path="/client/my-jobs" element={<ManageJobs />} />
        <Route path="/freelancer/find-jobs" element={<FindJobs />} />
        <Route path="/freelancer/saved-jobs" element={<SavedJobs />} /> {/* Reusing FindJobs for saved jobs */}
        <Route path="/freelancer/bidding" element={<BiddingSystem />} />
        <Route path="/freelancer/my-proposals" element={<MyProposals />} />
        <Route path="/Client/ReviewProposals" element={<ReviewProposals />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/manage-jobs" element={<ManageAdminJobs />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </>
  );
};

export default App;
