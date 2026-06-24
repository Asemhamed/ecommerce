"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { setToken } from "@/Cookies/auth.actions";
import { LoginSchema, LoginType } from "@/Schema/Auth.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify/unstyled";
import { setAuthInfo } from "../strore/auth.slice";
import { gsap } from "gsap";
import Image from "next/image";
import GroceryCart from "../../../../public/images/grocery-cart.png";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left panel slides in from left
      gsap.fromTo(
        leftPanelRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );
      // Right panel slides in from right
      gsap.fromTo(
        rightPanelRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );
      // Form fields stagger in
      if (formRef.current) {
        gsap.fromTo(
          Array.from(formRef.current.children),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.09, ease: "power2.out", delay: 0.35 }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const { handleSubmit, control, reset, register, setError } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
    mode: "onSubmit",
  });

  async function onSubmit(data: LoginType) {
    setIsLoading(true);
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok && result.message === "success") {
        toast.success("Account logged in successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
        await setToken(result.token, data.rememberMe);
        dispatch(setAuthInfo({ isAuthenticated: true, userInfo: result.user }));
        reset();
        setTimeout(() => router.push("/"), 2000);
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (err: any) {
      setError("password", { message: err.message || "Invalid email or password" });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* ── LEFT PANEL ── */}
      <div
        ref={leftPanelRef}
        style={{ opacity: 0 }}
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-white border-r border-gray-100"
      >
        {/* Top: illustration card */}
        <div className="flex-1 flex flex-col justify-center gap-10">
          {/* Illustration card */}
          <div className="relative bg-gray-50 rounded-3xl overflow-hidden p-8 flex items-center justify-center shadow-inner">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-[100px]" />
            <Image
              src={GroceryCart}
              alt="FreshCart grocery illustration"
              className="relative z-10 max-h-72 w-auto object-contain drop-shadow-lg"
            />
          </div>

          {/* Branding text */}
          <div className="text-center">
            <h2 className="text-2xl font-extrabold text-gray-900 leading-snug">
              FreshCart – Your One-Stop Shop<br />for Fresh Products
            </h2>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">
              Join thousands of happy customers who trust FreshCart for their daily grocery needs.
            </p>
          </div>
        </div>

        {/* Bottom: tagline */}
        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} FreshCart. All rights reserved.
        </p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        ref={rightPanelRef}
        style={{ opacity: 0 }}
        className="flex-1 flex items-center justify-center px-6 py-12"
      >
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-9">
            <div className="inline-flex items-center gap-1.5 mb-4">
              <ShoppingCart className="w-6 h-6 text-green-600" />
              <span className="text-2xl font-extrabold">
                <span className="text-green-600">Fresh</span>Cart
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900">Welcome Back!</h1>
            <p className="mt-1.5 text-sm text-gray-500">
              Sign in to continue your fresh shopping experience
            </p>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 [&>div]:opacity-0 [&>button]:opacity-0"
          >
            {/* Email */}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-1.5">
                  <FieldLabel className="text-sm font-semibold text-gray-700">
                    Email<span className="text-green-600">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="login-email"
                    type="email"
                    placeholder="ali@example.com"
                    className={`h-11 text-sm border-gray-200 focus-visible:ring-green-500/30 focus-visible:border-green-500 transition-all ${
                      fieldState.invalid ? "border-red-400 bg-red-50/30" : ""
                    }`}
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Password */}
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <FieldLabel className="text-sm font-semibold text-gray-700">
                      Password<span className="text-green-600">*</span>
                    </FieldLabel>
                    <button
                      type="button"
                      onClick={() => router.push("/forgotPassword")}
                      className="text-xs font-semibold text-green-600 hover:text-green-700 hover:underline"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Input
                      {...field}
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="create a strong password"
                      className={`h-11 text-sm pr-10 border-gray-200 focus-visible:ring-green-500/30 focus-visible:border-green-500 transition-all ${
                        fieldState.invalid ? "border-red-400 bg-red-50/30" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Remember Me */}
            <Controller
              name="rememberMe"
              control={control}
              render={() => (
                <div className="flex items-center gap-2">
                  <input
                    {...register("rememberMe")}
                    id="rememberMe"
                    type="checkbox"
                    className="accent-green-600 w-4 h-4"
                  />
                  <label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer select-none">
                    Keep me signed in
                  </label>
                </div>
              )}
            />

            {/* Submit */}
            <Button
              disabled={isLoading}
              id="login-submit"
              type="submit"
              className="w-full h-12 text-sm font-bold bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md shadow-green-100 transition-all active:scale-[0.97]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Footer link */}
          <p className="mt-7 text-center text-sm text-gray-500">
            New to FreshCart?{" "}
            <Link
              href="/register"
              className="font-bold text-green-600 hover:text-green-700 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
