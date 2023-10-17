import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Home() {
  const user = await getServerSession(authOptions)
  return (
    <main>
      <h1 className="mt-3 mb-3 text-3xl text-center">Home Page</h1>
      <div className="text-center">
        <Link href="/signup">
          <button className="px-4 py-2 mr-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Sign Up
          </button>
        </Link>
        <Link href="/login">
          <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Login
          </button>
        </Link>
        {
          JSON.stringify(user)
        }
      </div>
    </main>
  );
}
