"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { RegisterSchema, RegisterType } from "@/Schema/Auth.Schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { Bounce } from "react-toastify/unstyled";
import { toast } from "react-toastify";
import Link from "next/link";


export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { handleSubmit, control, register, reset } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
      terms:false
    },
    mode: "onSubmit",
  });

  async function onSubmit(data: RegisterType) {
    setIsLoading(true);


    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

      const result = await res.json();

      if (res.ok && result.message === "success") {
        toast.success('Account created successfully!', {
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
        throw new Error(result.message || "Registration failed");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50/50 py-12 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Create Account 
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Enter your details to get started
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          {/* Name Field */}
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <Input
                placeholder="Ahmed"
                  {...field}
                  className={
                    fieldState.invalid
                      ? "border-red-500 focus-visible:ring-red-500"
                      : ""
                  }
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Email Field */}
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Email Address</FieldLabel>
                <Input
                  {...field}
                  type="email"
                  placeholder="name@example.com"
                  className={fieldState.invalid ? "border-red-500" : ""}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Password Field with Show/Hide */}
          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Password</FieldLabel>
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className={`pr-10 ${fieldState.invalid ? "border-red-500" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Re-Password Field */}
          <Controller
            name="rePassword"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Confirm Password</FieldLabel>
                <Input
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={fieldState.invalid ? "border-red-500" : ""}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* Phone Field */}
          <Controller
            name="phone"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Phone Number</FieldLabel>
                <Input
                  {...field}
                  placeholder="01xxxxxxxxx"
                  className={fieldState.invalid ? "border-red-500" : ""}
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
                        <Controller
              name="terms"
              control={control}
              render={({ field, fieldState }) => (<>
                <div className="flex gap-2 items-center -mb-1">
                  <div className="relative">
                    <input
                    {...register('terms')}
                    id="rememberMeId"
                      type="checkbox"
                      className=" accent-green-600"
                    />
                  </div>
                  <label htmlFor="rememberMeId" className="text-xs font-semibold   text-gray-500">
                    I agree to the <Link href={'/terms'} className={' text-green-600'}>Terms of Services</Link> And Privacy Policy
                  </label>
                </div>
                  {fieldState.error && <FieldError errors={[fieldState.error]} />}
                  </>
              )}
            />


          <Button
            disabled={isLoading}
            type="submit"
            className="w-full mt-2 py-6 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white shadow-md active:scale-[0.98] transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Creating
              </>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/login")}
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              Log in
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
