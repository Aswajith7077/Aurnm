import { GalleryVerticalEnd } from "lucide-react";
import { appname, loginBg } from "@/const/general";
import SignUpForm from "@/components/blocs/signup-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SignUpPage() {
  return (
    <div className="flex flex-row h-screen">
      <div className="flex flex-col gap-4 p-6 md:p-10 w-full lg:w-[45%]">
        <div className="flex justify-end gap-2 md:justify-end">
          <Link href={"/sign-in"}>
            <Button className="cursor-pointer rounded-xl">Sign In</Button>
          </Link>
        </div>
        <div className="flex items-center justify-center flex-1">
          <div className="w-full px-[10%] md:px-30">
            <SignUpForm />
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

      <div
        className={`hidden lg:flex flex-col bg-cover bg-center bg-no-repeat justify-between bg-muted m-4 rounded-3xl p-15 text-white w-[55%]`}
        style={{ backgroundImage: loginBg }}
      >
        {/* <img src="/client/login-bg.png" alt='Login BG' className='absolute w-1/3 rounded-3xl '/> */}
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
    </div>
  );
}
