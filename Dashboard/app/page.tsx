import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-center text-3xl mt-3 mb-3">Home Page</h1>
      <div className="text-center">
        <Link href="/signup">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
            Sign Up
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
        </Link>
      </div>
    </main>
  );
}
