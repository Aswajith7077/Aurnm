import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowUpRight, Star, Unplug } from "lucide-react";
import VerifiedBadge from "@/utils/VerifiedBadge";
import Link from "next/link";
import React from "react";

const sample_data = {
  id: "netflix",
  title: "Netflix",
  description:
    "Premium subscription-based streaming service offering unlimited movies, TV shows, and original content across multiple devices.",
  tags: ["Streaming Platform", "Entertainment", "American", "OTT"],
  isVerified: true,
  totalIntegrations: 240_000_000,
  overallRating: 4.8,
  closeConnections: [
    { url: "https://github.com/shadcn.png", name: "Ram" },
    { url: "https://github.com/maxleiter.png", name: "Lakshman" },
    { url: "https://github.com/evilrabbit.png", name: "Bharat" },
    { url: "https://github.com/shadcn.png", name: "Shatrughan" },
    { url: "https://github.com/shadcn.png", name: "Draupadi" },
  ],
  officialWebUrl: "https://www.netflix.com",
};

type SampleDataType = typeof sample_data;

interface IntegrationCardProps {
  data: SampleDataType;
  className?: string;
}

const convertToKMBT = (num: number) => {
  const result = {
    trillions: num / 1_000_000_000_000,
    billions: num / 1_000_000_000,
    millions: num / 1_000_000,
    thousands: num / 1_000,
  };

  if (result.trillions >= 1) return `${result.trillions}T`;
  else if (result.billions >= 1) return `${result.billions}B`;
  else if (result.millions >= 1) return `${result.millions}M`;
  else if (result.thousands >= 1) return `${result.thousands}K`;
  else return `${num}`;
};

const IntegrationCard = ({ data, className }: IntegrationCardProps) => {
  return (
    <Card className={`p-7 ${className ?? ""}`}>
      <div className="flex flex-row gap-5 w-full justify-between">
        <div className="flex flex-row">
          <Avatar className="w-13 h-13">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          </Avatar>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-5">
            <h3 className="text-xl font-semibold">{data.title}</h3>
            {data.isVerified && <VerifiedBadge />}
          </div>
          <div className="flex flex-row gap-2">
            <p className="text-sm font-semibold text-gray-500">
              {data.tags[0]}
            </p>
            <Separator orientation="vertical" className="h-5 w-px" />
            <p className="text-sm font-semibold text-gray-500">
              {data.tags[1]}
            </p>
          </div>
        </div>

        <Link href={data.officialWebUrl}>
          <Button
            variant={"outline"}
            className="rounded-full aspect-square cursor-pointer"
          >
            <ArrowUpRight />
          </Button>
        </Link>
      </div>

      <p className="text-justify text-sm">{data.description}</p>
      <div className="flex flex-row items-center justify-evenly gap-3">
        <div className="flex flex-row justify-center items-center gap-3">
          <Unplug />
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-xl">{`${convertToKMBT(
              data.totalIntegrations,
            )}+`}</h3>
            <p className="text-sm">Integrations</p>
          </div>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-row justify-center items-center gap-3">
          <Star />
          <div className="flex flex-col items-center">
            <h3 className="font-semibold text-xl">{data.overallRating}</h3>
            <p className="text-sm">Rating</p>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between">
        {data.closeConnections.length > 0 && (
          <div className="flex flex-row gap-3 justify-center items-center">
            <div className="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale">
              <Avatar>
                <AvatarImage
                  src={data.closeConnections[0].url}
                  alt={data.closeConnections[0].name}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {data.closeConnections.length > 1 && (
                <Avatar>
                  <AvatarImage
                    src={data.closeConnections[1].url}
                    alt={data.closeConnections[1].name}
                  />
                  <AvatarFallback>LR</AvatarFallback>
                </Avatar>
              )}
              {data.closeConnections.length > 2 && (
                <Avatar>
                  <AvatarImage
                    src={data.closeConnections[2].url}
                    alt={data.closeConnections[2].name}
                  />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
              )}
            </div>
            <p className="text-sm">{`${data.closeConnections[0].name} ${
              data.closeConnections.length >= 2 ? "and more" : ""
            } are using`}</p>
          </div>
        )}
        <Link href={`/home/integrations/details/${data.id}`}>
          <Button className="w-fit cursor-pointer">Integrate</Button>
        </Link>
      </div>
    </Card>
  );
};

const MarketplacePage = () => {
  return (
    <div className="flex flex-col p-5 gap-5">
      <h1 className="text-2xl font-semibold">Integration Marketplace</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 9 }).map((_, i) => (
          <IntegrationCard data={sample_data} key={i} />
        ))}
      </div>
    </div>
  );
};

export default MarketplacePage;
