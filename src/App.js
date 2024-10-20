import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import HeaderBar from "./components/HeaderBar.jsx";
import Footer from "./components/Footer.jsx";

// Simple NoData component for unmatched routes
function NoData() {
  return (
    <div className="text-center text-xl font-semibold text-red-500 py-10">
      No Data Found / Page Not Found
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="flex ">
        {/* Sidebar (Fixed position on the left) */}
        <div className="fixed top-0 left-0 z-50">
          <Sidebar />
        </div>

        {/* Main content wrapper with flex layout */}
        <div className="sm:ml-64 w-full z-40 flex flex-col">
          {/* HeaderBar with fixed position */}
          <HeaderBar className="w-full fixed top-0 left-0 z-40 bg-white shadow" />

          {/* Main Content Area with scrollable dashboard and custom scrollbar */}
          <div
            className="flex-grow overflow-auto pb-16 max-sm:mt-24"
            style={{
              height: "calc(100vh - 128px)", // 64px each for header and footer
              scrollbarWidth: "thin", // For Firefox
              scrollbarColor: "#888 transparent", // For Firefox
            }}
          >
            <style>
              {`
              /* For WebKit browsers (Chrome, Safari) */
              .flex-grow::-webkit-scrollbar {
                width: 2px; /* Width of the entire scrollbar */
              }

              .flex-grow::-webkit-scrollbar-track {
                background: transparent; /* Track background */
              }

              .flex-grow::-webkit-scrollbar-thumb {
                background-color: #888; /* Scrollbar color */
                border-radius: 10px; /* Rounded scrollbar */
                border: 2px solid transparent; /* Adds padding around the scrollbar */
              }

              .flex-grow::-webkit-scrollbar-thumb:hover {
                background-color: #555; /* Color on hover */
              }
              `}
            </style>
            <Routes>
              {/* Redirect from root to dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Dashboard route */}
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Fallback route for unmatched paths */}
              <Route path="*" element={<NoData />} />
            </Routes>
          </div>

          {/* Footer with fixed position */}
          
          <Footer className="w-full fixed bottom-0 left-0 z-40 bg-gray-800 text-white" />
        </div>
      </div>
    </Router>
  );
}

export default App;