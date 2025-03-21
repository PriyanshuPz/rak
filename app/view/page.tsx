import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { NFT_ENDPOINT } from "@/lib/ipfs";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Download,
  Share2,
  AlertTriangle,
  Info,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

const ViewPage = async (props: Props) => {
  const cid = props.searchParams.cid;
  const imageUrl = cid
    ? `${NFT_ENDPOINT}/${cid}`
    : "/placeholder-certificate.jpg";

  // Format the CID for display (shortened version)
  const displayCid = cid
    ? `${cid.toString().substring(0, 8)}...${cid
        .toString()
        .substring(cid.toString().length - 8)}`
    : "No CID provided";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-6 max-w-6xl">
        {/* Header with navigation and controls */}
        <header className="flex items-center justify-between mb-8">
          <Link
            href={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "default",
              }),
              "gap-2 font-medium"
            )}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <ModeToggle />
          </div>
        </header>

        {/* Main content */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Certificate display - takes up 3/5 of the grid on large screens */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm relative group">
              {/* Certificate viewer with enhanced styling */}
              <div className="relative">
                <AspectRatio ratio={4 / 3} className="bg-muted/30">
                  <Image
                    fill
                    src={imageUrl}
                    alt="Certificate"
                    className="object-contain p-2"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </AspectRatio>
              </div>
              <div className="p-4 flex justify-between items-center border-t border-border bg-card">
                <div className="text-sm font-medium">Certificate View</div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </Button>
              </div>
            </div>

            {/* Verification status */}
            <div className="bg-card rounded-lg border border-border p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Verified on IPFS</h3>
                  <p className="text-muted-foreground text-sm">
                    This certificate has been cryptographically verified
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Content ID (CID)
                  </span>
                  <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                    {displayCid}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Verification Date
                  </span>
                  <span className="text-sm">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Info sidebar - takes up 2/5 of the grid on large screens */}
          <div className="lg:col-span-2 space-y-6">
            {/* About this certificate */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 border-b border-border">
                <h3 className="font-medium">About this Certificate</h3>
              </div>
              <div className="p-4 space-y-4">
                <p className="text-sm">
                  This certificate is stored on the InterPlanetary File System
                  (IPFS), a decentralized protocol designed to make the web more
                  open and resilient.
                </p>
                <p className="text-sm">
                  Unlike traditional centralized storage, IPFS ensures this
                  certificate:
                </p>
                <ul className="space-y-2">
                  <li className="flex text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>Cannot be tampered with or modified</span>
                  </li>
                  <li className="flex text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>
                      Is permanently accessible through its unique content ID
                    </span>
                  </li>
                  <li className="flex text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                    <span>
                      Is served from a global network rather than a single
                      server
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* IPFS Info */}
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 border-b border-border">
                <h3 className="font-medium">About IPFS</h3>
              </div>
              <div className="p-4">
                <p className="text-sm text-muted-foreground">
                  The InterPlanetary File System (IPFS) is a protocol and
                  peer-to-peer network for storing and accessing files,
                  websites, applications, and data in a distributed file system.
                  Many Web3 projects and decentralized apps are built on IPFS.
                </p>

                <div className="mt-4 flex">
                  <Link
                    href="https://ipfs.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                        size: "sm",
                      }),
                      "text-xs w-full"
                    )}
                  >
                    Learn more about IPFS
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-between gap-4">
              <Button
                variant="outline"
                className="w-full gap-2 border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <AlertTriangle className="h-4 w-4" />
                Report Issue
              </Button>

              <Button variant="outline" className="w-full gap-2">
                <Info className="h-4 w-4" />
                Help & FAQ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
