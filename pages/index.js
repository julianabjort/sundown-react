import Header from "../components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className="flex flex-col space-y-4">
        <section className="flex space-x-4">
          <div className="p-6 w-2/3 h-72 border-2">
            <h1 className="heading-1">Images</h1>
          </div>
          <div className="p-6 w-1/3 h-72 border-2 flex flex-col justify-between">
            <h1 className="heading-1">Order Flow</h1>
            <Link href="/dish">
              <button className="btn-primary w-full">Order</button>
            </Link>
          </div>
        </section>

        <section className="flex space-x-4">
          <div className="flex flex-col space-y-4 p-6 w-1/2 h-72 border-2">
            <h1 className="heading-1">Find your order</h1>
            <p>Enter Email</p>
            <input type="text" className="input" />
            <button className="btn-primary w-1/3">Find</button>
          </div>
          <div className="p-6 w-1/2 h-72 border-2">
            <h1 className="heading-1">Content</h1>
          </div>
        </section>
      </main>
    </div>
  );
}
