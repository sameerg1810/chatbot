import React from "react";

import "../App.css";
const TheFooter = () => {
  return (
    <div>
      <footer
        className="bg-light py-3 text-center"
        style={{ position: "fixed", bottom: 0, width: "100%" }}
      >
        <div>Tour Guide &copy; 2023</div>
      </footer>
    </div>
  );
};

export default TheFooter;
