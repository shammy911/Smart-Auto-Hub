"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { HiMail } from "react-icons/hi";

export default function RegisterPage() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    const handleRegister = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setErr("");

        const res = await fetch("/api/auth/register", {
            method: "POST",
            body: JSON.stringify({ email, name, password }),
        });

        setLoading(false);

        if (!res.ok) {
            setErr("Account already exists");
            return;
        }

        router.push("/login");
    };

    const loginWithGoogle = () => {
        window.location.href = "/api/auth/google";   // <-- YOU WILL IMPLEMENT THIS ROUTE
    };

    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white w-full max-w-md shadow-xl rounded-2xl p-8 space-y-6 border">

                <h1 className="text-3xl font-bold text-center mb-6">
                    Create Account
                </h1>

                {/* GOOGLE LOGIN */}
                <button
                    onClick={loginWithGoogle}
                    className="w-full flex items-center justify-center gap-3 border py-3 rounded-xl hover:bg-gray-50 transition font-medium"
                >
                    <FcGoogle size={22} />
                    Continue with Google
                </button>

                {/* OR */}
                <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gray-300" />
                    <span className="text-gray-400 text-sm">OR</span>
                    <div className="flex-1 h-px bg-gray-300" />
                </div>

                {/* EMAIL REGISTER FORM */}
                <form className="space-y-4" onSubmit={handleRegister}>
                    <div>
                        <label className="font-medium">Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            className="w-full border rounded-xl px-4 py-2.5 mt-1"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="font-medium">Email</label>
                        <input
                            type="email"
                            placeholder="example@gmail.com"
                            className="w-full border rounded-xl px-4 py-2.5 mt-1"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="font-medium">Password</label>
                        <input
                            type="password"
                            placeholder="minimum 6 characters"
                            className="w-full border rounded-xl px-4 py-2.5 mt-1"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {err && <p className="text-red-500 text-center text-sm">{err}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2.5 rounded-xl hover:bg-gray-900 transition font-semibold shadow active:scale-[.98]"
                    >
                        {loading ? "Creating..." : "Register"}
                    </button>
                </form>

                <p className="text-center text-gray-500 text-sm pt-2">
                    Already have an account?
                    <span
                        onClick={() => router.push("/login")}
                        className="text-blue-600 cursor-pointer font-medium pl-1 hover:underline"
                    >
            Login
          </span>
                </p>
            </div>
        </main>
    );
}
