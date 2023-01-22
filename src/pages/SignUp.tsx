import React from "react";
import { Link } from "react-router-dom";
import SignupForm from "../components/SignupForm";

function Signup() {
  return (
    <div>
      <SignupForm />
      <Link to="/dashboard/main">login</Link>
    </div>
  );
}

export default Signup;
