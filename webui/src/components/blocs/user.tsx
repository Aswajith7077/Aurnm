import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Command, Headset, LogOut, Settings2, Unplug } from "lucide-react";

const UserAvatar = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>AS</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-64 mx-5 my-3 rounded-xl p-2 font-[open-sans]"
        align="start"
      >
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex flex-row gap-5 py-3 rounded-xl cursor-pointer">
            <Avatar className="h-16 w-16">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-center">
              <h2 className=" text-lg font-bold font-[open-sans]">
                Aswajith S
              </h2>
              <h3 className="text-sm font-[open-sans]">@voicedaswa</h3>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="bg-primary text-white dark:text-black font-semibold text-sm flex flex-row cursor-pointer justify-center w-full rounded-xl my-2 py-2">
            Edit Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer rounded-lg py-2 ">
            <Settings2 strokeWidth={3.22} />
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Command strokeWidth={3.22} />
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="mx-2 my-2" />
        <DropdownMenuItem>
          <Headset strokeWidth={3.22} /> Help & Service
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          {" "}
          <Unplug strokeWidth={3.22} /> API
        </DropdownMenuItem>
        <DropdownMenuSeparator className="mx-2 my-2" />
        <DropdownMenuItem
          variant="destructive"
          className="cursor-pointer rounded-lg py-2 font-semibold"
        >
          <LogOut strokeWidth={3.22} />
          Log out
          {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAvatar;
