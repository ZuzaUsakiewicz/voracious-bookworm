import React from "react";
import "./App.css";
// import supabase from "./config/supabaseClient.js";
import { Link } from "react-router-dom";
import logoText from "./assets/LogoText.svg";

function App() {
  return (
    <div className="flex flex-col content-start bg-gradient-to-b from-pink-50 to-pink-100">
      <div className="w-80">
        <img
          src={logoText}
          alt="voracious bookworm logo title"
          className="object-cover"
        />
      </div>
      <h1>
        Do you love to read? Or you want to read more? Become a{" "}
        <strong>VORACIOUS BOOKWORM </strong> with our app!
      </h1>
      <div className="flex h-36 w-fit flex-col content-start justify-evenly py-4">
        <Link to="/">Read more</Link>
        <span>or</span>
        <Link
          to="signup"
          className="rounded-2xl bg-sky-700 py-2 px-4 text-slate-100"
        >
          Get started!
        </Link>
      </div>
    </div>
  );
}

export default App;
