"use client";
import { AppSidebar } from "@/components/blocs/sidebar/app-sidebar";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card } from "@/components/ui/card";
import UserAvatar from "@/components/blocs/user";

interface LayoutProps {
  children: React.ReactNode;
}

const ModeToggle = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="p-5 rounded-xl cursor-pointer"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-120 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon
            size={28}
            className="absolute scale-0 rotate-90 transition-all dark:scale-120 dark:rotate-0"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default function Page({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar className="" />
      <SidebarInset className="w-[78vw]">
        <header className="flex flex-row w-full justify-between items-center p-5">
          <Card className="flex flex-row gap-2 py-3 h-12 border-1 px-2 rounded-full items-center">
            <Search size={20} className="ml-2" />
            <input
              placeholder="Type search text, navigation, AI prompts"
              className="h-full min-w-50 lg:min-w-75 border-none outline-none text-sm lg:text-md"
            />
            <Kbd className="aspect-auto w-15 h-6 mr-2 text-md rounded-full">
              ⌘+K
            </Kbd>
          </Card>
          <div className="flex flex-row gap-5 items-center">
            <ModeToggle />
            <SignedIn>
              <UserAvatar />
            </SignedIn>
          </div>
        </header>
        <SignedIn>
          <ScrollArea className="h-[89vh] w-[90vm]">{children}</ScrollArea>
        </SignedIn>
      </SidebarInset>
    </SidebarProvider>
  );
}
