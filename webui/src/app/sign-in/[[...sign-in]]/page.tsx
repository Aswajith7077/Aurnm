import { GalleryVerticalEnd } from "lucide-react";
import { appname } from "@/const/general";

import SignInForm from "@/components/blocs/signin-form";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export default function SignInPage() {
  return (
    <div className="flex flex-row h-screen">
      <div className="hidden lg:flex flex-col bg-[url('/client/login-bg.png')] bg-cover bg-center bg-no-repeat justify-between bg-muted m-4 rounded-3xl p-15 text-white w-[55%]">
        <Link href="#" className="flex items-center gap-2 font-medium">
          <div className="flex items-center justify-center rounded-md bg-primary text-primary-foreground size-6">
            <GalleryVerticalEnd className="size-4" />
          </div>
          {appname}
        </Link>
        <p className="text-lg font-semibold text-justify">
          A unified platform to manage, track, and optimize personal and
          enterprise subscriptions seamlessly, while providing intelligent
          insights for cost efficiency and better financial control.
        </p>
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-10 w-[45%] m-2">
        <div className="flex justify-end gap-2 md:justify-end">
          <Link href={"/sign-up"}>
            <Button className="cursor-pointer rounded-xl">Sign Up</Button>
          </Link>
        </div>
        <div className="flex items-center justify-center flex-1">
          <div className="w-full px-[5%] md:px-30">
            <SignInForm />
          </div>
        </div>
        <div className="flex flex-row items-center justify-center">
          <Button variant={"link"} className="text-base cursor-pointer">
            Terms and Condition
          </Button>
          <Separator orientation="vertical" />
          <Button variant={"link"} className="text-base cursor-pointer">
            Privacy Policy
          </Button>
        </div>
      </div>
    </div>
  );
}
