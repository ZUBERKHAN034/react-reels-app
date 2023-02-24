import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Protected({ Component }) {
  const { user } = useContext(AuthContext);
  return user ? Component : <Navigate to="/login" />;
}
