"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { setToken } from "@/Cookies/auth.actions";
import { LoginSchema, LoginType } from "@/Schema/Auth.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, LockKeyhole, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Bounce } from "react-toastify/unstyled";
import { setAuthInfo } from "../strore/auth.slice";


export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const { handleSubmit, control, reset,register ,setError } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
        email: "",
        password: "",
        rememberMe:false
    },
    mode: "onSubmit",
});

  async function onSubmit(data: LoginType) {
    setIsLoading(true);

    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();


      if (res.ok && result.message === "success") {
        toast.success('Account logged in successfully!', {
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
        await setToken(result.token,data.rememberMe);
        dispatch(setAuthInfo({isAuthenticated:true,userInfo:result.user}));
        reset();

        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        throw new Error(result.message || "Login failed");
      }
    } catch (err: any) {
        setError('password',{message:err.message || "Invalid email or password"});
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-100 via-slate-50 to-gray-200 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/20">

          <div className="text-center mb-10">
            <div className="mx-auto h-12 w-12 bg-green-100 flex items-center justify-center rounded-xl mb-4">
              <LockKeyhole className="h-6 w-6 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Please enter your details to sign in
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
                    Email Address
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

            {/* Password Field */}
            <Controller
              name="password"
              control={control}
              render={({ field, fieldState }) => (
                <Field className="space-y-2">
                  <div className="flex justify-between items-center">
                    <FieldLabel className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Password
                    </FieldLabel>
                    <button
                      type="button"
                      onClick={() => router.push("/forgotPassword")}
                      className="text-xs font-medium text-green-600 hover:text-green-700 hover:underline cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className={`px-10 h-11 transition-all focus:ring-2 focus:ring-green-500/20 ${
                        fieldState.invalid ? "border-red-500 bg-red-50/30" : "border-gray-200"
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
            {/* remember Me */}
              <Controller
              name="rememberMe"
              control={control}
              render={({ field, fieldState }) => (
                <div className="flex gap-2 items-center">
                  <div className="relative">
                    <input
                    {...register('rememberMe')}
                    id="rememberMeId"
                      type="checkbox"
                      className=" accent-green-600"
                    />
                  </div>
                  <label htmlFor="rememberMeId" className="text-xs font-semibold   text-gray-500">
                    Keep me signed in
                  </label>
                </div>
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
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <button
                onClick={() => router.push("/register")}
                className="font-bold text-green-600 hover:text-green-700 transition-colors cursor-pointer"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
