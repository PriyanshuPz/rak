"use client";
import useFeeds from "@/hooks/use-feed";
import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import { Button, buttonVariants } from "./ui/button";
import { Clipboard, ExternalLink, Clock, User, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useToast } from "./ui/use-toast";
import { Skeleton } from "./ui/skeleton";
import { Separator } from "./ui/separator";
import { NFT_ENDPOINT } from "@/lib/ipfs";
import { useFlags } from "flagsmith/react";

const FeedSection = () => {
  const { data, error, status } = useFeeds();
  const { toast } = useToast();
  const flags = useFlags(["show_copy_btn"]);
  const show_copy_btn = flags.show_copy_btn.enabled;

  function copyCid(cid: string) {
    const txt = `${NFT_ENDPOINT}/${cid}`;
    navigator.clipboard.writeText(txt);
    toast({
      title: "Copied to clipboard",
      description: "Certificate link has been copied to your clipboard",
    });
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 m-2">
        <div className="flex flex-col items-center space-y-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="font-medium">Error loading certificates</p>
          <p className="text-sm text-destructive/80">{error.message}</p>
        </div>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="space-y-8 p-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-card rounded-xl p-4 border border-border/40 shadow-sm"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[180px]" />
                <Skeleton className="h-3 w-[120px]" />
              </div>
            </div>
            <Skeleton className="h-[200px] w-full rounded-lg mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-[70%]" />
              <div className="flex justify-between">
                <Skeleton className="h-9 w-[120px]" />
                <Skeleton className="h-9 w-9 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="py-4 space-y-6">
      {!data || data.length === 0 ? (
        <div className="bg-gradient-to-b from-card/60 to-background p-6 rounded-xl border border-border/50 shadow-sm">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-center p-4">
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                No certificates yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Let's mint your certificates to see them in your feed
              </p>

              <div className="bg-muted/50 rounded-lg p-4">
                <div className="space-y-4 text-start">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">
                      1
                    </div>
                    <p className="leading-relaxed">
                      Click on the "Create" button in the top right corner
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">
                      2
                    </div>
                    <p className="leading-relaxed">
                      Upload your certificate image
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">
                      3
                    </div>
                    <p className="leading-relaxed">
                      Mint your certificate to IPFS
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-primary mr-3 mt-0.5 flex-shrink-0">
                      4
                    </div>
                    <p className="leading-relaxed">
                      Your certificate will appear here in your feed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/new"
                  className={cn(
                    buttonVariants({
                      size: "lg",
                    }),
                    "gap-2"
                  )}
                >
                  Create Certificate <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg">
              <p className="mb-2 font-medium">About IPFS</p>
              <p>
                The InterPlanetary File System (IPFS) is a set of composable,
                peer-to-peer protocols for addressing, routing, and transferring
                content-addressed data in a decentralized file system. Many
                popular Web3 projects are built on IPFS.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.map((certificate) => (
            <div
              key={certificate.id}
              className="group bg-card rounded-xl border border-border/50 shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <div className="relative">
                <div className="overflow-hidden">
                  <AspectRatio ratio={4 / 3}>
                    <Image
                      fill
                      className="rounded-t-lg object-cover transform transition-transform duration-500 group-hover:scale-105"
                      src={`${NFT_ENDPOINT}/${certificate.cid}`}
                      alt={`${certificate.title}`}
                      onError={(e) => {
                        // Error handling
                      }}
                    />
                  </AspectRatio>
                </div>
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                  Certificate
                </div>
              </div>

              <div className="p-4 w-full">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {certificate.title}
                  </h3>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Today</span>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-2">
                    <User className="h-3 w-3 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ID: {certificate.id.substring(0, 5)}...
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  {show_copy_btn && (
                    <Button
                      onClick={() => copyCid(certificate.cid)}
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Clipboard className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Copy Link</span>
                      <span className="sm:hidden">Copy</span>
                    </Button>
                  )}

                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Share</span>
                    <span className="sm:hidden">Share</span>
                  </Button>

                  <Link
                    href={`/view?cid=${certificate.cid}`}
                    className={cn(
                      buttonVariants({
                        variant: "default",
                        size: "sm",
                      }),
                      "flex-1"
                    )}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">View</span>
                    <span className="sm:hidden">View</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FeedSection;
