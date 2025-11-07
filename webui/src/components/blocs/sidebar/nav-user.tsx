"use client";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";

const FeedbackCard = () => {
  return (
    <Card className="max-w-md pt-0">
      <CardContent className="px-0">
        <div className="relative aspect-video rounded-t-xl overflow-hidden">
          <Image
            src="https://cdn.shadcnstudio.com/ss-assets/components/card/image-2.png?height=280&format=auto"
            alt="Banner"
            fill
            className="object-cover"
          />
        </div>
      </CardContent>
      <CardHeader>
        <CardDescription>
          Providing feedback will help us improve the your experience.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">Provide Feedback</Button>
      </CardFooter>
    </Card>
  );
};

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <FeedbackCard />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
