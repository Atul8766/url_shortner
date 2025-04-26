import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import UrlShortner from "../pages/UrlShortner";
const AppRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UrlShortner />} />
      </Routes>
    </Router>
  );
};

export default AppRoute;
