import React from "react";
import { Link } from "react-router-dom";

function BreadCrumb() {
  return (
    <>
      <ul class="breadcrumb">
        <li>
          <Link to="/home">Home</Link>
        </li>
      </ul>
    </>
  );
}

export default BreadCrumb;
