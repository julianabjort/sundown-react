import React from "react";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="mx-56">
      <Header />
      {children}
    </div>
  );
}

export default Layout;
