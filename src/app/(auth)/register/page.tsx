"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { RegisterSchema, RegisterType } from "@/Schema/Auth.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, ShoppingCart, Star, Truck, ShieldCheck } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Bounce } from "react-toastify/unstyled";
import { toast } from "react-toastify";
import Link from "next/link";
import { gsap } from "gsap";

const features = [
  {
    icon: <Star className="w-5 h-5" />,
    title: "Premium Quality",
    desc: "Premium quality products sourced from trusted suppliers.",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: <Truck className="w-5 h-5" />,
    title: "Fast Delivery",
    desc: "Same-day delivery available in most areas.",
    color: "bg-blue-50 text-blue-500",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Secure Shopping",
    desc: "Your data and payments are completely secure.",
    color: "bg-purple-50 text-purple-500",
  },
];

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftPanelRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        rightPanelRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
      );
      if (formRef.current) {
        gsap.fromTo(
          Array.from(formRef.current.children),
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: "power2.out", delay: 0.35 }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const { handleSubmit, control, register, reset } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: { name: "", email: "", password: "", rePassword: "", phone: "", terms: false },
    mode: "onSubmit",
  });

  async function onSubmit(data: RegisterType) {
    setIsLoading(true);
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (res.ok && result.message === "success") {
        toast.success("Account created successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
          transition: Bounce,
        });
        reset();
        setTimeout(() => router.push("/login"), 2000);
      } else {
        throw new Error(result.message || "Registration failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        theme: "light",
        transition: Bounce,
      });
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
        className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 bg-white border-r border-gray-100"
      >
        <div className="flex-1 flex flex-col justify-center gap-8">
          {/* Brand */}
          <div>
            <div className="inline-flex items-center gap-1.5 mb-3">
              <ShoppingCart className="w-6 h-6 text-green-600" />
              <span className="text-2xl font-extrabold">
                <span className="text-green-600">Fresh</span>Cart
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 leading-snug">
              Welcome to <span className="text-green-600">FreshCart</span>
            </h2>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-sm">
              Join thousands of happy customers who enjoy fresh groceries{" "}
              <span className="text-green-600">delivered</span> right to their doorstep.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-4">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${f.color}`}>
                  {f.icon}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{f.title}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* Testimonial card */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
                SJ
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Sarah Johnson</p>
                <div className="flex gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 italic leading-relaxed">
              "FreshCart has transformed my shopping experience. The quality of the products is outstanding."
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © {new Date().getFullYear()} FreshCart. All rights reserved.
        </p>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        ref={rightPanelRef}
        style={{ opacity: 0 }}
        className="flex-1 flex items-start justify-center px-6 py-10 overflow-y-auto"
      >
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-7">
            <h1 className="text-2xl font-extrabold text-gray-900">Create Your Account</h1>
            <p className="mt-1.5 text-sm text-gray-500">
              Start your <span className="text-green-600 font-medium">fresh</span> journey with us today
            </p>
          </div>

          {/* Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 [&>div]:opacity-0 [&>button]:opacity-0 [&>p]:opacity-0"
          >
            {/* Name */}
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-1.5">
                  <FieldLabel className="text-sm font-semibold text-gray-700">
                    Name<span className="text-green-600">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="register-name"
                    placeholder="Your Name"
                    className={`h-11 text-sm border-gray-200 focus-visible:ring-green-500/30 focus-visible:border-green-500 transition-all ${
                      fieldState.invalid ? "border-red-400 bg-red-50/30" : ""
                    }`}
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

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
                    id="register-email"
                    type="email"
                    placeholder="name@example.com"
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
                  <FieldLabel className="text-sm font-semibold text-gray-700">
                    Password<span className="text-green-600">*</span>
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="register-password"
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
                      {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {fieldState.error ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : (
                    <p className="text-[11px] text-gray-400">
                      Must be at least 8 characters with numbers and symbols
                    </p>
                  )}
                </Field>
              )}
            />

            {/* Confirm Password */}
            <Controller
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-1.5">
                  <FieldLabel className="text-sm font-semibold text-gray-700">
                    Confirm Password<span className="text-green-600">*</span>
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      {...field}
                      id="register-rePassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="confirm your password"
                      className={`h-11 text-sm pr-10 border-gray-200 focus-visible:ring-green-500/30 focus-visible:border-green-500 transition-all ${
                        fieldState.invalid ? "border-red-400 bg-red-50/30" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                    </button>
                  </div>
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Phone */}
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-1.5">
                  <FieldLabel className="text-sm font-semibold text-gray-700">
                    Phone Number<span className="text-green-600">*</span>
                  </FieldLabel>
                  <Input
                    {...field}
                    id="register-phone"
                    placeholder="+1 234 567 8900"
                    className={`h-11 text-sm border-gray-200 focus-visible:ring-green-500/30 focus-visible:border-green-500 transition-all ${
                      fieldState.invalid ? "border-red-400 bg-red-50/30" : ""
                    }`}
                  />
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* Terms */}
            <Controller
              name="terms"
              control={control}
              render={({ fieldState }) => (
                <div>
                  <div className="flex items-start gap-2.5">
                    <input
                      {...register("terms")}
                      id="terms"
                      type="checkbox"
                      className="mt-0.5 accent-green-600 w-4 h-4 cursor-pointer"
                    />
                    <label htmlFor="terms" className="text-xs text-gray-500 leading-relaxed cursor-pointer select-none">
                      I agree to the{" "}
                      <Link href="/terms" className="text-green-600 font-semibold hover:underline">
                        Terms of Services
                      </Link>{" "}
                      and Privacy Policy
                    </label>
                  </div>
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </div>
              )}
            />

            {/* Submit */}
            <Button
              disabled={isLoading}
              id="register-submit"
              type="submit"
              className="w-full h-12 text-sm font-bold bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md shadow-green-100 transition-all active:scale-[0.97]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Create My Account
                </>
              )}
            </Button>

            <p className="text-center text-sm text-gray-500 pb-2">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="font-bold text-green-600 hover:text-green-700 hover:underline cursor-pointer"
              >
                Log in
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
