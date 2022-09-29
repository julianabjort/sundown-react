import React from "react";

function Header() {
  return (
    <nav className="flex justify-between my-10">
      <img src="/logo.png" alt="logo" className="w-16" />
      <p>Restaurants</p>
      <p>Products</p>
      <p>Newsletter</p>
      <p>Contact</p>
    </nav>
  );
}

export default Header;
