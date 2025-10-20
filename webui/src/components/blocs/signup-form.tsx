"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { appname } from "@/const/general";
import { useSignUp } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignUpForm = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [isNewVisible, setIsNewVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  if (!signUp) {
    return null;
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const result = await signUp.create({
        emailAddress: email,
        password: newPassword,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        window.location.href = "/";
      } else {
        console.log(result);
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) {
        setError(err.errors[0].message);
      } else {
        setError("Sign-up failed");
      }
      console.error(err);
    }
  };

  const handleOAuth = async (
    strategy: "oauth_google" | "oauth_apple" | "oauth_facebook"
  ) => {
    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: "/",
        redirectUrlComplete: "/dashboard",
      });
    } catch (err) {
      console.error(err);
    }
  };

  return !isLoaded ? (
    <p>...Loading</p>
  ) : (
    <form className="space-y-4" onSubmit={handleSignUp}>
      {/* <h1 className='text-2xl font-bold'>{appname}</h1> */}
      <h1 className="text-4xl font-bold text-center">{`Sign Up to ${appname}`}</h1>
      <p className="text-lg font-semibold text-center mb-15">
        Please enter your details to Sign Up
      </p>
      {/* Email */}
      <div className="space-y-1">
        <Label htmlFor="userEmail" className="leading-5 font-bold">
          Email address
        </Label>
        <Input
          type="email"
          id="userEmail"
          placeholder="Enter your email address"
          className="py-6 px-4 rounded-xl"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      {/*New  Password */}
      <div className="w-full space-y-1">
        <Label htmlFor="password" className="leading-5 font-bold">
          New Password
        </Label>
        <div className="relative ">
          <Input
            id="newPassword"
            type={isNewVisible ? "text" : "New Password"}
            placeholder="Your Password"
            className="py-6 px-4 rounded-xl"
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsNewVisible((prevState) => !prevState)}
            className="cursor-pointer flex flex-row items-center justify-center h-full mx-2  text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none"
          >
            {isNewVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">
              {isNewVisible ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>
      </div>

      {/* Confirm  Password */}
      <div className="w-full space-y-1">
        <Label htmlFor="password" className="leading-5 font-bold">
          Confirm Password
        </Label>
        <div className="relative ">
          <Input
            id="confirmPassword"
            type={isConfirmVisible ? "text" : "password"}
            placeholder="Type your password again"
            className="py-6 px-4 rounded-xl font-semibold"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsConfirmVisible((prevState) => !prevState)}
            className="cursor-pointer flex flex-row items-center justify-center h-full mx-2  text-muted-foreground focus-visible:ring-ring/50 absolute inset-y-0 right-0 rounded-l-none"
          >
            {isConfirmVisible ? <EyeOffIcon /> : <EyeIcon />}
            <span className="sr-only">
              {isConfirmVisible ? "Hide password" : "Show password"}
            </span>
          </Button>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button className="cursor-pointer w-full py-6 px-4 rounded-xl text-sm font-semibold" type="submit">
        {`Sign In to ${appname}`}
      </Button>

      <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-center py-3">
          {/* <Separator className="w-1/3" /> */}
          <p className="text-sm md:text-base px-3">Continue with</p>
          {/* <Separator className="w-" /> */}
        </div>
        <div className="flex flex-row w-full gap-4">
          <Button
            variant={"outline"}
            className="cursor-pointer flex items-center rounded-xl py-6 px-4 gap-5 w-[31%]"
            onClick={() => handleOAuth("oauth_google")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="20"
              height="25"
              viewBox="0 0 50 50"
            >
              <path d="M 25.996094 48 C 13.3125 48 2.992188 37.683594 2.992188 25 C 2.992188 12.316406 13.3125 2 25.996094 2 C 31.742188 2 37.242188 4.128906 41.488281 7.996094 L 42.261719 8.703125 L 34.675781 16.289063 L 33.972656 15.6875 C 31.746094 13.78125 28.914063 12.730469 25.996094 12.730469 C 19.230469 12.730469 13.722656 18.234375 13.722656 25 C 13.722656 31.765625 19.230469 37.269531 25.996094 37.269531 C 30.875 37.269531 34.730469 34.777344 36.546875 30.53125 L 24.996094 30.53125 L 24.996094 20.175781 L 47.546875 20.207031 L 47.714844 21 C 48.890625 26.582031 47.949219 34.792969 43.183594 40.667969 C 39.238281 45.53125 33.457031 48 25.996094 48 Z"></path>
            </svg>
            <p className="hidden font-semibold">Continue with google</p>
          </Button>
          <Button
            variant={"outline"}
            className="flex items-center cursor-pointer rounded-xl py-6 px-4 gap-5 w-[31%]"
            onClick={() => handleOAuth("oauth_apple")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="25"
              height="25"
              viewBox="0 0 50 50"
            >
              <path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
            </svg>
            <p className="hidden font-lg font-semibold">Continue with Apple</p>
          </Button>
          <Button
            variant={"outline"}
            className="cursor-pointer flex items-center rounded-xl py-6 px-4 gap-5 w-[31%]"
            onClick={() => handleOAuth("oauth_facebook")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="50"
              height="50"
              viewBox="0 0 50 50"
            >
              <path d="M47.3,21.01c-0.58-1.6-1.3-3.16-2.24-4.66c-0.93-1.49-2.11-2.93-3.63-4.13c-1.51-1.19-3.49-2.09-5.59-2.26l-0.78-0.04	c-0.27,0.01-0.57,0.01-0.85,0.04c-0.57,0.06-1.11,0.19-1.62,0.34c-1.03,0.32-1.93,0.8-2.72,1.32c-1.42,0.94-2.55,2.03-3.57,3.15	c0.01,0.02,0.03,0.03,0.04,0.05l0.22,0.28c0.51,0.67,1.62,2.21,2.61,3.87c1.23-1.2,2.83-2.65,3.49-3.07	c0.5-0.31,0.99-0.55,1.43-0.68c0.23-0.06,0.44-0.11,0.64-0.12c0.1-0.02,0.19-0.01,0.3-0.02l0.38,0.02c0.98,0.09,1.94,0.49,2.85,1.19	c1.81,1.44,3.24,3.89,4.17,6.48c0.95,2.6,1.49,5.44,1.52,8.18c0,1.31-0.17,2.57-0.57,3.61c-0.39,1.05-1.38,1.45-2.5,1.45	c-1.63,0-2.81-0.7-3.76-1.68c-1.04-1.09-2.02-2.31-2.96-3.61c-0.78-1.09-1.54-2.22-2.26-3.37c-1.27-2.06-2.97-4.67-4.15-6.85	L25,16.35c-0.31-0.39-0.61-0.78-0.94-1.17c-1.11-1.26-2.34-2.5-3.93-3.56c-0.79-0.52-1.69-1-2.72-1.32	c-0.51-0.15-1.05-0.28-1.62-0.34c-0.18-0.02-0.36-0.03-0.54-0.03c-0.11,0-0.21-0.01-0.31-0.01l-0.78,0.04	c-2.1,0.17-4.08,1.07-5.59,2.26c-1.52,1.2-2.7,2.64-3.63,4.13C4,17.85,3.28,19.41,2.7,21.01c-1.13,3.2-1.74,6.51-1.75,9.93	c0.01,1.78,0.24,3.63,0.96,5.47c0.7,1.8,2.02,3.71,4.12,4.77c1.03,0.53,2.2,0.81,3.32,0.81c1.23,0.03,2.4-0.32,3.33-0.77	c1.87-0.93,3.16-2.16,4.33-3.4c2.31-2.51,4.02-5.23,5.6-8c0.44-0.76,0.86-1.54,1.27-2.33c-0.21-0.41-0.42-0.84-0.64-1.29	c-0.62-1.03-1.39-2.25-1.95-3.1c-0.83,1.5-1.69,2.96-2.58,4.41c-1.59,2.52-3.3,4.97-5.21,6.98c-0.95,0.98-2,1.84-2.92,2.25	c-0.47,0.2-0.83,0.27-1.14,0.25c-0.43,0-0.79-0.1-1.13-0.28c-0.67-0.35-1.3-1.1-1.69-2.15c-0.4-1.04-0.57-2.3-0.57-3.61	c0.03-2.74,0.57-5.58,1.52-8.18c0.93-2.59,2.36-5.04,4.17-6.48c0.91-0.7,1.87-1.1,2.85-1.19l0.38-0.02c0.11,0.01,0.2,0,0.3,0.02	c0.2,0.01,0.41,0.06,0.64,0.12c0.26,0.08,0.54,0.19,0.83,0.34c0.2,0.1,0.4,0.21,0.6,0.34c1,0.64,1.99,1.58,2.92,2.62	c0.72,0.81,1.41,1.71,2.1,2.63L25,25.24c0.75,1.55,1.53,3.09,2.39,4.58c1.58,2.77,3.29,5.49,5.6,8c0.68,0.73,1.41,1.45,2.27,2.1	c0.61,0.48,1.28,0.91,2.06,1.3c0.93,0.45,2.1,0.8,3.33,0.77c1.12,0,2.29-0.28,3.32-0.81c2.1-1.06,3.42-2.97,4.12-4.77	c0.72-1.84,0.95-3.69,0.96-5.47C49.04,27.52,48.43,24.21,47.3,21.01z"></path>
            </svg>
            <p className="hidden  font-semibold">Continue with Meta</p>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
