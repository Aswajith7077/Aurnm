"use client";
import netflixTrailer from "@/../videos/neflix_trailer.mp4";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play, X } from "lucide-react";
import Video from "next-video";
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
  imageUrls: [
    "/product/netflix/images/screenshot1.webp",
    "/product/netflix/images/screenshot2.webp",
    "/product/netflix/images/screenshot3.webp",
    "/product/netflix/images/screenshot4.webp",
    "/product/netflix/images/screenshot5.webp",
    "/product/netflix/images/screenshot6.webp",
  ],
  trailer: "netflix_trailer",
};

const NetflixTrailerPlayer = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative aspect-video w-full max-w-3xl mx-auto">
      {/* Poster Preview */}
      <img
        src={sample_data.imageUrls[0]}
        alt="Netflix Trailer Poster"
        className="rounded-2xl w-full h-full object-cover cursor-pointer"
        onClick={() => setOpen(true)}
      />

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
            poster={sample_data.imageUrls[0]}
            className="w-full h-full object-cover"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default function IntegrationDetails({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Integration Details</h1>
      <p className="mt-2 text-gray-600">Integration ID: {params.id}</p>
      <NetflixTrailerPlayer />
    </div>
  );
}
