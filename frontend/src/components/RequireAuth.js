import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const hasRedirected = useRef(false); 

  useEffect(() => {
    if (!token && !hasRedirected.current) {
      toast.info("Please login to continue");
      navigate("/login");
      hasRedirected.current = true;
    }
  }, [token, navigate]);

  return token ? children : null;
};

export default RequireAuth;