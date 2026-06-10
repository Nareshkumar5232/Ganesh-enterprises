"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params?.get("redirect") ?? "/";
  const login = useAuthStore((s) => s.login);
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormData) {
    // Fake register — replace with API
    const user = { id: "u-registered", name: data.name, email: data.email };
    login(user, "demo-token");
    toast.success("Registration successful");
    router.push(redirect);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0F0F0F]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white dark:bg-[#121212] p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-white/6 backdrop-blur-md"
      >
        <div className="flex justify-center mb-6">
          <Image src="/images/logo.svg" alt="Sri Ganesh Enterprises" width={200} height={100} className="h-auto" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Create an account</h2>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Full name</label>
          <input {...register("name")} className="w-full p-3 rounded-lg border border-gray-200 dark:border-white/6 bg-transparent" />
        </div>
        <div className="mb-4">
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Email</label>
          <input {...register("email")} type="email" className="w-full p-3 rounded-lg border border-gray-200 dark:border-white/6 bg-transparent" />
        </div>
        <div className="mb-4 relative">
          <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Password</label>
          <input {...register("password")} type={showPass ? "text" : "password"} className="w-full p-3 rounded-lg border border-gray-200 dark:border-white/6 bg-transparent" />
          <button type="button" onClick={() => setShowPass((s) => !s)} className="absolute right-3 top-9 text-sm text-gray-500">
            {showPass ? "Hide" : "Show"}
          </button>
        </div>

        <div className="flex items-center justify-between mb-4">
          <a href="/login" className="text-sm text-[#DC2626] hover:underline">Already have an account?</a>
        </div>

        <button type="submit" className="w-full py-3 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-lg font-bold transition-colors shadow-[0_4px_12px_rgba(220,38,38,0.2)]">Create account</button>
      </form>
    </div>
  );
}

