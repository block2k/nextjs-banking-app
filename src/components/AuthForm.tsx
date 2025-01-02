"use client";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { signIn, signUp } from "@/lib/actions/user.actions";
import { authFormSchema } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CustomInput from "./CustomInput";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: "sign-in" | "sign-up" }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const userData = {
          firstName: data.firstName!,
          lastName: data.lastName!,
          address1: data.address!,
          city: data.city!,
          state: data.state!,
          postalCode: data.postalCode!,
          dateOfBirth: data.dateOfBirth!,
          ssn: data.ssn!,
          email: data.email,
          password: data.password,
        };
        const response = await signUp(userData);

        setUser(response);
      }

      if (type === "sign-in") {
        const response = await signIn({ email: data.email, password: data.password });
        if (response) {
          router.push("/");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/dashboard" className="flex cursor-pointer items-center gap-1">
          <Image src="/icons/logo.svg" width={34} height={34} alt="Dashboard" />
          <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Hamsa</h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}
            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to continue"
                : type === "sign-in"
                ? "Enter your details to sign in"
                : "Enter your details to sign up"}
            </p>
          </h1>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">
          <PlaidLink user={user} variant="primary" />
        </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      id="firstName"
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Enter your first name"
                      type="text"
                    />
                    <CustomInput
                      id="lastName"
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Enter your last name"
                      type="text"
                    />
                  </div>
                  <CustomInput
                    id="address"
                    control={form.control}
                    name="address"
                    label="Address"
                    placeholder="Enter your address"
                    type="text"
                  />
                  <CustomInput
                    id="city"
                    control={form.control}
                    name="city"
                    label="City"
                    placeholder="Enter your city"
                    type="text"
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      id="state"
                      control={form.control}
                      name="state"
                      label="State"
                      placeholder="Select your state"
                      type="text"
                    />
                    <CustomInput
                      id="postalCode"
                      control={form.control}
                      name="postalCode"
                      label="Postal Code"
                      placeholder="e.g. 100001"
                      type="text"
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      id="dateOfBirth"
                      control={form.control}
                      name="dateOfBirth"
                      label="Date of Birth"
                      placeholder="YYYY-MM-DD"
                      type="text"
                    />
                    <CustomInput
                      id="ssn"
                      control={form.control}
                      name="ssn"
                      label="SSN"
                      placeholder="Enter your SSN"
                      type="text"
                    />
                  </div>
                </>
              )}
              <CustomInput
                id="email"
                control={form.control}
                name="email"
                label="Email"
                placeholder="Enter your email"
                type="email"
              />
              <CustomInput
                id="password"
                control={form.control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                type="password"
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" className="form-btn" disabled={isLoading}>
                  {isLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p>{type === "sign-in" ? `Don't have an account?` : `Already have an account?`}</p>
            <Link href={type === "sign-in" ? "/sign-up" : "/sign-in"} className="text-blue-600">
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
