import React from "react";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="">
      Hello Admin
      <Link className="mt-20 " to="/admin-panel">
        go to panel
      </Link>
    </div>
  );
}

export default App;
