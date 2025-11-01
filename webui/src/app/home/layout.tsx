"use client";
import { AppSidebar } from "@/components/blocs/sidebar/app-sidebar";
import UserAvatar from "@/components/blocs/user";
import { Input } from "@/components/ui/input";
import { Kbd } from "@/components/ui/kbd";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Page({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar className="" />
      <SidebarInset className="w-full">
        <header className="flex flex-row w-full justify-between p-5">
          <div className="flex flex-row gap-2 h-10 border-1 px-2 rounded-full items-center">
            <Search size={20} className="ml-2" />
            <Input
              placeholder="Type search text, navigation, AI prompts"
              className="h-full min-w-50 lg:min-w-75 border-none text-sm lg:text-md"
            />
            <Kbd className="aspect-auto w-15 h-6 text-md rounded-full">⌘+K</Kbd>
          </div>
          <SignedIn>
            <UserButton showName/>
          </SignedIn>
        </header>
        <SignedIn>
          <ScrollArea className="h-[90vh]">{children}</ScrollArea>
        </SignedIn>
      </SidebarInset>
    </SidebarProvider>
  );
}
