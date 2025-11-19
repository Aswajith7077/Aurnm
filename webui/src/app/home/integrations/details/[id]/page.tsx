"use client";
import netflixTrailer from "@/../videos/neflix_trailer.mp4";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, X } from "lucide-react";
import Image from "next/image";
import Video from "next-video";
import React from "react";
import VerifiedBadge from "@/utils/VerifiedBadge";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const sample_data = {
  netflix: {
    id: "netflix",
    title: "Netflix",
    description:
      "Premium subscription-based streaming service offering unlimited movies, TV shows, and original content across multiple devices.",
    tags: ["Streaming Platform", "Entertainment", "American", "OTT"],
    isVerified: true,
    totalIntegrations: 240_000_000,
    overallRating: 4.8,
    logoUrl: "/product/netflix/images/logo.png",
    detailed_description: "",
    closeConnections: [
      { url: "https://github.com/shadcn.png", name: "Ram" },
      { url: "https://github.com/maxleiter.png", name: "Lakshman" },
      { url: "https://github.com/evilrabbit.png", name: "Bharat" },
      { url: "https://github.com/shadcn.png", name: "Shatrughan" },
      { url: "https://githuobject-cover cb.com/shadcn.png", name: "Draupadi" },
    ],
    officialWebUrl: "https://www.netflix.com",
    imageUrls: [
      "/product/netflix/images/screenshot1.webp",
      "/product/netflix/images/screenshot2.webp",
      "/product/netflix/images/screenshot3.webp",
      "/product/netflix/images/screenshot4.webp",
      "/product/netflix/images/screenshot5.webp",
      "/product/netflix/images/screenshot6.webp",
    ],
    trailer: "netflix_trailer",
  },
};

type NetflixTrailerPlayerProps = {
  posterUrl: string;
};

const NetflixTrailerPlayer = ({ posterUrl }: NetflixTrailerPlayerProps) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative aspect-video w-full max-w-xl mx-auto">
      {/* Poster Preview */}
      <div className="w-full h-full ">
        <Image
          src={posterUrl}
          alt="Netflix Trailer Poster"
          className="rounded-2xl object-cover cursor-pointer"
          fill
          onClick={() => setOpen(true)}
        />
      </div>

      {/* Play Button Overlay */}
      <button
        onClick={() => setOpen(true)}
        className="absolute inset-0 flex items-center justify-center cursor-pointer"
      >
        <div className="bg-black/50 hover:bg-black/70 rounded-full p-4 transition">
          <Play className="w-8 h-8 text-white" />
        </div>
      </button>

      {/* Dialog for video */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-full aspect-video bg-black border-0 p-0 overflow-hidden">
          <div className="absolute top-3 right-3 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="bg-black/60 hover:bg-black text-white rounded-full cursor-pointer"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          {/* Actual Video */}
          <Video
            src={netflixTrailer}
            poster={posterUrl}
            className="w-full h-full object-cover"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const IntegrationHeader = ({
  data,
}: {
  data: (typeof sample_data)["netflix"];
}) => {
  return (
    <section className="flex flex-row gap-5">
      <Image
        src={data.logoUrl}
        width={80}
        height={80}
        alt={`${data.title} logo`}
        className="bg-black rounded-2xl aspect-square"
      />
      <div className="flex flex-col gap-3">
        <div className="flex flex-row gap-5">
          <h1>{data.title}</h1>
          <VerifiedBadge />
        </div>
        <div className="flex flex-row gap-2">
          {data.tags.map((tag, idx) => {
            return (
              <Badge key={idx} className="px-4 py-1">
                {tag}
              </Badge>
            );
          })}
        </div>
      </div>
    </section>
  );
};

type IntegrationDetialsProps = {
  params: { id: string };
};

export default function IntegrationDetails({
  params,
}: Promise<IntegrationDetialsProps>) {
  const { id } = React.use<IntegrationDetialsProps["params"]>(params);
  const data: (typeof sample_data)["netflix"] = sample_data[id];

  return (
    <ScrollArea className=" p-5 w-[80vw]">
      <h1 className="text-2xl font-semibold">Integration Details</h1>

      {/* Media */}

      <ScrollArea className="w-[78vw] my-5 overflow-x-auto">
        <div className="flex flex-row gap-5 w-max py-5">
          <NetflixTrailerPlayer posterUrl={data.imageUrls[0]} />
          {data.imageUrls.map((url, idx) => (
            <div
              className="relative w-[500px] aspect-video shadow-2xl rounded-2xl flex-shrink-0"
              key={idx}
            >
              <Image
                key={idx}
                src={url}
                fill
                alt={`${data.title} screenshot ${idx + 1}`}
                className="bg-black rounded-2xl object-cover"
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <section className="flex flex-row gap-5 w-[80vm] pr-5">
        <section className="flex flex-col w-5/7">
          <IntegrationHeader data={data} />
          <div className="flex flex-col my-10 gap-10">
            <div className="flex flex-col gap-5">
              <h1>Description</h1>
              <p>{data.description}</p>
            </div>


          </div>
        </section>

        <section className="flex flex-col w-2/7">
          <Card className="px-5">This is a sample Text</Card>
        </section>
      </section>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}
