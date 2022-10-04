import Link from "next/link";

function Header() {
  return (
    <nav className="flex justify-between my-10">
      <Link href="/">
        <img src="/logo.png" alt="logo" className="w-16 cursor-pointer" />
      </Link>
      <p>Restaurants</p>
      <p>Products</p>
      <p>Newsletter</p>
      <p>Contact</p>
    </nav>
  );
}

export default Header;
