import React from "react";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div>
      <h1>404, THE PAGE ARE NOT FOUND</h1>
      <Link to={"/"}>Back to the home page</Link>
    </div>
  );
}
