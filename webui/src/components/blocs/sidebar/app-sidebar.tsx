"use client";

import * as React from "react";
import {
  Activity,
  Bell,
  Compass,
  FileText,
  Headset,
  LifeBuoy,
  Link,
  Send,
  Sparkles,
} from "lucide-react";

import { NavMain } from "@/components/blocs/sidebar/nav-main";
import { NavProjects } from "@/components/blocs/sidebar/nav-projects";
import { NavUser } from "@/components/blocs/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { appname, logo } from "@/const/general";
import Image from "next/image";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "My Integrations",
      url: "#",
      icon: Link,
      isActive: true,
      items: [
        {
          title: "OTT",
          url: "#",
        },
        {
          title: "Local",
          url: "#",
        },
        {
          title: "Enterprise",
          url: "#",
        },
      ],
    },
    {
      title: "AI Integrations",
      url: "#",
      icon: Sparkles,
      items: [
        {
          title: "Integrations optimizer",
          url: "#",
        },
        {
          title: "Advanced Plan Explorer",
          url: "#",
        },
        {
          title: "Chat Assistant",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: Activity,
      items: [
        {
          title: "Integrations",
          url: "#",
        },
        {
          title: "Billings",
          url: "#",
        },
        {
          title: "Credits",
          url: "#",
        },
      ],
    },
    {
      title: "Notifications",
      url: "#",
      icon: Bell,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Invites",
          url: "#",
        },
        {
          title: "Renewals",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Integration Marketplace",
      url: "#",
      icon: Compass,
    },
    {
      name: "Documentation",
      url: "#",
      icon: FileText,
    },
    {
      name: "Support",
      url: "#",
      icon: Headset,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="w-full">
              <a href="#" className="flex flex-row px-7 gap-5">
                {/* <div className="border-1 bg-sidebar-primary text-sidebar-primary-foreground flex size-18 items-center justify-center rounded-full"> */}
                <Image
                  src={logo.light}
                  alt="logo"
                  width={80} // same as w-20 (20 * 4px = 80px)
                  height={80}
                  className="aspect-square w-20 object-contain"
                />
                {/* </div> */}
                <div className="flex flex-col justify-center text-left text-2xl leading-tight">
                  <span className="truncate font-bold">{appname}</span>
                  <span className="truncate text-sm">Enterprise</span>
                </div>
              </a>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
