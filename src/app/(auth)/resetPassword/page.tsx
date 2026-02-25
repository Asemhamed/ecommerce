"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { ResetPasswordSchema, ResetPasswordType } from "@/Schema/Auth.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function ResetPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, control, reset } = useForm<ResetPasswordType>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
        email: "",
        newPassword: "",
    },
    mode: "onSubmit",
});

  async function onSubmit(data: ResetPasswordType) {
    setIsLoading(true);


    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();
      console.log(result);
      if (res.ok && result.token) {
           toast.success('Account reset successfully!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
});
        localStorage.setItem("token", result.token);
        reset();

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        throw new Error(result.message || "Password reset failed");
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
});
    } finally {
      setIsLoading(false);
    }
  }

  return (
<div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-slate-50 to-gray-200 py-12 px-4">
      <div className="max-w-md w-full">
        
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20">
          
          {/* Back Button */}
          <button 
            onClick={() => router.push("/login")}
            className="cursor-pointer group flex items-center text-xs font-bold text-gray-400 hover:text-green-600 transition-colors mb-6 uppercase tracking-widest"
          >
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" /> 
            Back to Login
          </button>

          <div className="text-center mb-10">
            <div className="mx-auto h-12 w-12 bg-green-100 flex items-center justify-center rounded-xl mb-4">
              <LockKeyhole className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Secure Your Account
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Enter your email and choose a strong new password.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Email Field */}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    Email Confirmation
                  </FieldLabel>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      {...field}
                      type="email"
                      placeholder="name@example.com"
                      className={`pl-10 h-11 transition-all focus:ring-2 focus:ring-green-500/20 ${
                        fieldState.invalid ? "border-red-500 bg-red-50/30" : "border-gray-200"
                      }`}
                    />
                  </div>
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            {/* New Password Field */}
            <Controller
              name="newPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                    New Password
                  </FieldLabel>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`pl-10 pr-10 h-11 transition-all focus:ring-2 focus:ring-green-500/20 ${
                        fieldState.invalid ? "border-red-500 bg-red-50/30" : "border-gray-200"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Button
              disabled={isLoading}
              type="submit"
              className="w-full h-12 text-sm font-bold bg-green-600 hover:bg-green-700 text-white shadow-[0_4px_14px_0_rgba(34,197,94,0.39)] transition-all duration-200 active:scale-[0.97]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </form>
        </div>

      </div>
    </div>


  );
}
